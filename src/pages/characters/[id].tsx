import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCharacters, getUrlID } from "../../actions";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import type { Character } from "../../types";

const Character: NextPage = () => {
  const router = useRouter();

  //todelete
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const { getCharacterById } = useCharacters();

  //todelete
  /**
   * TODO: zaimplementuj hook do pobierania filmu
   */
  useEffect(() => {
    (async () => {
      const character = await getCharacterById(router.query.id);
      setCharacter(character);
    })();
  }, [getCharacterById, router.query.id]);

  // const getCharacterName = (characterUrl: string) => {
  //   if (characters) {
  //     const person = characters.find(char => char.url === characterUrl);
  //     return person ? person.name : '';
  //   }
  // };
  return (
    <div className={styles.container}>
      <h3>Imię i nazwisko: {character ? character.name : ''}</h3>
      <p>Wzorst: {character ? character.height : ''}</p>
      <p>Kolor włosów: {character ? character.hair_color : ''}</p>
      <p>Udział w filmach:</p>
      <ul>
        {character && character.films && character.films .map((film, idx) => {
          return (
            <li key={idx}>
              <Link href={`/movies/${getUrlID(film)}`}>
                {film}
              </Link>
            </li>
          );
          /**
           * TODO: dodaj listę postaci z linkami do strony o niej
           */
        })}
      </ul>
      <h3>Recenzje</h3>
      <ul>
        {/**
         * TODO: dodaj listę recenzji dla zasobu, recenzje powinny być zapisane w stanie aplikacji
         */}
      </ul>
      <form>
        {/**
         * TODO: zaimplementuj formularz dodawania recenzji
         */}
      </form>
    </div>
  );

  return null;
};

export default Character;
