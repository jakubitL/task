import type { NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters, addMovies } from '../store/index';
import React, { useEffect } from 'react';
import { useCharacters, useMovies } from "../api/api";
import type { RootState, AppDispatch } from '../store/index'

const Home: NextPage = () => {
  const { getCharactes } = useCharacters();
  const { getMovies } = useMovies();
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const characters = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    (async () => {
      if (characters.length === 0) {
        const characters = await getCharactes();
        dispatch(addCharacters(characters));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (movies.length === 0) {
        const movies = await getMovies();
        dispatch(addMovies(movies));
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.buttonsContainer}>
        <li >
          <Link href="/movies">
            <button className={styles.buttons}>Filmy</button>
          </Link>
        </li>
        <li>
          <Link href="/characters">
            <button className={styles.buttons}>Postacie</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
