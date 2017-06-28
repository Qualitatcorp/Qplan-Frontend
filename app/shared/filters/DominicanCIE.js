angular.module('filters').filter('CIE',[function () {
	return function(input) {
		var insert= function(str,ins,cut){return [input.slice(0,cut),input.slice(cut)].join(ins);}
		input=input||'';
		if(input!==''){
			if(/^[0-9\-]+$/.test(input)){
				if(input.length>3){
					input=input.replace(new RegExp('-','g'),'');
					input=insert(input,'-',3);
					if(input.length>11){
						input=insert(input,'-',11);
					}
				}
			}else{
				input=input.replace(/[^0-9\-]+/g,'');
				return input.replace(/[^0-9\-]+/g,'');
			}
		}
		return input;
	}
}])