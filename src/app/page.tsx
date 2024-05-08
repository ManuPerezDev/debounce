'use client'
import styles from "./page.module.css";
import React, { useLayoutEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const debouncedInput = useDebounce(input, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);
  const previousController = useRef<AbortController>();

  useLayoutEffect(() => {
    if(!debouncedInput) return setNames([]);
    if (previousController.current) {
      previousController.current.abort('Aborted previous request.');
    }
    const controller = new AbortController()
    const signal = controller.signal

    previousController.current = controller;
    setLoading(true);
    fetch('https://example.com/user', {
      method: 'POST',
      body: JSON.stringify({ name: input }),
      signal
    }).then(response => {
      response.json().then(data => {
        setLoading(false);
        setNames(data);
      });
    });
  }, [debouncedInput])

  const handleOnChange = async (event: any) => {
    const name = event.target.value;
    if(name.length < 4) return;
    setInput(name);
  }

  return (
    <main className={styles.main}>
      <input onChange={handleOnChange} type="text"/>
      { loading ?
        <p>Loading...</p> :
        names.length !== 0 &&
          <div>
              <ul>
                {names.map((item, index) => (<li key={index}>{item}</li>))}
              </ul>
          </div>
      }
    </main>
  );
}
