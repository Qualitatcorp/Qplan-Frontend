/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.summaryController', ['$scope','toastr','$timeout','ot','$uibModal','apiServices',function($scope,toastr,$timeout,ot,$uibModal,api){
	var fichaServices=api.model('ficha');
	$scope.tercero=_(ot.data.modulos).filter( function(q) {
		  return q.evaluacion.search('TERCERO')!=-1
		});
	if(ot.data.fichanotas){
		ot.data.fichanotas.forEach(function(ficha) {
			angular.extend(_(ot.data.fichanotas).findWhere({id:ficha.id}),{trabajador:_(ot.data.trabajador).findWhere({id:ficha.tra_id})});
		});
	}
	if(ot.data.trabajador){
		ot.data.trabajador.forEach(function(trabajador) {
			if(_(ot.data.fichanotas).findWhere({tra_id:trabajador.id})){

			}else{
				api.model('ficha').save({
					ot_id:ot.data.id,
					tra_id:trabajador.id,
					proceso:'PENDIENTE'
				}).then(function(q) {
					ot.data.fichanotas=q.data;
				})
			}
		})
	}

	$scope.model=ot.data;
	$scope.addPractica=function(ficha) {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/ot/practica/modal.html',
			size: 'md',
			controller:['$scope','apiServices','$uibModalInstance','toastr',"$route",'ficha','modulos',
				function($scope,api,modal,toastr,$route,ficha,modulos) {
					var fichapracticaServices=api.model('fichapractica');
					var fichaServices=api.model('ficha');
					var map = function(v,a,b,c,d){return (v-a)*(d-c)/(b-a)+c;}
					var list=[];
					modulos.forEach(function(modulo) {
						var ficp=_(ficha.data.ficpracticas).findWhere({mod_id:modulo.id});
						if(ficp){
							list.push({
								modulo:modulo,
								ficp:ficp
							})
						}else{
							list.push({
								modulo:modulo,
								ficp:{
									mod_id:modulo.id,
									fic_id:ficha.data.id
								}
							})
						}
					})
					list.forEach(function(model) {
						if(model.ficp.nota){
							model.notaTemp=Math.round(map(model.ficp.nota,0,1,1,7)*10)/10;
						}
					})
					$scope.modulos=list;
					$scope.save=function(){
						var flag=false;
						angular.forEach($scope.modulos,function(modulo){
							if(modulo.notaTemp!=undefined){
								modulo.ficp.nota=map(modulo.notaTemp,1,7,0,1);
								fichapracticaServices.save(modulo.ficp);
							}else{
								flag=true;
							}
						});
						if(flag){
							toastr.warning('Se han guardado los cambios,pero no se ha ingresado todas las nota.','Atención');
						}else{
							if(ficha.data.proceso){
								ficha.data.proceso+=',FINALIZADO PRACTICA';
							}else{
								ficha.data.proceso='FINALIZADO PRACTICA';
							}
							fichaServices.save(ficha.data);
							toastr.success('Se han guardado con exito la evaluación.','Atención');
						}
						modal.close();
						$route.reload();
					}
				}
			],
			resolve:{
				modulos:function() {
					return _(ot.data.modulos).filter( function(q) {
					  return q.evaluacion.search('PRACTICA')!=-1
					})
				},
				ficha:api.model('ficha').expand('ficpracticas').get(ficha.id)
			}
		});
	}
}])