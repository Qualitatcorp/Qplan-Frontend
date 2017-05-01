"use strict"

angular.module("ApiRest")
.factory('evaluacionStorage', function(){
	var ficha={respuesta:[]};
	var evaluacion={"title":"Evaluación Técnica","especialidad":"Mecanico","preguntas":[{"alternative":[{"id":1,"title":"Directamente proporcional."},{"id":2,"title":"Inversamente proporcional."},{"id":3,"title":"Constante."},{"id":4,"title":"Mayor en el engranaje motor."},{"id":5,"title":"Mayor en el engranaje introduce."},{"id":6,"title":"Ninguna de las anteriores."}],"id":1,"recurso":{"tipo":"image","sources":{"src":"src/image/1.JPG"}},"title":"Si sabemos que en un sistema de transmisión, la velocidad en el engranaje motor es mayor que la desarrolada por el engranaje incluido. ¿Como es la relacion de Torque entre ellos?"},{"id":2,"title":"Según,  la identificación de los grados de dureza del perno podemos determinar el torque, entonces un perno SAE 8,8 es :","recurso":{"tipo":"image","sources":{"src":"src/image/2.JPG"}},"alternative":[{"id":7,"title":"Altamente residente al torque."},{"id":8,"title":"Medianamente residente al torque."},{"id":9,"title":"Mínimamente resistente al torque."},{"id":10,"title":"Todas las anteriores."},{"id":11,"title":"Ninguna de las anteriores."}]},{"id":3,"title":"Video Prueba","recurso":{"tipo":"video","sources":{"src":"src/video/Luis Fonsi[1080].mp4","type":"video/mp4"},"options":{"loop":true,"autoplay":true,"controls":true,"preload":"auto"}},"alternative":[{"id":13,"title":"Altamente residente al torque."},{"id":14,"title":"Medianamente residente al torque."},{"id":15,"title":"Mínimamente resistente al torque."},{"id":16,"title":"Todas las anteriores."},{"id":17,"title":"Ninguna de las anteriores."}]},{"title":"Sonido Prueba","recurso":{"tipo":"audio","sources":{"src":"src/audio/Shakira[high].mp3","type":"audio/mpeg"},"options":{"autoplay":true,"loop":true}},"alternative":[{"id":13,"title":"Altamente residente al torque."},{"id":14,"title":"Medianamente residente al torque."},{"id":15,"title":"Mínimamente resistente al torque."},{"id":16,"title":"Todas las anteriores."},{"id":17,"title":"Ninguna de las anteriores."}]}]};
	
	return {
		nuevaEvaluacion:function(idTrabajador,idEvaluacion) {
			ficha={respuesta:[]};
			ficha.idTrabajador=idTrabajador;
			ficha.idEvaluacion=idEvaluacion;
			ficha.creado=moment().format("YYYY-MM-DD HH:mm:ss");
		},
		addRespuesta:function(idPregunta,idAlternativa){
			var respuesta = this.getRespuesta(idPregunta);
			if(respuesta){
				respuesta.idAlternativa=idAlternativa;
				respuesta.creado=moment().format("YYYY-MM-DD HH:mm:ss");
			}else{
				ficha.respuesta.push({
					idPregunta:idPregunta,
					idAlternativa:idAlternativa,
					creado:moment().format("YYYY-MM-DD HH:mm:ss")
				});
			}
		},
		getRespuesta:function(idPregunta){
			return _.findWhere(ficha.respuesta, {idPregunta:idPregunta});
		},
		eliminarEvaluacion:function() {
			ficha=null;
			console.log("Evaluacion eliminada");
		},
		cargarEvaluacion:function() {
			console.log("Carga de evaluaciones");
		},

		// variables dinamicas
		get count() {
			return ficha.respuesta.length;
		},
		get evaluacion(){
			return evaluacion;
		}
	};
})