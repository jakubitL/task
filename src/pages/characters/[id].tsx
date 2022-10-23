import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import type { NextPage } from "next";
import type { Character } from "../../types/types";
import type { RootState } from '../../store/index'
import type { Review } from "../../types/types";
import { useRouter } from "next/router";
import { useCharacters } from "../../api/api";
import styles from "../characters/characters.module.scss";
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
  useEffect(() => {
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
    <div className={styles.detailsContainer}>
      <div>
        <h3 className={styles.header}>{character ? character.name : ''}</h3>
        <p>Wzorst: {character ? character.height : ''}</p>
        <p>Płeć: {character ? character.gender : ''}</p>
        <p>Kolor włosów: {character ? character.hair_color : ''}</p>
        <p>Rok urodzenia: {character ? character.birth_year : ''}</p>

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

export default Character;
