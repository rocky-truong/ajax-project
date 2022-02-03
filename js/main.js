/* global data */
/* exported data */
var $searchLink = document.querySelector('.search-link');
var $searchButton = document.querySelector('.search-button');
var $allView = document.querySelectorAll('.view');
var $form = document.querySelector('form');
var $searchBar = document.querySelector('#searchBar');
var $detailName = document.querySelector('.detail-name');
var $detailImg = document.querySelector('.detail-img');
var $description = document.querySelector('.description');
var $errorCode = document.querySelector('.error');
var $viewPokemon = document.querySelector('#view-pokemon');
var $favoriteButton = document.querySelector('.favorite-button');
var $faHeart = document.querySelector('.fa-heart');
var $favoritesIcon = document.querySelector('.favorites-icon');
var $favoritesLink = document.querySelector('.favorites-link');
var $row = document.querySelector('.row');

$searchLink.addEventListener('click', handleSwitch);
$searchButton.addEventListener('click', handleSwitch);
$favoritesIcon.addEventListener('click', handleSwitch);
$favoritesLink.addEventListener('click', handleSwitch);
$form.addEventListener('submit', handleSubmit);
$favoriteButton.addEventListener('click', handleFavorite);

function handleSwitch(event) {
  var closest = event.target.closest('.task');
  var dataView = closest.getAttribute('data-view');
  for (var i = 0; i < $allView.length; i++) {
    if ($allView[i].getAttribute('data-view') !== dataView) {
      $allView[i].className = 'view hidden';
    } else {
      $allView[i].className = 'view';
    }
  }
}

function getPokemonDetail(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 404) {
      $errorCode.setAttribute('class', 'error view');
      $searchBar.className = 'view';
      $viewPokemon.className = 'view hidden';
      return;
    }
    var pokemonName = xhr.response.name.charAt(0).toUpperCase() + xhr.response.name.slice(1);
    $detailName.textContent = pokemonName;
    $detailImg.setAttribute('src', xhr.response.sprites.front_default);
  });
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + name);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    if (xhr2.status === 404) {
      $errorCode.setAttribute('class', 'error view');
      $searchBar.className = 'view';
      $viewPokemon.className = 'view hidden';
      return;
    }
    $description.textContent = this.response.flavor_text_entries[1].flavor_text;
  });
  xhr.send();
  xhr2.send();
}

function handleSubmit(event) {
  event.preventDefault();
  var shortName = $form.elements.name.value.toLowerCase();
  $detailName.textContent = '';
  $detailImg.setAttribute('src', '');
  $description.textContent = '';
  getPokemonDetail(shortName);
  $form.reset();

  var dataView = 'view-pokemon';
  for (var i = 0; i < $allView.length; i++) {
    if ($allView[i].getAttribute('data-view') !== dataView) {
      $allView[i].className = 'view hidden';
    } else {
      $allView[i].className = 'view';
    }
  }
  for (var j = 0; j < data.favorites.length; j++) {
    if (data.favorites[j].name === shortName) {
      $faHeart.className = 'fas fa-heart fa-2x red-color';
      break;
    } else {
      $faHeart.className = 'far fa-heart fa-2x';
    }
  }
}

function handleFavorite(event) {
  var exist = false;
  for (var i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].name === $detailName.textContent.toLowerCase()) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    $faHeart.className = 'fas fa-heart fa-2x red-color';
    var newFavorite = {
      name: $detailName.textContent.toLowerCase(),
      image: $detailImg.src,
      description: $description.textContent,
      favoriteId: data.nextFavoriteId
    };
    data.favorites.push(newFavorite);
    data.nextFavoriteId++;
  }
}

function renderFavorites(pokemon) {
  var $slotDiv = document.createElement('div');
  $slotDiv.setAttribute('class', 'slot border');

  var $img = document.createElement('img');
  $img.setAttribute('src', pokemon.image);
  $slotDiv.appendChild($img);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'favorites-name');
  $h2.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  $slotDiv.appendChild($h2);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fas fa-heart fa-2x red-color favorites-heart');
  $slotDiv.appendChild($i);

  return $slotDiv;
}

for (var i = 0; i < data.favorites.length; i++) {
  var newFav = renderFavorites(data.favorites[i]);
  $row.appendChild(newFav);
}
