import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMovies, useCharacters, getUrlID } from "../../actions";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import type { Movie, Character } from "../../types";

const Movie: NextPage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const { getMovieById } = useMovies();

  //todelete
  const [characters, setCharacters] = useState<Character[] | undefined>(undefined);
  const { getCharactes } = useCharacters();
  useEffect(() => {
    (async () => {
      const characters = await getCharactes();
      setCharacters(characters);
    })();
  }, []);
  //todelete
  /**
   * TODO: zaimplementuj hook do pobierania filmu
   */
  useEffect(() => {
    (async () => {
      const movie = await getMovieById(router.query.id);
      setMovie(movie);
    })();
  }, [getMovieById, router.query.id]);

  const getCharacterName = (characterUrl: string) => {
    if (characters) {
      const person = characters.find(char => char.url === characterUrl);
      return person ? person.name : '';
    }
  };
  return (
    <div className={styles.container}>
      <h3>Film: {movie ? movie.title : ''}</h3>
      <p>{movie ? movie.opening_crawl : ''}</p>
      <ul>
        {movie && movie.characters && movie.characters.map((character, idx) => {
          return (
            <li key={idx}>
              <Link href={`/people/${getUrlID(character)}`}>
                {getCharacterName(character) ? getCharacterName(character) : ''}
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

export default Movie;
