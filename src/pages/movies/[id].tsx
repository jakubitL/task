import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import type { RootState, AppDispatch } from '../../store/index'
import { useRouter } from "next/router";
import { useMovies, useCharacters, getUrlID } from "../../actions";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import type { Movie, Review } from "../../types";
import { addReview, addCharacters } from '../../store/index';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

const Movie: NextPage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const { getMovieById } = useMovies();
  const { getCharactes } = useCharacters();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Review>();
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();
  const movieId = parseInt(router.query.id);
  const reviews = useSelector((state: RootState) => state.reviews.filter(item => item.film_id === movieId));

  /**
   * TODO: zaimplementuj hook do pobierania filmu
   */
   React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  
  useEffect(() => {
    (async () => {
      const movie = await getMovieById(movieId);
      setMovie(movie);
    })();
  }, [getMovieById, movieId]);

  useEffect(() => {
    (async () => {
      // jeżeli w storze nie mamy pobranych postaci to zaciągnij na nowo
      if (characters?.length === 0) {
      const chars = await getCharactes();
      dispatch(addCharacters(chars));
      }
    })();
  }, []);
  const getCharacterName = (characterUrl: string) => {
    if (characters) {
      const person = characters.find((char: { url: string; }) => char.url === characterUrl);
      return person ? person.name : '';
    }
  };
  const handleAddReview = (data: Review) => {
    data.film_id = movieId;
    dispatch(addReview(data));
  };
  return (
    <div className={styles.container}>
      <h3>Film: {movie ? movie.title : ''}</h3>
      <p>{movie ? movie.opening_crawl : ''}</p>
      <ul>
        {movie && movie.characters && movie.characters.map((character, idx) => {
          return (
            <li key={idx}>
              <Link href={`/characters/${getUrlID(character)}`}>
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
        {reviews && reviews.map((review, i) => {
            /**
             * TODO: fix key value
             */
            return (
              <li key={i}>
                  {review.author_name} + {review.content} 
              </li>
            );
          })}
        {/**
         * TODO: dodaj listę recenzji dla zasobu, recenzje powinny być zapisane w stanie aplikacji
         */}
      </ul>
      <form onSubmit={handleSubmit(handleAddReview)}>
        {/**
         * TODO: zaimplementuj formularz dodawania recenzji
         */}
           <label>Autor:</label>
         <input {...register('author_name', { required: true })} type="text" name="author_name" id="author_name" />

         <label>Content:</label>
         <input {...register('content', { required: true })} type="textarea" name="content" id="content" />
         {errors.author_name && <span>Autor jest wymagany</span>}
        {errors.content && <span>Treść jest wymagana</span>}
         <button type="submit">Dodaj</button>
      </form>
    </div>
  );

  return null;
};

export default Movie;
