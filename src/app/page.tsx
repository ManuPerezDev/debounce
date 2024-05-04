'use client'
import styles from "./page.module.css";
import React, {useEffect, useRef, useState} from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);
  const previousController = useRef<AbortController>();

  useEffect(() => {
    if (previousController.current) {
      previousController.current.abort('Aborted previous request.');
    }
    const controller = new AbortController()
    const signal = controller.signal
    previousController.current = controller;

    const getData = setTimeout(() => {
      setLoading(true);
      fetch('https://example.com/user', {
        method: 'POST',
        body: JSON.stringify({ name: input }),
        signal
      }).then(response => {
        response.json().then(data => {
          setNames(data);
        });
      });
      setLoading(false);
    }, 500)

    return () => clearTimeout(getData)
  }, [input])

  const handleOnChange = async (event: any) => {
    const name = event.target.value;
    if(name.length < 3) return;
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
