/**
* trabajador Module
*
* Termino del sistema
*/
angular.module('trabajador')
.controller('psicologicoPcaController', ['apiServices','$scope','$sce','$location','$timeout','toastr','psicologicopcaServices','trabajadorStorage', function(apiServices,$scope,$sce,$location,$timeout,toastr,psicologicopcaServices,trabajadorStorage){

    $scope.hide = 'hide';  //para usar loader
    var trabajador=function(){
        if(trabajadorStorage.q){
            $scope.trabajador=trabajadorStorage.q;
            if($scope.trabajador.identity){
                gotoSurvey($scope.trabajador.identity);
            }else{ 
                ComprobarIdentityDB();   
            }
        }
        else
        {
           console.warn("no hay registros de trabajador, en session");
        }
    }
    
    var gotoSurvey =  function(codpca){
        var survey = {codpca: codpca};
        p = psicologicopcaServices.gotosurvey(survey)
        .then(function(success){
            $scope.url = $sce.trustAsResourceUrl(success.data.GoToSurveyResult._x003C_PcaLink_x003E_k__BackingField);
               
        }, 
        function(error) 
        {  
            console.warn(error.data);
        });

    }
    var ComprobarIdentityDB = function (){//verifica si esta en db
       
       apiServices.model('fichatercero').params({fic_id: $scope.trabajador.ficha.id}).search()
           .then( 
                function(q){ 
                    if(q.data[0].identity){
                        gotoSurvey(q.data[0].identity);
                        $scope.trabajador.identity =q.data[0].identity ;
                        trabajadorStorage.q = $scope.trabajador;
                        // console.log('recupera');
                    }else{
                        inscribir();
                        // console.log('inscribe');
                    }
                   
                   
                } 
            );
        
    }

    var inscribir =  function() {
    var inscripcion =  
    { 
        rut:$scope.trabajador.rut,
        sexo:$scope.trabajador.sexo,
        mail:$scope.trabajador.mail,
        nombre:$scope.trabajador.nombre,
        paterno:$scope.trabajador.paterno,
        materno:$scope.trabajador.materno,
        ficha:$scope.trabajador.ficha.id
    }
    p = psicologicopcaServices.inscripcion(inscripcion).then(function(success){
        if(success.data.AddSurveyResult._x003C_Ok_x003E_k__BackingField){
            $scope.url = $sce.trustAsResourceUrl(success.data.AddSurveyResult._x003C_PcaLink_x003E_k__BackingField);
            $scope.cod_pc = success.data.AddSurveyResult._x003C_PcaCod_x003E_k__BackingField;
            $scope.trabajador.fichaterceroId= success.data.fichaterceroId;
            $scope.trabajador.identity= $scope.cod_pc;
            trabajadorStorage.q = $scope.trabajador;
            console.log(success.data.fichaterceroId);
        }else{ 
            console.log('renviar informacion');
        }
    }, function(error) {
        console.warn(error.data);
        });
    }
    $scope.termino = function()
    { 
        toastr.info('verificando información', 'Información');
        var consulta = {  codpca:$scope.trabajador.identity, fichaterceroId:trabajadorStorage.q.fichaterceroId };
        psicologicopcaServices.getresult(consulta)
        .then(function(success){
               if  (success.data.GetResultResult._x003C_Ok_x003E_k__BackingField)
                    {
                        console.log("success test: "+success.data);
                        $scope.hide = 'hide';
                        toastr.info('a finalizado la Evaluación', 'Información');
                    }
                else //if (success.data.GetResultResult._x003C_Info_x003E_k__BackingField == "Evaluación no finalizada") 
                    {
                       
                        toastr.info('Aún no ha finalizado la evaluación', 'Información');
                        $scope.hide = 'hide';
                    }
            
        }, 
        function(error) 
        {  
            console.warn(error.data);
        });
    }

     trabajador();
}])
