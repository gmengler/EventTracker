angular.module('trip')
	.component('tripList', {
		templateUrl : 'app/trip/tripList/tripList.component.html',
		controller : function(tripService) {
			var vm = this;
			
			vm.trips = [];
			
			vm.selected = null;
			
			vm.showTable = true;
			
			vm.submittrip = function(trip) {
				tripService.create(trip).then(function(res) {
					reload();
				})
			}
			
			vm.displayTrip = function(trip) {
				vm.selected = trip;
				vm.showTable = false;
				console.log(vm.selected);
			}
			
			vm.displayTable = function() {
				vm.showTable = true;
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
		},
		controllerAs: 'vm'
	})