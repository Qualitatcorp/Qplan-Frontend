"use strict";
angular.module('trabajador')
.controller('evaluacionController', ['$filter','$scope','evaluacionStorage','$location','evaluacion','trabajadorStorage','toastr',
	function($filter,$scope,evaluacionStorage,$location,evaluacion,trabajadorStorage,toastr){
		var audioSrc,imageSrc;
		var audio = document.getElementById('player');
		// audio.onerror=function() {
		// 	audio.src=audioSrc;
		// 	audio.play();
		// }
		var playAudio=function(src){
				if(src){
					audio.src=audio.src;
				}else{
					audio.load();
				}
				audio.play();
				
		}

		$scope.repeat=function() {
			playAudio();
		}
		var perfil=evaluacion.data;
		var tipo=_.sample(_.uniq(_.pluck(perfil.preguntas,'tipo')));
		console.log('Evaluacion '+tipo);
		// Serializacion dependiendo del aleatorio
		var evaluacionSerializada={};
		evaluacionSerializada.perfil=perfil.nombre;
		evaluacionSerializada.preguntas=[];
		var modulos=[];
		var evaSerial={};
		var preguntas=_.where(perfil.preguntas,{tipo:tipo})
		preguntas.forEach(function(p){
			angular.extend(p,{
				alternativas:_.where(perfil.alternativas,{
					pre_id:p.id
				}),
				get recursos() {
					var recurso= _.findWhere(perfil.recursos,{pre_id:p.id})
					angular.extend(recurso,{
						sources:_.map(_.where(perfil.rhs,{rec_id:recurso.id}),function(rh) {
							return _.findWhere(perfil.sources,{id:rh.src_id});
						}),
						options:_.map(_.where(perfil.rho,{opt_id:recurso.id}),function(ro) {
							return _.findWhere(perfil.options,{id:ro.src_id});
						})}
					);
					return recurso;
				},
				modulo:_.findWhere(perfil.modteorica,{id:_.findWhere(perfil.pet,{evt_id:_.findWhere(perfil.evateorica,{id:p.eva_id}).id}).mop_id})
			});
		})

		evaluacionStorage.nuevaEvaluacion(trabajadorStorage.q.id,trabajadorStorage.q.ot.id,perfil.modteorica);

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
				setTimeout(function() {
					if($scope.ficha.audioPregunta){
						audioSrc=$scope.ficha.audioPregunta.src;
						audio.src=$filter('dinamicSource')($scope.ficha.audioPregunta.src);
						audio.play();
					}
					else{
						audio.pause();		
					}
				}, 1000);
			},
			get progreso() {
				return evaluacionStorage.count/this.preguntas.length;
			},
			get respuesta() {
				return (evaluacionStorage.getRespuesta(this.pregunta.id))?evaluacionStorage.getRespuesta(this.pregunta.id).idAlternativa:undefined;
			},
			set respuesta(value){
				evaluacionStorage.addRespuesta(this.pregunta.id,value,this.pregunta.modulo.id);
				if(this.progreso==1)
					$scope.buttons.Terminar.disable=false;
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
			video:{
				get options(){
					return $scope.ficha.recurso.option;
				},
				media:{
					get sources(){return $scope.ficha.recurso.sources} 
				}
			},
			audio:{
				get options(){
					$scope.ficha.recurso.option.poster=this.poster.src;
					return $scope.ficha.recurso.option;
				},
				media:{
					get sources(){
						return _.where($scope.ficha.recurso.sources,{type:"audio/mpeg"})
					} 
				},
				get poster(){
					return _.findWhere($scope.ficha.recurso.sources,{type:"image/jpeg"})
				}
			},
			get audioPregunta(){
				return _.findWhere($scope.ficha.recurso.sources,{title:"pregunta"});
			}


		};
		$scope.parse={
			Url:function(url){
				return url.replace(' ',"%20");
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
  						toastr.info('Antes de continuar, seleccione una alternativa, en caso contrario responda en el boton naranjo "Nose".', 'Información');
  					}
				}
			},
			Terminar:{
				disable:true,
				action:function() {
					evaluacionStorage.terminarEvaluacion().then(function(s){
						$location.path("termino");
					}
					);
				}
			}
		};
		$scope.ficha.current=0;

}])