angular.module('front', []).controller('mainCtrl', mainCtrl);

function mainCtrl($http) {
  const vm = this;
}

angular.module('front').directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$http'];
function googleMap($window, $http) {
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

      $http.get('https://paleobiodb.org/data1.2/occs/list.json?base_name=Tyrannosaurus&show=coords').then(res => {

        for (let i = 0; i < res.data.records.length; i++) {
          new $window.google.maps.Marker({
            position: { lat: res.data.records[i].lat, lng: res.data.records[i].lng },
            map: map
          });
        }

      });
    }
  };
  return directive;
}
