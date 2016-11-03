var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();

/* GET home page. */
router.get('/naruto', function(req, res, next) {
  res.render('naruto', { title: 'Express123' });
});

router.get('/test',function(req, res, next){

	request('http://rasengan.cz/shippuuden', function (error, response, mainHtml) {
 	
	 if (!error && response.statusCode == 200) {
	   
	  var result = [];
	   var $ = cheerio.load(mainHtml);
	    
	    $('a').each(function(i, element){
	    	
	    	var title = $(this).text();
	    	var filler = isFiller($(this).text());

	    	if (hasNumbers($(this).text())){
	    		
	    		var match = title.match(/\d+/);
				var part = parseInt(match[0], 10);
				title = title.replace(part,'');

	      		result.push({title:title,
	      					 filler : filler,
	      					 part : part,
	      					 link : 0});
	  		}
	  	});		

	/*result.forEach((value, index)=>{
		console.log(value.part);
		request('http://rasengan.cz/shippuuden/' + value.part, function (error, response, html) {
			 if (!error && response.statusCode == 200) {
				console.log(html);
			}
			else{
				console.log(error);
			}
		});
	});*/

	 res.send(result);
	}
		 else{
	  		console.log(error);
		  }
	  });
	});


function isFiller(title){
	return (title.indexOf("Filler") !== -1) ? true : false;
}
function hasNumbers(t)
{
	var regex = /\d/g;
	return regex.test(t);
} 
module.exports = router;
