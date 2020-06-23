"use strict";
;(function(){

    module.exports = function(){

        const {Translate} = require('@google-cloud/translate').v2;
        const TAG = '[Translate.js]';
        const KOR = 'kor';
        const EN = 'en';
        
        var kormap={};
		var engmap={};

        function log(e){
            console.log(TAG + ' ' + e);
        }

        function getValueInMap(q, target) {
			if(target == KOR &&
				kormap[q] != null && kormap[q] != undefined) {
				return kormap[q];
			} else if(target == EN &&
				engmap[q] != null && engmap[q] != undefined) {
				return engmap[q];
			}
			return null;
		}

		function setValueInMap(q, target, text) {
			if(target == KOR) {
				kormap[q] = text;
			} else if(target == EN) {
				engmap[q] = text;
			}
		}


        function getTarget(target) {
            if(target == 'kor' || target == 'kr' || 
                target == 'korea') {
                    return KOR;
            } else if(target == 'en' || target == 'eng' ||
                target == 'english') {
                    return EN;
            }
            return KOR;
        }
        
        async function execute(text, target, callback) {
            target = getTarget(target);
            const translate = new Translate();
            try{
                let [translations] = await translate.translate(text, target);
                translations = Array.isArray(translations) ? translations : [translations];
                var ret = '';
                translations.forEach((translation, i) => {
                    log(`${text[i]} => (${target}) ${translation}`);
                    ret = ret + translation;
                });
                callback(ret);
            }catch(e){
                if(callback != null) {
                    log(e);
                    if(e.response != null && e.response != undefined) {
                        log(e.response);  
                    }
                }
                return;
            }  
        }
    
        return {
            execute : execute,
            getTarget : getTarget,
            getValueInMap : getValueInMap,
            setValueInMap : setValueInMap,
            KOR : KOR,
            EN : EN,

        }
    }

})();