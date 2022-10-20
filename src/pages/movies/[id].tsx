import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMovies, getUrlID } from "../../actions";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";

const Movie: NextPage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState([]);
  const { getMovieById } = useMovies();

  /**
   * TODO: zaimplementuj hook do pobierania filmu
   */
   useEffect(() => {
    (async () => {
      const movie = await getMovieById(router.query.id);
      console.log(movie);
      setMovie(movie);
    })();
  }, [getMovieById, router.query.id]);


  return (
    <div className={styles.container}>
<h3>Film: {movie.title}</h3>
      <p>{movie.opening_crawl}</p>
      <ul>
        {movie && movie.characters && movie.characters.map((character, idx) => {
          return (
            <li key={idx}>
              <Link href={`/people/${getUrlID(character)}`}>
                {character}
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
