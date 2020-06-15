;(function(){

    module.exports = function(){

        const {Translate} = require('@google-cloud/translate').v2;
        const TAG = '[Translate.js]';

        function log(e){
            console.log(TAG + ' ' + e);
        }
        
        async function getKor(text,callback) {
            const translate = new Translate();
            const target = 'kor';
            try{
                let [translations] = await translate.translate(text, target);
                translations = Array.isArray(translations) ? translations : [translations];
                log('Translations:');
                var ret = '';
                translations.forEach((translation, i) => {
                    log(`${text[i]} => (${target}) ${translation}`);
                    ret = ret + translation;
                });
                callback(ret);
            }catch(e){
                log(e.response);  
                return;
            }  
        }
    
        return {
            getKor : getKor,
        }
    }

})();