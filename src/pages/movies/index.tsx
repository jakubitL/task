import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link";
import type { NextPage } from "next";
import type { Movie } from "../../types"
import type { RootState, AppDispatch } from '../../store/index'
import styles from "../../styles/Layout.module.css";
import { useMovies } from "../../api/api";
import { getUrlID } from "../../helpers/helpers"
import { addMovies } from '../../store/index';

const Movies: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getMovies } = useMovies();
  const movies: Movie[] = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    (async () => {
      if (movies?.length === 0) {
      const movies = await getMovies();
      dispatch(addMovies(movies));
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Filmy</h3>
      <ul>
        {movies &&
          movies.map((movie, i) => {
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
