/*
*	WOT-Stats functions defined as plugins
*/

jQuery(document).ready(function(){
	
	/*
	*	Calculate Total Time Played WOT
	*/
	$.fn.calculateTotalTimePlayed = function(response) {

		//Define the local version of what we get in.
		var container = $(this);

		//The name of the player
		var tankerName = response.data.name;

		//Amount of battles played
		var battles = response.data.summary.battles_count;
		
		
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

		//console.log('Has devoted days:' + timeInDaysRounded + ', hours:' + timeInHoursRounded + ', and ' + timeInMinutes + 'minutes of his life playing WOT ;)');
		var timeContainer = $('<h1></h1>');
		timeContainer.append('Based on an average of about 5 minutes per game...<br>')
		timeContainer.append(tankerName+ ' has devoted ' + timeInDaysRounded + ' days.. '+ timeInHoursRounded + ' hours.. and ' + timeInMinutes + ' minutes of his life playing WOT ;)');

		//Now we write our results to the DOM
		container.append(timeContainer);

	}

	/*
	*	Calculates and shows the average winratio
	*/
	$.fn.averageWinRate = function(response) {
		//We define what we get in
		var container = $(this);
		//The average winrate
		var averageWinRate = response.data.ratings.battle_avg_performance.value;
		//Write it back to the DOM
		container.append('<h1>Average winrate: ' + averageWinRate + '&#37;</h1>');
	}


	/*
	*	Calculates and shows the creation time of the account based on a Unix time stamp
	*/
	$.fn.getAccountCreationTime = function(response){
		//We define what we get in
		var container = $(this);

		//Defining some variables
		var timeCreatedUnix = response.data.created_at;

		// create a new javascript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds
		var date = new Date(timeCreatedUnix*1000);
		//Get the year in four digits
		var year = date.getFullYear();
		//Get the month 1-12
		var month=new Array();
			month[0]="January";
			month[1]="February";
			month[2]="March";
			month[3]="April";
			month[4]="May";
			month[5]="June";
			month[6]="July";
			month[7]="August";
			month[8]="September";
			month[9]="October";
			month[10]="November";
			month[11]="December";
		var theMonth = month[date.getMonth()];


		var theDate = date.getDate();

		// hours part from the timestamp
		var hours = date.getHours();
		// minutes part from the timestamp
		var minutes = date.getMinutes();
		// seconds part from the timestamp
		var seconds = date.getSeconds();

		// will display time in 10:30:23 format
		var formattedTime = year + ' - ' + theMonth + ' - ' + theDate + ' - ' + hours + ':' + minutes + ':' + seconds;

		container.append('<h1>Account created: ' + formattedTime + '</h1>');
	}


	/*
	*	Show average experience
	*/
	$.fn.averageExperience = function(response) {
		//We define what we get in
		var container = $(this);
		//The average experience
		var averageExperience = response.data.ratings.battle_avg_xp.value;
		//Write it back to the DOM
		container.append('<h1>Average experience: ' + averageExperience + '</h1>');
	}

	/*
	*	Show average damage done
	*/
	$.fn.averageDamage = function(response) {
		//We define what we get in
		var container = $(this);
		//Total damage
		var totalDamage = response.data.ratings.damage_dealt.value;
		//Total amount of battles
		var battles = response.data.ratings.battles.value;

		var averageDamage = Math.round(totalDamage/battles);


		//Write it back to the DOM
		container.append('<h1>Average damage done: ' + averageDamage + '</h1>');
	}

	/*
	*	Show when the stats was last updated
	*/

	$.fn.showLastUpdated = function(response){
		//We define what we get in
		var container = $(this);

		//Defining some variables
		var lastUpdatedUnix = response.data.updated_at;

		// create a new javascript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds
		var date = new Date(lastUpdatedUnix*1000);
		//Get the year in four digits
		var year = date.getFullYear();
		//Get the month 1-12
		var month=new Array();
			month[0]="January";
			month[1]="February";
			month[2]="March";
			month[3]="April";
			month[4]="May";
			month[5]="June";
			month[6]="July";
			month[7]="August";
			month[8]="September";
			month[9]="October";
			month[10]="November";
			month[11]="December";
		var theMonth = month[date.getMonth()];


		var theDate = date.getDate();

		// hours part from the timestamp
		var hours = date.getHours();
		// minutes part from the timestamp
		var minutes = date.getMinutes();
		// seconds part from the timestamp
		var seconds = date.getSeconds();

		// will display time in 10:30:23 format
		var formattedTime = year + ' - ' + theMonth + ' - ' + theDate + ' - ' + hours + ':' + minutes + ':' + seconds;

		container.append('<h1>Stats updated: ' + formattedTime + '</h1>');
	}
	

	/*
	*	Show hit percentage
	*/	

	$.fn.showHitPercentage = function(response) {
		//We define what we get in
		var container = $(this);
		//Defining some variables
		var hitPercentage = response.data.battles.hits_percents;
		container.append('<h1>Hit percentage: ' + hitPercentage + '&#37;</h1>');
	}

});