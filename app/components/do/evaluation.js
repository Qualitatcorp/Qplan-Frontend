'use strict';
angular.module('do')
.controller('do.evaluationCtrl', [
	"$scope",
	"$location",
	"toastr",
	"evaluacionStorage",
	"trabajadorStorage",
	"perfil",function($scope,$location,toastr,evaluacionStorage,trabajadorStorage,perfil) 
	{
		var perfil=perfil.data;
		console.log(perfil);

		var evaluacionSerializada={};
		evaluacionSerializada.perfil=perfil.nombre;
		evaluacionSerializada.preguntas=[];
		var modulos=[];
		var evaSerial={};
		var preguntas=perfil.preguntas;
		preguntas.forEach(function(p){
			angular.extend(p,{
				alternativas:_.where(perfil.alternativas,{
					pre_id:p.id
				}),
				get recursos() {
					var recurso= _.findWhere(perfil.recursos,{pre_id:p.id})
					angular.extend(recurso,{
						sources:_.map(_.where(perfil.rhs,{rec_id:recurso.id}),function(rh) {
							var src=_.findWhere(perfil.sources,{id:rh.src_id});
							src.tipo=rh.tipo;
							return src;
						}),
						options:_.map(_.where(perfil.rho,{opt_id:recurso.id}),function(ro) {
							return _.findWhere(perfil.options,{id:ro.src_id});
						})}
					);
					return recurso;
				},
				modulo:_.findWhere(perfil.modteorica,{id:_.findWhere(perfil.pet,{evt_id:_.findWhere(perfil.evateorica,{id:p.eva_id}).id}).mop_id})
			});
		});

		evaluacionStorage.nuevaEvaluacion(trabajadorStorage.q,perfil.modteorica);

		$scope.evaluacion={
			perfil:perfil.nombre,
			preguntas:preguntas
		};
				$scope.ficha={
			_current:0,
			get current(){
				return this._current;
			},
			set current(value){				
				if(value>=0&&value<this.preguntas.length){
					this._current=value;
					if(this._current==0){
						$scope.buttons.Anterior.disable=true;
					}else{
						$scope.buttons.Anterior.disable=false;
						if(this._current==this.preguntas.length-1){
							$scope.buttons.Siguiente.disable=true;
						}else{
							$scope.buttons.Siguiente.disable=false;
						}
					}
				}
			},
			get progreso() {
				return evaluacionStorage.count/this.preguntas.length;
			},
			get respuesta() {
				return (evaluacionStorage.getRespuesta(this.pregunta.id))?evaluacionStorage.getRespuesta(this.pregunta.id).idAlternativa:undefined;
			},
			set respuesta(value){
				evaluacionStorage.addRespuesta(this.pregunta.id,value,this.pregunta.modulo.id);
				if(this.progreso==1){
					$scope.buttons.Terminar.disable=false;
				}
			},
			get preguntas(){
				return $scope.evaluacion.preguntas;
			},
			get pregunta(){
				return this.preguntas[this.current];
			},
			get recurso(){
				return this.pregunta.recursos;
			},
			get imagen(){
				var imagen=_.findWhere($scope.ficha.recurso.sources,{tipo:"CONTENIDO"});
				if(imagen){
					return imagen;
				}else{
					console.warn($scope.ficha.recurso);
				}
			}
		};
		$scope.parse={
			Url:function(url){
				if(url){
				return url.replace(' ',"%20");
				}else{
					console.warn("no existe url"+url);
				}
			},
			Char:function(key){
				return String.fromCharCode('a'.charCodeAt() + key)
			}
		}
		// botones
		$scope.buttons={
			Omitir:{				
				get disable(){
					if($scope.ficha.respuesta===null){
						return true;
					}
					return false;
				},
				action:function() {

					$scope.ficha.respuesta=null;
					$scope.buttons.Siguiente.action();
				}
			},
			Anterior:{
				disable:true,
				action:function() {
					$scope.ficha.current--;
				}
			},
			Siguiente:{
				disable:false,
				action:function() {

  					if($scope.ficha.respuesta!==undefined){
						$scope.ficha.current++;
  					}else{
  						audio.pause();
						error.src='src/audio/trabajador/EVA_ERROR.mp3';
						error.play();
  						toastr.info('Para poder continuar seleccione una alternativa, si no sabe la respuesta presione el botón naranja "No sé".', 'Información');
  					}
				}
			},
			Terminar:{
				disable:true,
				action:function() {
					evaluacionStorage.terminarEvaluacion('TERMINADO').then(function(s){
						trabajadorStorage.q=null;
						evaluacionStorage.eliminarEvaluacion();
						$location.path("/finished");
					}
					);
				}
			}
		};
		$scope.ficha.current=0;
	}
]);