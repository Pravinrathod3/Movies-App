const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzViYzM4ZjkzYmI2MWVlOGE0YTk5OGE3MTVhNmMyZiIsIm5iZiI6MTc1MDQyNDg1NC40MDUsInN1YiI6IjY4NTU1ZDE2NDg0ZjFjN2U2Zjg0ZTQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGPAzgr-cr6ly7U3d81OFvph4ayKlq470Caq2vowme4'
  }
};

export const getmovie = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  } 
}

  