import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import type { RootState } from '../../store/index'
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useCharacters, getUrlID } from "../../actions";
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters } from '../../store/index';

const Characters: NextPage = () => {
  const { getCharactes } = useCharacters();
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (characters?.length === 0) {
      const chars = await getCharactes();
      dispatch(addCharacters(chars));
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Postacie</h3>
      <ul>
        {characters &&
          characters.map((character, i) => {
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
