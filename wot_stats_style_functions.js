jQuery(document).ready(function(){
	//Do cool stuff here..
	//Start by reading in the values from our XML file
	/*
	var styleXmlUrl = 'xml/wot_stats_style.xml';
	//var dataXml;

	var getStatStyling = {
		

		init: function(){

					//Defining color variables that will be set from the XML
					//color_1 = unicum, color_5 = bad;
					var color_1, color_2, color_3, color_4, color_5;

					$.ajax(styleXmlUrl, {
						dataType: 'xml',
						success: function(data){
						//Do stuff here
						console.log('Ok we did load it wot_stats_style!');
						setColorVariables(data);
						},
						error: function(data){
							//DO stuff here..
							console.log('we did not load..');
						}
					});

		}
	}


	function setColorVariables(data){
		color_1 = $(data).find('color_1').text();
		color_2 = $(data).find('color_2').text();
		color_3 = $(data).find('color_3').text();
		color_4 = $(data).find('color_4').text();
		color_5 = $(data).find('color_5').text();
		console.log('okfodkfd' + color_1);
	}

	//Init the script
	getStatStyling.init();

	//console.log(color_1);
	*/

	$.fn.printColorToStat = function(statName, value){
		var result;
		switch(statName){
			case 'averageWinRate': {
				 result = setWinRateColor(value);
			}
			break;

			default: {
				console.log('Ops this is default');
			}
			break; 
		}	
		return result;
		//console.log('You called the printColorToStat func, with values' + stat + ' and ' + value);
	}

	function setWinRateColor(value){
		var color;
		
			if (value>62) {
				color = '#914fea';
			}
			
			else if(value>55&&value<62) {
				color = '#4a7ecc';
			}
			
			else if(value>50&&value<55) {
				color = '#61dd51';
			}
			
			else {
				color = 'rgba(249,194,183,0.8)';
			}
			
		return color;
		/*
		var color;
		if(value>60){
			color = 'purple';
			return color;
		}
		*/
	}


});