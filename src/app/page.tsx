'use client'
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = async (event: any) => {
    const name = event.target.value;
    if(name.length === 0) return setData([]);
    setLoading(true);
    const result = await fetch('https://example.com/user', {
      method: 'POST',
      body: JSON.stringify({ name: event.target.value })
    })
    result.json().then(data => setData(data));
    setLoading(false);
  }

  return (
    <main className={styles.main}>
      <input onChange={handleOnChange} type="text"/>
      { loading ?
        <p>Loading...</p> :
        data.length !== 0 &&
          <div>
              <ul>
                {data.map((item, index) => (<li key={index}>{item}</li>))}
              </ul>
          </div>
      }
    </main>
  );
}
