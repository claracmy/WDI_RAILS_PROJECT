const app = angular.module('front', ['ngResource']);

// Main Controller
app.controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['getTaxon', '$scope', '$http', '$window'];
function mainCtrl(getTaxon, $scope, $http, $window) {
  const vm = this;
  let markers = [];

  vm.addMarker = id => {
    deleteMarkers();

    getTaxon.get({id: id}).$promise.then(res => {
      $http.get(`https://paleobiodb.org/data1.2/occs/list.json?base_name=${res.genus}&show=coords`).then(res => {
        for (let i = 0; i < res.data.records.length; i++) {
          const marker = new $window.google.maps.Marker({
            position: { lat: res.data.records[i].lat, lng: res.data.records[i].lng },
            map: $window.map
          });
          markers.push(marker);
        }
      });
    });

    function deleteMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }
  };

  getTaxon.query().$promise.then(taxons => {
    vm.taxons = taxons;
  });
}

// Factory
app.factory('getTaxon', getTaxon);
getTaxon.$inject = ['$resource'];
function getTaxon($resource) {
  return $resource(
    'http://localhost:3000/taxons/:id', {id: '@_id'}, {'update': { method: 'PUT' }});
}

// Google Map Directive
app.directive('googleMap', googleMap);
googleMap.$inject = ['$window'];
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },

    link($scope, element) {
      const map = new $window.google.maps.Map(element[0],{
        zoom: 2,
        center: $scope.center
      });
      $window.map = map;
    }
  };
  return directive;
}
