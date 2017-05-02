angular.module('trip')
	.factory('tripService', function($http) {
		var service = {};
		
		var BASE_URL = 'rest/miles/';
		
		service.index = function() {
			return $http({
				method : 'GET',
				url : BASE_URL
			})
		}
		
		service.create = function(trip) {
			return $http({
				method : 'POST',
				url : BASE_URL,
				headers : {
				    'Content-Type' : 'application/json'
				  },
				  data : trip
			})
		}
		
		service.update = function(trip) {
			return $http({
				method : 'PUT',
				url : BASE_URL + trip.id,
				headers : {
			        'Content-Type' : 'application/json'
			      },
			      data : trip
			})
		}
		
		service.destroy = function(id) {
			return $http({
				method : 'DELETE',
				url : BASE_URL + id
			})
		}
		
		service.show = function(id) {
			return $http({
				method : 'GET',
				url : BASE_URL + id
			})
		}
		
		return service;
	})