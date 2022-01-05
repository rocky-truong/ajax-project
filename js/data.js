/* exported data */
var favorites = [];
var previousFavorites = localStorage.getItem('pokedata-local-storage');
if (previousFavorites !== null) {
  favorites = JSON.parse(previousFavorites);
}

window.addEventListener('beforeunload', jsonHandler);

function jsonHandler(event) {
  var favoritesJSON = JSON.stringify(favorites);
  localStorage.setItem('pokedata-local-storage', favoritesJSON);
}
