var gee = {
	viewModelList: [],
	
	observable: function(initialValue){
		var func = function(){
			if(arguments.length == 0){
				return this.__value;
			}else{
				this.__value = arguments[0];
			}
		};
		func.__value = initialValue;
		func.__observers = [];
		return func;
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
			var dataBindAttr = t.getAttribute('data-bind');
			if(dataBindAttr){
				// var as = JSON.parse(dbAttr);	//attributes
				var as = this._parseAttribute(dataBindAttr);
				for(var i in as){
					console.log(viewModel)
					console.log(as[i])
					if(viewModel.hasOwnProperty(as[i])){
						console.log('vm is' + viewModel);
						viewModel[as[i]].__observers.push({node: t, type: i});		//add observers to the specific function
						
						if(i == 'text'){
							console.log(123)
							var observable = viewModel[as[i]];
							console.log(t);
							t.innerHTML = observable.apply(observable, []);
						}
					}
				}		//end of for
			}		//end of if
		}		//end of for
	},
	
	_parseAttribute: function(str){
		var attrs = str.split(',');
		var obj = {};
		for(var i = 0; i < attrs.length; i++){
			var attrPair = attrs[i].split(':');
			var key = attrPair[0];
			var value = attrPair[1];
			
			// if(value.indexOf('"') < 0 && value.indexOf("'") < 0){
				// value = '"' + value + "'";
			// }
			obj[key] = value;		
		}
		
		return obj;
	}
	
	
	
	
	
	







	
	
}
