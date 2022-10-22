import React, { useEffect } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useMovies, getUrlID } from "../../actions";
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/index'
import { addMovies } from '../../store/index';


const Movies: NextPage = () => {
  const dispatch = useDispatch();
  const { getMovies } = useMovies();
  const movies = useSelector((state: RootState) => state.movies);

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
