var gee = {
	viewModelList: [],
	
	observable: function(){
		var func = function(){
			if(arguments.length == 0){
				return this.__value;
			}else{
				this.__value = arguments[0];
			}
		};
		fun.__value = {};
		func.__observers = [];
	},
	
	bind: function(viewModel, documentRoot){
		viewModel.__documentContext = documentRoot;
		this.viewModelList.push(viewModel);
	},
	
	parse: function(){
		
	}
	
	
	
}
