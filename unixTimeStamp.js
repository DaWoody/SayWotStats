/*
$.fn.fromUnixToDate = function(options) {
	var settings = $.extend({unixTime:0}, options);

	var unixTimeInput = settings.unixTime;

	var date = new Date();

	date.setTime(unixTimeInput);

	//console.log('Based on the value you put in, ' + settings.unixTime + ',the time from 1970-01-01 in minutes: ' + minutes +' .. or in hours: ' + hours + 'or in years: ' + years);
	console.log('Does it work:' + date);
}



jQuery(document).ready(function(){
		
		$('body').fromUnixToDate({unixTime:1332403882588});

});
*/