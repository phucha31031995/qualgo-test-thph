import axios from 'axios';

export const fetchRandomMovies = async () => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let num1 = Math.floor(Math.random() * (alphabet.length + 1));
    const query = `${alphabet[num1]}}`
    const response = await axios.get(
      `https://search.imdbot.workers.dev/?q=${query}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`https://search.imdbot.workers.dev/?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (imdbId: string) => {
  try {
    const response = await axios.get(
      `https://search.imdbot.workers.dev/?tt=${imdbId}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
