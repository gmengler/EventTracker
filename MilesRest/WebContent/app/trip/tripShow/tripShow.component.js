angular.module('trip')
	.component('tripShow', {
		templateUrl : 'app/trip/tripShow/tripShow.component.html',
		controller : function(tripService) {
			var vm = this;
			
			vm.editMode = false;
			
			vm.editTrip = null;
			
			vm.setEditTrip = function() {
				vm.editTrip = angular.copy(vm.trip);
				vm.editMode = true;
			}

			vm.save = function() {
				console.log(vm.trip);
				vm.onUpdate({trip : vm.editTrip}).then(function(res) {
					vm.trip = res.data;
				})
				vm.editTrip = null;
				vm.editMode = false;
			}
			
			vm.getTripTotal = function(startMiles, endMiles) {
				var tripTotal = 0;
				tripTotal = endMiles - startMiles;
				return tripTotal;
			}
		},
		
		controllerAs : 'vm',
		
		bindings: {
			trip: '<',
			goBack: '&',
			onUpdate: '&'
		}
	})