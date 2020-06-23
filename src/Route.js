"use strict";
;(function(){
	module.exports=function(_g){

		const TAG = '[Route.js]';

		var app = _g.app;
		var translate = _g.translate;

		function log(e){
			console.log(TAG + ' ' + e);
		}

		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});

			app.get('/translate',function(req,res){
				const q = req.query.q;
				const target = translate.getTarget(req.query.target);
				log('q:' + q);
				
				if(q == '' || q== null || q===undefined){
					res.send('');
					return;
				}
				
				const text = translate.getValueInMap(q, target);
				if(text != null) {
					log(`${q} => (${target}) ${text} | not using google.`);
					res.send(text);
					return;
				}
				
				translate.execute(q, target, (translatedText) => {
					translate.setValueInMap(q, target, translatedText);
					res.send(translatedText);
				});
			});

			//1. enetry point
			app.listen(6615,function(){
			  preLoad();
			  log('BaBelBox#BBB! Server listen on *:6615');
			});
		}

		function preLoad(){
			//to-do
		}

		var publicReturn = {
			route:route,
		}
		return publicReturn;
	}

})();



