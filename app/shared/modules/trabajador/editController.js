angular.module('Worker')

.controller('worker.editController', ['$scope','worker','trabajadorServices','comunaServices','paisServices','$location', function($scope,worker,trabajadorServices,comunaServices,paisServices,$location){
	
	$scope.worker=worker.data;

	$scope.worker.nacimiento = new Date($scope.worker.nacimiento);

	console.log(worker.data);		

	$scope.select={
		nivel:["Basica completa","Media incompleta","Media completa","Tecnica","Técnico en nivel superior incompleta","Técnico en nivel superior","Profesional incompleta","Profesional"],
		licencia:["A1","A2","A3","A4","A5","B","C","D","E","F"],
		civil:["SOLTERO/A","CASADO/A","DIVORCIADO/A","SEPARADO","CONVIVIENTE"],
		talla:['XXS','XS','S','M','L','XL','XXL','XXXL'],
		afp:['AFP Cuprum','AFP Habitat','AFP PlanVital','ProVida AFP','AFP Capital','AFP Modelo'],
		salud:['FONASA','BANMEDICA','CONSALUD','CRUZ BLANCA','ING','CAPREDENA','DIPRECA','MASVIDA','SIN PREVISIÓN'],
		hijos:[0,1,2,3,4,5,6,7,8,9],
		antiguedad:[0,1,2,3,4,5,6,7,8,9]
	}

	$scope.interface={

		set pais(value){
			$scope.worker.pais=value;
			if(angular.isObject($scope.worker.pais)){
				$scope.worker.pais_id=$scope.worker.pais.id;
			}
		},
		get pais(){
			if(angular.isObject($scope.worker.pais))
				return $scope.worker.pais.nombre;
			return $scope.worker.pais;
		}

	}


	$scope.getPaises=function(texto){
		return paisServices.search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}


	//Fechas/////////////////////////////////////////////////////////777



/*	$scope.today = function() {
		$scope.worker.nacimiento = new Date();
	};
	
	$scope.today();*/

	$scope.clear = function() {
		$scope.worker.nacimiento = null;
	};

	$scope.inlineOptions = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

	$scope.dateOptions = {
		dateDisabled: disabled,
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};


	function disabled(data) {
		var date = data.date,
		mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	};

	$scope.toggleMin = function() {
		$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
		$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	};

	$scope.toggleMin();

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.setDate = function(year, month, day) {
		$scope.worker.nacimiento = new Date(year, month, day);
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.altInputFormats = ['M!/d!/yyyy'];

	$scope.popup1 = {
		opened: false
	};

	$scope.popup2 = {
		opened: false
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.events = [
	{
		date: tomorrow,
		status: 'full'
	},
	{
		date: afterTomorrow,
		status: 'partially'
	}
	];

	function getDayClass(data) {
		var date = data.date,
		mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}

		return '';
	};

	//////////////////////////////////////////////////////////////////////////////////////


	$scope.save=function() {
		trabajadorServices.save($scope.worker).
		then(function(q){
			console.log(q);
			$location.path("worker/admin");
		},
		function(q) {
			console.warn(q);
		});
	}


}])