import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API || import.meta.env.BASE_API;

// Tipos (interfaces) para melhor autocompletar e validação
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
}

// 🔍 Função para buscar filmes pelo nome
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

// 🎬 Função para obter detalhes de um filme específico
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter detalhes do filme:", error);
    return null;
  }
};
