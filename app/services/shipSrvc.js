angular.module('starships').service('shipSrvc', function ($http, $state) {

  this.ships = ["X wing", "T-fighter", "Millenial Falcon", "Death Star"];

  this.getShips = function () {
    return $http.get('https://swapi.co/api/starships/').then(response => {
      return response.data.results.map(this.getIdForShip);
    })
  }

  this.getShipById = function (id) {
    return $http.get(`https://swapi.co/api/starships/${id}`).then(response => {
      return response.data;
    }).catch(err => {
      $state.go('home');
      throw new Error('Ship Not Found')
      // return { name: 'Ship Not Found' }
    })
  }

  this.getIdForShip = function(ship) {
    let urlArray = ship.url.split('/');
    ship.id = urlArray[5];

    return ship;
  }

})