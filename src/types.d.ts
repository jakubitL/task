/**
 * TODO: uzupełnij brakujące typy
 */

export type Breadcrumb = {
  // TODO
};

export type Review = {
  id: string;
  author_name: string;
  content: string;
};

export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  characters: string[];
  url: string;
};

export type Character = {
  name: string;
  height: number;
  mass: string;
  birth_year: string;
  films: string[];
  url: string;
};
