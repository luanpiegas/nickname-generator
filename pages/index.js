import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [characterInput, setCharacterInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character: characterInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setCharacterInput("");
  }

  return (
    <div>
      <Head>
        <title>Nickname Generator</title>
      </Head>

      <main className={styles.main}>
        <h3>Nickname Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="character"
            placeholder="Type the class, champion, vocation..."
            value={characterInput}
            onChange={(e) => setCharacterInput(e.target.value)}
          />
          <input type="submit" value="Generate nickname" />
        </form>
        <div className={styles.result}>{result}</div>
        <h5>by <a href="https://twitter.com/miamieighties">me</a> using the <a href="https://beta.openai.com/docs/introduction/overview">OpenAI text-davinci-002 model</a></h5>
      </main>
    </div>
  );
}
