/* exported data */
var data = {
  view: 'favorite-list',
  editing: null,
  favorites: [],
  nextFavoriteId: 1
};
var previousData = localStorage.getItem('pokedata-storage');
if (previousData) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', handleJSON);

function handleJSON(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pokedata-storage', dataJSON);
}
