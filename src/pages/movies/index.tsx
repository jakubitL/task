import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useMovies, useCharacters, getUrlID } from "../../actions";
import type { Movie, Character } from "../../types";


const Movies: NextPage = () => {

  const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
  const { getMovies } = useMovies();

  useEffect(() => {
    (async () => {
      console.log('films')
      const movies = await getMovies();
      setMovies(movies);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Filmy</h3>
      <ul>
        {movies &&
          movies.map((movie, i) => {
            /**
             * TODO: fix key value
             */
            return (
              <li key={i}>
                <Link href={`/movies/${getUrlID(movie.url)}`}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};


export default Movies;
