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
		var d = documentRoot? documentRoot : document;
		viewModel.__documentContext = documentRoot;
		this.viewModelList.push(viewModel);
		this.parse(viewModel, d);
	},
	
	parse: function(viewModel, documentRoot){
		var tags = documentRoot.getElementsByTagName('*');
		
		for(var i = 0; i < tags.length; i++){
			var t = tags[i];
			var dbAttr = t.getAttribute('data-bind');
			if(dbAttr){
				dbAttr = '{' + dbAttr + '}';
				var as = JSON.parse(dbAttr);	//attributes
				for(var i in as){
					console.log(i, as[i]);
					if(vm.hasOwnProperty(as[i])){
						vm[as[i]].__observers.push({node: t, type: i});		//add observers to the specific function
						
						if(i == 'text'){
							var observable = vm[as[i]];
							t.innerHTML = observable.apply(observable, []);
						}
					}
				}		//end of for
			}		//end of if
		}		//end of for
	}
	
}
