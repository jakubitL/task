import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters, addMovies } from '../store/index';
import React, { useEffect, useState } from 'react';
import { useCharacters, useMovies } from "../actions";
import type { RootState } from '../store/index'

const Home: NextPage = () => {
  const { getCharactes } = useCharacters();
  const { getMovies } = useMovies();
  const dispatch = useDispatch();
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
      <ul>
        <li>
          <Link href="/movies">Filmy</Link>
        </li>
        <li>
          <Link href="/characters">Postacie</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
