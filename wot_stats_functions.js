/*
*	WOT-Stats functions defined as plugins
*/

jQuery(document).ready(function(){
	

	/*
	*	Calculate Total Time Played WOT
	*/
	$.fn.calculateTotalTimePlayed = function(battles, playerName) {
		
		//Define the local version of what we get in.
		var container = $(this);
		//Based on an average battle time around 5 minutes..
		var totalTimeInMinutes = battles*5;
		//Getting the time in days..
		var timeInDays = totalTimeInMinutes/(60*24);
		//Rounding down the days..
		var timeInDaysRounded = Math.floor(timeInDays);
		//Getting the rest of the time in hours..
		var timeInHours = (timeInDays-timeInDaysRounded)*24;
		//Rounding down the hours...
		var timeInHoursRounded = Math.floor(timeInHours);
		var timeInMinutes = Math.round((timeInHours-timeInHoursRounded)*60);

		//Do stuff here
		//console.log('Has devoted days:' + timeInDaysRounded + ', hours:' + timeInHoursRounded + ', and ' + timeInMinutes + 'minutes of his life playing WOT ;)');
		var timeContainer = $('<h1></h1>');
		timeContainer.append('Based on an average of about 5 minutes per game...<br>')
		timeContainer.append(playerName+ ' has devoted ' + timeInDaysRounded + ' days.. '+ timeInHoursRounded + ' hours.. and ' + timeInMinutes + ' minutes of his life playing WOT ;)');

		//Now we write our results to the DOM
		container.html(timeContainer);

	}


	$.fn.averageWinRate = function(averageWinRate) {
		//We define what we get in
		var container = $(this);
		//Write it back to the DOM
		container.html('<h1>Average winrate..:' + averageWinRate + '</h1>');
	}


	$.fn.getAccountCreationTime = function(creationUnixTime){
		//We define what we get in
		var container = $(this);

		//Creating the Date object
		var timeCreatedUTC = new Date();
				
		//Making the time display in UTC
		timeCreatedUTC.setTime(creationUnixTime);

		console.log('The account was created at: ' + timeCreatedUTC);
	}



});