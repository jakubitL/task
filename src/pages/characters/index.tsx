import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useCharacters, getUrlID } from "../../actions";
import type { Character } from "../../types";

const Characters: NextPage = () => {
  const [characters, setCharacters] = useState<Character[] | undefined>(undefined);
  const { getCharactes } = useCharacters();


  useEffect(() => {
    (async () => {
      const characters = await getCharactes();
      setCharacters(characters);
    })();
  }, [getCharactes]);

  return (
    <div className={styles.container}>
      <h3>Postacie</h3>
      <ul>
        {characters &&
          characters.map((character, i) => {
            /**
             * TODO: fix key value
             */
            return (
              <li key={i}>
                <Link href={`/characters/${getUrlID(character.url)}`}>
                  {character.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};


export default Characters;
