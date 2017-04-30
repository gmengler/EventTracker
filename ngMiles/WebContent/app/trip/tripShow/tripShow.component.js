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
				vm.onUpdate({trip : vm.editTrip})
				vm.editTrip = null;
				vm.editMode = false;
			}
		},
		
		controllerAs : 'vm',
		
		bindings: {
			trip: '<',
			goBack: '&',
			onUpdate: '&'
		}
	})