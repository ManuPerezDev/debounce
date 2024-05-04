'use client'
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string[]>([]);

  const handleOnChange = async (event: any) => {
    const name = event.target.value;
    if(name.length === 0) return setData([]);
    const result = await fetch('https://example.com/user', {
      method: 'POST',
      body: JSON.stringify({ name: event.target.value })
    })
    result.json().then(data => setData(data));
  }

  return (
    <main className={styles.main}>
      <input onChange={handleOnChange} type="text"/>
      {data.length !== 0 &&
      <div>
          <ul>
            {data.map((item, index) => (<li key={index}>{item}</li>))}
          </ul>
      </div>}
    </main>
  );
}
