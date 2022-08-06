import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/egg-group");
  const data = await response.json();

  const paths = data.results.map((eggPlant: any) => {
    return {
      params: { slug: eggPlant.name },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  const response = await fetch(`https://pokeapi.co/api/v2/egg-group/${slug}/`);
  const data = await response.json();

  return {
    props: {
      data: data.pokemon_species,
    },
  };
};

const EggGroupPage = (data: any) => {
  return (
    <>
      <Link href="/">Homepage</Link>
      {data.data.map((pokemon: any, index: number) => {
        return (
          <div key={index}>
            <Link href={`http://localhost:3000/pokemon/${pokemon.name}`}>
              <a>{pokemon.name}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default EggGroupPage;
