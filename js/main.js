var $searchLink = document.querySelector('.search-link');
var $searchButton = document.querySelector('.search-button');
var $allView = document.querySelectorAll('.view');

$searchLink.addEventListener('click', handleSearch);
$searchButton.addEventListener('click', handleSearch);

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
