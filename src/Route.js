;(function(){
	module.exports=function(_g){

		const TAG = '[Route.js]';

		var app = _g.app;
		var translate = _g.translate;


		var wordmap={};

		function log(e){
			console.log(TAG + ' ' + e);
		}

		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});

			app.get('/translate',function(req,res){
				const q=req.query.q;
				log('q:' + q);
				
				if(q == '' || q== null || q===undefined){
					res.send('');
					return;
				}
				
				if(wordmap[q]!=undefined && wordmap[q]!=null){
					log(`${q} => (kor) ${wordmap[q]} | not using google.`);
					res.send(wordmap[q]);
					return;
				}
				
				translate.getKor(q,(kor)=>{
					wordmap[q]=kor;
					res.send(kor);
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



