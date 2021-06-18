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
var $rowEvolution = document.querySelector('.row-evolution');

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

function getPokemonData(name, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.currentPokemon.name = xhr.response.name;
    data.currentPokemon.sprite = xhr.response.sprites.front_default;
    $detailName.textContent = data.currentPokemon.name.charAt(0).toUpperCase() + xhr.response.name.slice(1);
    $detailImg.setAttribute('src', data.currentPokemon.sprite);
    callback(xhr.response);
  });
  xhr.send();
  getSpeciesData(name);
  console.log(data.currentPokemon);
}

function getSpeciesData(name) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + name);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    data.currentPokemon.description = this.response.flavor_text_entries[1].flavor_text;
    $description.textContent = data.currentPokemon.description;
  });
  xhr2.send();
}

function handleSubmit(event) {
  event.preventDefault();
  getPokemonData($form.elements.name.value.toLowerCase(), getFirstPokemon);
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

function getFirstPokemon(name) {
  var $divPokemon = document.createElement('div');
  var $imgPokemon = document.createElement('img');
  $imgPokemon.setAttribute('src', data.currentPokemon.sprite);
  $imgPokemon.setAttribute('alt', 'pokemon');
  var $pPokemon = document.createElement('p');
  $pPokemon.setAttribute('class', 'pokemon-evolution-name');
  var pName = data.currentPokemon.name.charAt(0).toUpperCase() + data.currentPokemon.name.slice(1);
  $pPokemon.textContent = pName;
  $divPokemon.appendChild($imgPokemon);
  $divPokemon.appendChild($pPokemon);
  $rowEvolution.appendChild($divPokemon);
}

// function getPokemonDetail(name) {
//   var evolution = null;
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     if (xhr.status === 404) {
//       $errorCode.setAttribute('class', 'error view');
//       $searchBar.className = 'view';
//       $viewPokemon.className = 'view hidden';
//       return;
//     }
//     var pokemonName = xhr.response.name.charAt(0).toUpperCase() + xhr.response.name.slice(1);
//     $detailName.textContent = pokemonName;
//     $detailImg.setAttribute('src', xhr.response.sprites.front_default);
//   });
//   var xhr2 = new XMLHttpRequest();
//   xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + name);
//   xhr2.responseType = 'json';
//   xhr2.addEventListener('load', function () {
//     if (xhr2.status === 404) {
//       $errorCode.setAttribute('class', 'error view');
//       $searchBar.className = 'view';
//       $viewPokemon.className = 'view hidden';
//       return;
//     }
//     $description.textContent = this.response.flavor_text_entries[1].flavor_text;
//     console.log(xhr2.response);
//     console.log(xhr2.response.evolution_chain.url);
//     evolution = xhr2.response.evolution_chain.url;
//     console.log(evolution);
//     var xhr3 = new XMLHttpRequest();
//     xhr3.open('GET', evolution);
//     xhr3.responseType = 'json';
//     xhr3.addEventListener('load', function () {
//       console.log(xhr3.response);
//       console.log(xhr3.response.chain.species.name);
//       console.log(xhr3.response.chain.evolves_to[0].species.name);
//       getFirstPokemon(xhr3.response.chain.species.name);

//       getSecondPokemon(xhr3.response.chain.evolves_to[0].species.name);
//     });
//     xhr3.send();
//   });
//   xhr.send();
//   xhr2.send();
// }

// function getSecondPokemon(name) {
//   var xhr6 = new XMLHttpRequest();
//   xhr6.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + name);
//   xhr6.responseType = 'json';
//   xhr6.addEventListener('load', function () {
//     var xhr7 = new XMLHttpRequest();
//     xhr7.open('GET', xhr6.response.evolution_chain.url);
//     xhr7.responseType = 'json';
//     xhr7.addEventListener('load', function () {
//       var $divArrow = document.createElement('div');
//       $divArrow.setAttribute('class', 'evolution-arrow');
//       var $iArrow = document.createElement('i');
//       $iArrow.setAttribute('class', 'fas fa-long-arrow-alt-right fa-2x');
//       var $h6Level = document.createElement('h6');
//       $h6Level.textContent = 'Level ' + xhr7.response.chain.evolves_to[0].evolution_details[0].min_level;
//       $divArrow.appendChild($iArrow);
//       $divArrow.appendChild($h6Level);
//       $rowEvolution.appendChild($divArrow);
//     });
//     xhr7.send();
//   });
//   var xhr5 = new XMLHttpRequest();
//   xhr5.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
//   xhr5.responseType = 'json';
//   xhr5.addEventListener('load', function () {
//     var $divPokemon2 = document.createElement('div');
//     var $imgPokemon2 = document.createElement('img');
//     $imgPokemon2.setAttribute('src', xhr5.response.sprites.front_default);
//     $imgPokemon2.setAttribute('alt', 'pokemon');
//     var $pPokemon2 = document.createElement('p');
//     $pPokemon2.setAttribute('class', 'pokemon-evolution-name');
//     var pName2 = xhr5.response.name.charAt(0).toUpperCase() + xhr5.response.name.slice(1);
//     $pPokemon2.textContent = pName2;
//     $divPokemon2.appendChild($imgPokemon2);
//     $divPokemon2.appendChild($pPokemon2);
//     $rowEvolution.appendChild($divPokemon2);
//   });
//   xhr6.send();
//   xhr5.send();
// }
