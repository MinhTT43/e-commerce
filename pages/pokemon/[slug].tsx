import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

type Pokemons = {
  name: string;
  url: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154");
  const data = await response.json();

  const paths = data.results.map((pokemon: Pokemons) => {
    return {
      params: { slug: pokemon.name },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 300,
  };
};

const PokemonPage = (data: any) => {
  console.log(data.data.sprites.front_default);
  return (
    <>
      <Image src={data.data.sprites.front_default} alt={""} layout="fill" />
    </>
  );
};

export default PokemonPage;
