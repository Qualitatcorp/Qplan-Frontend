"use strict"

angular.module("ApiRest")
.factory('evaluacionStorage', 
	[
		'apiServices',
		function(
			api
		){

			var fichaServices = api.model('ficha'),
			fichateoricoServices = api.model('fichateorico'),
			ficharespuestaServices = api.model('ficharespuesta');
			var ficha={respuesta:[]};
			var fichaSistema={};
			var moduloSistema=[];
			var respuestasSistema=[],
			createModules=function(f,modulos) {
				moduloSistema=[];
				if(f.ficteoricas)f.ficteoricas.forEach(function(fp) {
					fichateoricoServices.remove(fp.id);
				})
				modulos.forEach(function(m) {
					fichateoricoServices.save({
						mod_id:m.id,
						fic_id:f.id
					}).then(function(mNew) {
						moduloSistema.push(mNew.data);
					})
				});
			}
			return {
				nuevaEvaluacion:function(idTrabajador,idOt,modulos) {
					fichaServices.params({tra_id:idTrabajador,ot_id:idOt}).search().then(
						function(q) {
							fichaServices.expand('ficteoricas').get(q.data[0].id).then(function(success) {
								success.data.creacion=moment().format("YYYY-MM-DD HH:mm:ss");
								var proceso=success.data.proceso.split(',');
								proceso.push('EN PROGRESO TEORICO');
								success.data.proceso=proceso.join(',');
								fichaServices.save(success.data).then(function(f){
									fichaSistema=f.data;
									createModules(success.data,modulos);
								});
								ficha={respuesta:[]};
							},
							function(error) {
								console.warn(error);
							})
						},
						function() {
							fichaServices.save({
								tra_id:idTrabajador,
								ot_id:idOt,
								creacion:moment().format("YYYY-MM-DD HH:mm:ss"),
								proceso:'EN PROGRESO TEORICO',
								respuesta:[],
							}).then(function(f){
								fichaSistema=f.data;
								createModules(fichaSistema,modulos);
							});
						}
					)
				},
				addRespuesta:function(idPregunta,idAlternativa,idModulo){
					var respuesta = this.getRespuesta(idPregunta);
					if(respuesta){
						respuesta.idAlternativa=idAlternativa;
						respuesta.idModulo=idModulo;
						respuesta.creado=moment().format("YYYY-MM-DD HH:mm:ss");
					}else{
						ficha.respuesta.push({
							idPregunta:idPregunta,
							idAlternativa:idAlternativa,
							idModulo:idModulo,
							creado:moment().format("YYYY-MM-DD HH:mm:ss")
						});
					}
					var respuestaSistema=_.findWhere(respuestasSistema,{idPregunta:idPregunta});
					if(respuestaSistema){
						respuestaSistema.alt_id=idAlternativa;
						ficharespuestaServices.save(respuestaSistema).then(function(q) {
							// console.log(q);
						});
					}else{
						var modulo=this.getModulo(idModulo);
						ficharespuestaServices.save({
							fict_id:modulo.id,
							alt_id:idAlternativa,
							creado:moment().format("YYYY-MM-DD HH:mm:ss")})
						.then(function(q) {
							q.data.idPregunta=idPregunta
							respuestasSistema.push(q.data);
							// console.log(q);
						});
					}
				},
				getModulo:function(idModulo) {
					return _.findWhere(moduloSistema,{mod_id:idModulo});
				},

				getRespuesta:function(idPregunta){
					return _.findWhere(ficha.respuesta, {idPregunta:idPregunta});
				},
				eliminarEvaluacion:function() {
					ficha=null;
					console.log("Evaluacion eliminada");
				},
				terminarEvaluacion:function() {
					/*fichaSistema.proceso={'FINALIZADO TEORICO','EN PROGRESO SICOLOGICO'};*/
					fichaSistema.proceso='FINALIZADO TEORICO,EN PROGRESO SICOLOGICO';
					return fichaServices.save(fichaSistema);
				},
				// variables dinamicas
				get count() {
					return ficha.respuesta.length;
				},
			};
		}
	]
)