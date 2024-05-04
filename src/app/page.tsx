'use client'
import styles from "./page.module.css";
import React, {useEffect, useState} from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const getData = setTimeout(() => {
      setLoading(true);
      fetch('https://example.com/user', {
        method: 'POST',
        body: JSON.stringify({ name: input })
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
