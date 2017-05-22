angular.module('filters').filter('Calificacion',[function () {
	return function(input,cal) {
		var map = function(v,a,b,c,d){return (v-a)*(d-c)/(b-a)+c;}
		input=input||'';
		cal=cal||'Sobre 7';
		if(input!==''){
			switch(cal){
				case 'Sobre 7':
					input=Math.round(map(input,0,1,1,7)*10)/10;
					break;
				case 'Sobre 100':
					input=Math.round(map(input,0,1,0,100));
					break;
			}
		}
		return input;
	}
}])