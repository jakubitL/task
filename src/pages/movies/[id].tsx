import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import Link from "next/link";
import type { NextPage } from "next";
import type { RootState, AppDispatch } from '../../store/index'
import type { Movie, Review, Character } from "../../types/types";
import { useMovies, useCharacters } from "../../api/api";
import { getUrlID } from "../../helpers/helpers"
import styles from "../movies/movies.module.scss";
import { addReview, addCharacters } from '../../store/index';

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
  const characters: Character[] = useSelector((state: RootState) => state.characters);
  const dispatch: AppDispatch = useDispatch();
  const movieId: number = parseInt(router.query.id);
  const reviews: Review[] = useSelector((state: RootState) => state.reviews.filter(item => item.film_id === movieId));

  useEffect(() => {
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
    <div className={styles.detailsContainer}>
      <div>
        <h3 className={styles.header}>Film: {movie ? movie.title : ''}</h3>
        <p>{movie ? movie.opening_crawl : ''}</p>
        <ul>
          {movie && movie.characters && movie.characters.map((character, id) => {
            return (
              <li className={styles.titles} key={id}>
                <Link href={`/characters/${getUrlID(character)}`}>
                  {getCharacterName(character) ? getCharacterName(character) : ''}
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
      <div className={styles.rightWrapper}>
        <form className={styles.formWrapper} onSubmit={handleSubmit(handleAddReview)}>
          <label className={styles.formLabel} htmlFor="author_name">Autor:</label>
          <input className={styles.formInput} {...register('author_name', { required: true })} type="text" name="author_name" id="author_name" />

          <label className={styles.formLabel}>Treść:</label>
          <textarea className={styles.formInputTextarea} {...register('content', { required: true })} name="content" id="content" />
          {errors.author_name && <span>Autor jest wymagany</span>}
          {errors.content && <span>Treść jest wymagana</span>}
          <button className={styles.formSubmit} type="submit">Dodaj recenzje</button>
        </form>

        <h3 className={styles.header}>Recenzje</h3>
        <div className={styles.reviewsWrapper}>
          {reviews && reviews.map((review, i) => {
            return (
              <div className={styles.review}>
                <p className={styles.reviewAutor} key={i}>
                  Autor: {review.author_name}
                </p>
                <p key={i}>
                  {review.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return null;
};

export default Movie;
