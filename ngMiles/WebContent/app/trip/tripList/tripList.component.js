angular.module('trip').component('tripList', {
  templateUrl: 'app/trip/tripList/tripList.component.html',
  controller: function(tripService) {
    var vm = this;

    vm.trips = [];

    vm.selected = null;

    vm.showTable = true;
		vm.showStats = true;
		vm.showTitle = true;
		vm.showStatsTitle = true;
		vm.showNewTitle = true;
		vm.showHR = true;

    vm.submittrip = function(trip) {
      tripService.create(trip).then(function(res) {
        reload();
      })
    }

    vm.displayTrip = function(trip) {
      vm.selected = trip;
      vm.showTable = false;
			vm.showStats = false;
			vm.showTitle = false;
			vm.showStatsTitle = false;
			vm.showNewTitle = false;
			vm.showHR = false;
      console.log(vm.selected);
    }

    vm.displayTable = function() {
      vm.showTable = true;
			vm.showTitle = true;
			vm.showStats = true;
			vm.showStatsTitle = true;
			vm.showNewTitle = true;
			vm.showHR = true;
      vm.selected = null;
    }

    vm.update = function(trip) {
      return tripService.update(trip).then(function(res) {
        reload();
        return res;
      })
    }

    vm.deleteTrip = function(id) {
      tripService.destroy(id).then(function(res) {
        reload();
      })
    }

    vm.getTripTotal = function(startMiles, endMiles) {
      var tripTotal = 0;
      tripTotal = endMiles - startMiles;
      return tripTotal;
    }

    vm.getTotal = function() {
      var total = 0;
      vm.trips.forEach(function(v) {
        var tripTotal = v.endMiles - v.startMiles;
        total += tripTotal;
      })
      return total;
    }

    vm.getNumberOfTrips = function() {
      var numberTrips = [];
      vm.trips.forEach(function(v) {
        numberTrips.push(v)
      })
      return numberTrips.length;
    }

    vm.getAverage = function() {
      var average = 0;
      var total = 0;
      vm.trips.forEach(function(v) {
        var tripTotal = v.endMiles - v.startMiles;
        total += tripTotal;
      })
      return average = total / vm.trips.length;
    }

    var reload = function() {
      tripService.index().then(function(res) {
        vm.trips = res.data;
      })
    }

    reload();

    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
		
  },
  controllerAs: 'vm'
})
