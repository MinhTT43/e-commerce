import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

type EggGroup = {
  name: string;
  url: string;
};

const Home = () => {
  const [eggGroup, setEggGroup] = useState<EggGroup[]>();

  const fetchEggGroups = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/egg-group");
    return response.json();
  };

  useEffect(() => {
    const eggGroups = fetchEggGroups();
    eggGroups.then((groups) => {
      setEggGroup(groups.results);
    });
  }, []);

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
        <section className="grid grid-cols-4 gap-4">
          {eggGroup?.map((group: EggGroup, index: number) => {
            return (
              <div key={index}>
                <Link href={`http://localhost:3000/egg-group/${group.name}`}>
                  <a>{group.name}</a>
                </Link>
              </div>
            );
          })}
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
