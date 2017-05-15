/**
* trabajador Module
*
* Termino del sistema
*/
angular.module('trabajador')
.controller('psicologicoPcaController', ['$scope','$sce','$location','$timeout','toastr','psicologicopcaServices','trabajadorStorage', function($scope,$sce,$location,$timeout,toastr,psicologicopcaServices,trabajadorStorage){
   //$scope.url = $sce.trustAsResourceUrl('https://timshr.com/pruebapca//default.aspx?codigo=276bb6d9-a531-46cc-b851-db7fa6567c44&correo=&lang=es-cl&pS=0&inv=1&uD=0&iFrm=1');

    if(trabajadorStorage.q){
        $scope.trabajador=trabajadorStorage.q;
        if($scope.trabajador.identity){
            $scope.cod_pc = $scope.trabajador.identity;
            gotSurvey();
            console.log( trabajadorStorage.q.identity);
        }else{
            inscripcion();
            console.log(trabajadorStorage.q.identity);
        }

    }else{
       
        console.warn('Redireccionar'); //  
        $scope.hide = 'hide';
    }




    $scope.termino = function()
    {
       if(trabajadorStorage.q){  
            console.warn(trabajadorStorage.q);
            $scope.hide = '';
            var consulta = {  codpca: $scope.cod_pc};
            p = psicologicopcaServices.getresult(consulta);
            p.then(function(request){
                if  (request.data.GetResultResult._x003C_Ok_x003E_k__BackingField)
                    {
                        console.log(request.data.GetResultResult);
                        $scope.hide = 'hide';
                        toastr.info('a finalizado la Evaluación', 'Información');
                    }
                else if (request.data.GetResultResult._x003C_Info_x003E_k__BackingField == "Evaluación no finalizada") 
                    {
                        console.log('pendiente');
                        toastr.info('Aún no ha finalizado la evaluación', 'Información');
                        $scope.hide = 'hide';
                    }
                 
                }, 
            function(request) 
            {
                console.warn(request.data);
            });
        } 
    };






    function inscripcion() {
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
        p = psicologicopcaServices.inscripcion(inscripcion);
        p.then(function(request) {
            if(request.data.AddSurveyResult._x003C_Ok_x003E_k__BackingField){
                $scope.url = $sce.trustAsResourceUrl(request.data.AddSurveyResult._x003C_PcaLink_x003E_k__BackingField);
                $scope.cod_pc = request.data.AddSurveyResult._x003C_PcaCod_x003E_k__BackingField;
                $scope.trabajador.identity= $scope.cod_pc;
                trabajadorStorage.q = $scope.trabajador;
                $scope.hide = 'hide';
                console.log( $scope.cod_pc);
            }else{
                    //depurar
                    console.log('renviar informacion');
                }

            }, function(request) {
             console.warn(request.data);
         });

    }
    function gotSurvey(){
        $scope.hide = '';
        var survey = {  codpca: $scope.cod_pc};
        p = psicologicopcaServices.gotosurvey(survey);
        p.then(function(request){
            $scope.url = $sce.trustAsResourceUrl(request.data.GoToSurveyResult._x003C_PcaLink_x003E_k__BackingField);
              $scope.hide = 'hide';       
        }, 
        function(request) 
        {
            console.warn(request.data.GoToSurveyResult);
        });

    }

    }])
