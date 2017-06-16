angular.module('Ot')
.controller('ot.viewController', [
	'$scope',
	'toastr',
	'$location',
	'ot',
	'apiServices',
	'FileSaver',
	'Blob',
	'RutHelper',
	function($scope,toastr,$location,ot,apiServices,FileSaver,Blob,RutHelper){
		var trabajadorServices = apiServices.model("trabajador");
		var otTServices = apiServices.model("ordentrabajotrabajador");
		$scope.model=ot.data;
		function addTrabajador(trabajador) {
			otTServices.save({ot_id:ot.data.id,tra_id:trabajador.id}).then(function(q) {
				$scope.model.trabajador.push(trabajador);
			},function(q) {
				console.warn(q);
			})
		}
		$scope.rmTrabajador=function(key) {
			var trabajador=$scope.model.trabajador[key];
			otTServices.params({ot_id:ot.data.id,tra_id:trabajador.id}).search().then(
				function(q) {
					otTServices.remove(q.data[0].id).then(function(e) {
						$scope.model.trabajador.splice(key,1);
						toastr.success("Eliminado con exito","Éxito");
					},function(e) {
						toastr.error("Error al eliminar.","Error");
						console.log(e);
					})
				}
			)
		}
  		$scope.read = function (workbook) {
			var trabajador=XLSX.utils.sheet_to_json (workbook.Sheets[workbook.SheetNames[0]]);
			var error={};
			trabajador.forEach(function(t) {
				if(t.rut===undefined){
					error.columna_rut=true;
				}else{
					if(RutHelper.validate(t.rut)){
						t.rut=RutHelper.format(t.rut);
						var persona=_.findWhere($scope.model.trabajador,{rut:t.rut});
						if(persona){
							persona.nombre=t.nombre||persona.nombre;
							persona.paterno=t.paterno||persona.paterno;
							persona.materno=t.materno||persona.materno;
							trabajadorServices.save(persona).then(function(q) {
								console.log("guardo el trabajador con exito");
							},function(q) {
								console.warn(q);
							});
						}else{
							trabajadorServices.search({rut:t.rut}).then(function(q) {
								console.log("Lo encontro");
								q.data[0].nombre=t.nombre||q.data[0].nombre;
								q.data[0].paterno=t.paterno||q.data[0].paterno;
								q.data[0].materno=t.materno||q.data[0].materno;
								trabajadorServices.save(q.data[0]).then(function(e) {
									addTrabajador(e.data);
								});
							},function(q) {
								console.log("No encontro trabajador");
								trabajadorServices.save(t).then(function(e) {
									console.log("guardo");
									addTrabajador(e.data);
								})
							});
						}
					}else{
						toastr.error("Atencion el RUT : "+RutHelper.format(t.rut)+", no es válido.","¡Atención!");
					}
				}
			});
			if(error.columna_rut)
				toastr.error("No existe la columna rut en el xls","¡Atención!");
		}
		$scope.error = function (e) {
		}

		$scope.downloadPlantilla=function() {
			var utils={
				toSql:function(list,headers) {
					return [headers].concat(_.map(list,function(q) {
						var l=[];
						headers.forEach(function(h) {
							l.push(q[h]);
						})
						return l;
					}));
				},
				s2ab:function(s) {
				  var buf = new ArrayBuffer(s.length);
				  var view = new Uint8Array(buf);
				  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				  return buf;
				}
			}
			var ws = XLSX.utils.aoa_to_sheet(utils.toSql($scope.model.trabajador,["rut","nombre","paterno","materno"]));
			var wb = { SheetNames:["trabajadores"], Sheets:{trabajadores:ws} };
			var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

			var wbout = XLSX.write(wb,wopts);
			FileSaver.saveAs(new Blob([utils.s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "trabajador.xlsx");
		}

	}
])