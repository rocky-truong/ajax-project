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

$searchLink.addEventListener('click', handleSearch);
$searchButton.addEventListener('click', handleSearch);
$form.addEventListener('submit', handleSubmit);

function handleSearch(event) {
  var closest = event.target.closest('.search-task');
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
  $detailName.textContent = '';
  $detailImg.setAttribute('src', '');
  $description.textContent = '';
  getPokemonDetail($form.elements.name.value);
  $form.reset();

  var dataView = 'view-pokemon';
  for (var i = 0; i < $allView.length; i++) {
    if ($allView[i].getAttribute('data-view') !== dataView) {
      $allView[i].className = 'view hidden';
    } else {
      $allView[i].className = 'view';
    }
  }
}
