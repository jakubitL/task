import { useCallback } from 'react';
import axios from 'axios';

 const api = axios.create({
  baseURL: 'https://swapi.dev/api',
});


export const useMovies = () => {

  const getMovies =  useCallback(async () => {
    try {
      const result = await api.get('/films/');
      return result.data.results;
    } catch (e) {
      console.log(e);
    }
  }, []);

const getMovieById =  useCallback(async (id: number) => {
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
