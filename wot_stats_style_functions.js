/*
*	Description: 	Support js-file to the site Say Wot? - Stats, World of Tanks statistics engine (http://saywotstats.net)
*	VersionInfo:  	Using WOT API v1.X
*	Author:  		Johan "DaWoody" Wedfelt
*	AuthorUrl: 		https://github.com/DaWoody
* 	Feedback/Dev:  	http://saywotstats.blogspot.se 
*	License:   		GNU General Public License, version 3(GPL-3.0) (http://opensource.org/licenses/GPL-3.0)
*  		
*/
jQuery(document).ready(function(){

	$.fn.printColorToStat = function(statName, value){
		var result;
		switch(statName){
			case 'averageWinRate': {
				result = setWinRateColor(value);
			}
			break;

			case 'wn7':{
				result = setWN7Color(value);
			}
			break;

			case 'totalBattlesPlayed':{
				result = setBattlesPlayedColor(value);
			}
			break;

			default: {
				console.log('This color coding message was reached by the default method');
			}
			break; 
		}	
		return result;
	}
	//Color the winratio
	function setWinRateColor(value){
		var color;
			//Unicum
			if (value>=60) {
				color = '#e2c0ff';
			}
			//Great
			else if(value>54&&value<60) {
				color = '#a1d7fd';
			}
			//Good
			else if(value>51&&value<=54) {
				color = '#68f06b';
			}
			//Average
			else if(value>48&&value<51){
				color = '#f8ec87';
			}
			//Bad
			else if(value<48){
				color = '#f54747';
			}
			//Default color
			else {
				color = 'rgba(249,194,183,0.8)';
			}
		return color;

	}
	//Color the WN7 stats
	function setWN7Color(value){
		var color;
			//Unicum
			if (value>1700) {
				color = '#e2c0ff';
			}
			//Great
			else if(value>=1500&&value<1700) {
				color = '#a1d7fd';
			}
			//Good
			else if(value>=1200&&value<1500) {
				color = '#68f06b';
			}
			//Average
			else if(value>=900&&value<1200){
				color = '#f8ec87';
			}
			//Bad
			else if(value<900){
				color = '#f54747';
			}
			//Default color
			else {
				color = 'rgba(249,194,183,0.8)';
			}
		return color;
	}
 	//Color the total battles played
	function setBattlesPlayedColor(value){
		var color;
			//Unicum
			if (value>=20000) {
				color = '#e2c0ff';
			}
			//Great
			else if(value>14500&&value<20000) {
				color = '#a1d7fd';
			}
			//Good
			else if(value>=10000&&value<14500) {
				color = '#68f06b';
			}
			//Average
			else if(value>=3000&&value<10000){
				color = '#f8ec87';
			}
			//Bad
			else if(value<3000){
				color = '#f54747';
			}
			//Default color
			else {
				color = 'rgba(249,194,183,0.8)';
			}
		return color;
	}

});