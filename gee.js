var gee = {
	viewModelList: [],
	
	observable: function(initialValue){
		var self = this;
		
		var meta = {};
		
		
		var func = function(){
			console.log('this is', this)
			if(arguments.length == 0){		//get
				return meta.__value;
			}else{		//set
				var v = meta.__value = arguments[0];
				// var observers = meta.__observers = meta.__observers === undefined? [] : this.__observers;
				var observers = meta.__observers;
				
				for(var i = 0; i < observers.length; i++){
					var ob = observers[i],
						node = ob.node,
						type = ob.type;
						
					self._updateDom(node, type, v);
				}
			}
		};
		
		meta.__value = initialValue;
		meta.__observers = [];
		func._meta = meta;
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
				for(var k in as){
					var v = as[k];
					console.log(viewModel)
					console.log(v)
					if(viewModel.hasOwnProperty(v)){
						console.log('vm is' + viewModel);
						console.log(viewModel)
						console.log(viewModel['name'].__observers)
						viewModel[v]._meta.__observers.push({node: t, type: k});		//add observers to the specific function
						
						if(k == 'text'){
							var observable = viewModel[v];
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
	},
	
	_updateDom: function(node, type, value){
		console.log('in update dom')
		console.log(arguments)
		switch(type.toLowerCase()){
			case 'text':
				node.innerHTML = value;
				break;
			case 'value':
			
				break;
			case 'foreach':
			
				break;
			
		}
		
		
	}
	
}
