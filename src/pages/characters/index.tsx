import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useCharacters, getUrlID } from "../../actions";
import type { Character } from "../../types";
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/index'
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
