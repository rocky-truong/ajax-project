/* exported data */
var favorites = [];
var previousFavorites = localStorage.getItem('pokedata-local-storage');
if (previousFavorites !== null) {
  favorites = JSON.parse(previousFavorites);
}

window.addEventListener('beforeunload', handleJSON);

function handleJSON(event) {
  var favoritesJSON = JSON.stringify(favorites);
  localStorage.setItem('pokedata-local-storage', favoritesJSON);
}
