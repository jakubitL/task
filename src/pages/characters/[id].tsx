import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import type { NextPage } from "next";
import type { Character } from "../../types/types";
import type { RootState } from '../../store/index'
import type { Review } from "../../types/types";
import { useRouter } from "next/router";
import { useCharacters } from "../../api/api";
import styles from "../../styles/Layout.module.css";
import { addReview } from '../../store/index';

const Character: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Review>();
  const dispatch = useDispatch();
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const { getCharacterById } = useCharacters();
  const characterId = parseInt(router.query.id);
  const reviews = useSelector((state: RootState) => state.reviews.filter(item => item.character_id === characterId));
   React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  useEffect(() => {
    (async () => {
      const character = await getCharacterById(characterId);
      setCharacter(character);
    })();
  }, [getCharacterById, router.query.id]);
  const handleAddReview = (data: Review) => {
    data.character_id = characterId;
    dispatch(addReview(data));
  };
  return (
    <div className={styles.container}>
      <h3>Imię i nazwisko: {character ? character.name : ''}</h3>
      <p>Wzorst: {character ? character.height : ''}</p>
      <p>Kolor włosów: {character ? character.hair_color : ''}</p>
      
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

export default Character;
