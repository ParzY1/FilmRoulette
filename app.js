async function rollMovie() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Losuję film...</p>';

  const API_KEY = 'c650cb1d';
  const queries = [
    'star', 'man', 'love', 'war', 'life', 'the', 'night', 'day', 'girl', 'boy',
    'dark', 'light', 'death', 'king', 'queen', 'dog', 'cat', 'moon', 'sun', 'fire',
    'water', 'blood', 'dream', 'road', 'city', 'world', 'lost', 'last', 'first', 'secret',
    'game', 'power', 'music', 'dance', 'run', 'gun', 'red', 'blue', 'green', 'black',
    'white', 'gold', 'silver', 'wild', 'dead', 'alive', 'angel', 'devil', 'ghost', 'space'
  ];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  let movies = [];

  // Pobierz filmy z pierwszej strony dla losowego zapytania
  const res = await fetch(`https://www.omdbapi.com/?s=${randomQuery}&type=movie&page=1&apikey=${API_KEY}`);
  const data = await res.json();
  if (data.Response === 'True' && data.Search) {
    console.log(`Zapytanie "${randomQuery}":`, data.Search.map(f => `${f.Title} (${f.Year})`));
    movies = movies.concat(data.Search);
  } else {
    console.log(`Brak wyników dla zapytania "${randomQuery}"`);
  }

  if (movies.length > 0) {
    console.log('Wszystkie zebrane filmy:', movies.map(f => `${f.Title} (${f.Year})`));
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    console.log('Wylosowany film:', randomMovie.Title, randomMovie.Year);
    const detailsRes = await fetch(`https://www.omdbapi.com/?i=${randomMovie.imdbID}&apikey=${API_KEY}`);
    const details = await detailsRes.json();

    resultDiv.innerHTML = `
      <div class="movie-card">
        <h2>${details.Title} (${details.Year})</h2>
        <img src="${details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x445?text=Brak+plakatu'}" alt="${details.Title}">
        <p><strong>Gatunek:</strong> ${details.Genre}</p>
        <p><strong>Opis:</strong> ${details.Plot}</p>
        <p><strong>IMDb:</strong> ${details.imdbRating}</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = '<p>Nie udało się wylosować filmu. Spróbuj ponownie.</p>';
  }
}
