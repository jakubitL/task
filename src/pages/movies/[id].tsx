import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import Link from "next/link";
import type { NextPage } from "next";
import type { RootState, AppDispatch } from '../../store/index'
import type { Movie, Review, Character} from "../../types/types";
import { useMovies, useCharacters } from "../../api/api";
import { getUrlID } from "../../helpers/helpers"
import styles from "../../styles/Layout.module.css";
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
        })}
      </ul>

      <h3>Recenzje</h3>
      <ul>
        {reviews && reviews.map((review, i) => {
            return (
              <li key={i}>
                  {review.author_name} + {review.content} 
              </li>
            );
          })}
      </ul>
      <form onSubmit={handleSubmit(handleAddReview)}>
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
