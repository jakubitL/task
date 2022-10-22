import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters } from '../store/index';
import React, { useEffect, useState } from 'react';
import { useCharacters } from "../actions";

const Home: NextPage = () => {
  const { getCharactes } = useCharacters();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const characters = await getCharactes();
      dispatch(addCharacters(characters));
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
