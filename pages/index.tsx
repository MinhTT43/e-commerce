import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

type Pokemons = {
  name: string;
  url: string;
};

const Home = () => {
  const test = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/egg-group");
    const data = await response.json();

    const paths = data.results.map((eggPlant: any) => {
      return {
        params: { slug: eggPlant.name },
      };
    });

    console.log(paths);
  };

  test();

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta
          name="description"
          content="Meta description should reflect what value the page has."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>hello world</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
