import { useState, useEffect } from "react";
import type { Movie, Character } from "./types";
import { useCallback } from 'react';
import axios from 'axios';

/**
 * TODO: dodaj typy
 */
 const api = axios.create({
  baseURL: 'https://swapi.dev/api',
});

async function fetchMethod(...args) {
  const res = await fetch(...args);
  return await res.json();
}

// docs: https://swapi.dev/
const endpoint = "https://swapi.dev/api";

const regex = /(\d+)\/$/;
export const getUrlID = (link: string) => {
  const match = link.match(regex);
  return match && match[1];
};

export const useMovies = () => {
  // const [response, setResponse] = useState<Movie[] | undefined>(undefined);

  // useEffect(() => {
  //   /**
  //    * TODO: moze da się jakoś lepiej pobierać dane :)
  //    */
  //   fetchMethod<{ results: Movie[] }>(`${endpoint}/films/`).then(
  //     ({ results }) => {
  //       setResponse(results);
  //     }
  //   );
  // }, []);

  // return response;

  const getMovies =  useCallback(async () => {
    try {
      const result = await api.get('/films/');
      return result.data.results;
    } catch (e) {
      console.log(e);
    }
  }, []);

const getMovieById =  useCallback(async (id: Number) => {
  try {
    const result = await api.get(`/films/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}, [])
return { getMovies, getMovieById}
};

export const useCharacters = () => {
  /**
   * TODO: ${endpoint}/people
   */
   const getCharactes =  useCallback(async () => {
    //pętla while nie jest optymalna, niestety api nie pozwala pobrać wszystkie postacie za jednym razem aby potem móc wykorzystywać ze store
    try {
      const characters = [];
      let next = true;
      let i = 1;
      while (next) {
      const result = await api.get(`/people/?page=${i}`);
      characters.push(...result.data.results)
      i++;
      if(result.data.next === null)
      next = false;
      }
      return characters;
    } catch (e) {
      console.log(e);
    }
  }, []);

  
const getCharacterById =  useCallback(async (id: Number) => {
  try {
    const result = await api.get(`/people/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}, [])

return { getCharactes, getCharacterById}
};

export const useCharacter = () => {
  /**
   * TODO: ${endpoint}/people/${id}
   */
};
