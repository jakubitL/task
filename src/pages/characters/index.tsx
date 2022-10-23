import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import type { Character } from "../../types/types"
import type { RootState, AppDispatch } from '../../store/index'
import Link from "next/link";
import styles from "./Characters.module.scss";
import { useCharacters } from "../../api/api";
import { getUrlID } from "../../helpers/helpers"
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters } from '../../store/index';

const Characters: NextPage = () => {
  const { getCharactes } = useCharacters();
  const characters: Character[] = useSelector((state: RootState) => state.characters);
  const dispatch: AppDispatch = useDispatch();

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
      <h3 className={styles.header}>Postacie</h3>
      <ul className={styles.listContainer}>
        {characters &&
          characters.map((character, i) => {
            return (
              <li key={i}>
                <Link href={`/characters/${getUrlID(character.url)}`}>
                <button className={styles.listItem}>{character.name}</button>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Characters;
