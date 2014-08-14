/*
*	Description: 	Functions defined as plugins for the site, Say Wot? - stats (http://saywotstats.net)
*	VersionInfo:  	Using WOT API v2.X
*	Author: 		Johan "DaWoody" Wedfelt
*	AuthorUrl 		https://github.com/DaWoody
* 	Feedback/Dev:  	http://saywotstats.blogspot.se 
*	License:   		GNU General Public License, version 3(GPL-3.0) (http://opensource.org/licenses/GPL-3.0)
*	
*
*/

jQuery(document).ready(function(){
	
	/*
	*	Show Tanker Name
	*/
	$.fn.playerName = function(response, tankerId){
		var container = $(this);
		var playerName = response.nickname;
		container.append('<h1>Tanker: ' + playerName + '</h1>');
	} 


	/*
	*	Show Player Server
	*/
	$.fn.printServer = function(server) {
		var container = $(this);
		container.append('<h1>Server: ' + server + '</h1>');
	}

	/*
	*	Prints the headline to the total stats block
	*/
	$.fn.printTotalStatsHeader = function() {
		var container = $(this);
		var headline = '<div class="recent_total_stats_headline_div"><h1>Total</h1></div>';
		container.prepend(headline);
	}

	/*
	*	Prints the headline to the recent stats block
	*/
	$.fn.printRecentStatsHeader = function() {
		var container = $(this);
		var headline = '<div class="recent_total_stats_headline_div"><h1>24 Hours</h1></div>';
		container.prepend(headline);
	}

	/*
	*	Prints the headline to the older stats block
	*/
	$.fn.printOlderStatsHeader = function() {
		var container = $(this);
		var headline = '<div class="recent_total_stats_headline_div"><h1>2 Weeks</h1></div>';
		container.prepend(headline);
	}

	/*
	*	Calculate Total Time Played WOT
	*/
	$.fn.calculateTotalTimePlayed = function(response) {

		//Define the local version of what we get in.
		var container = $(this);

		//The name of the player
		var tankerName = response.name;

		//Amount of battles played
		var battles = response.summary.battles_count;
		
		
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

		//We define what we send to the color code
		var statName = 'averageWinRate';

		//Get total battles
		var totalBattlesPlayed = response.statistics.all.battles;

		//Get total wins, current
		var totalWins = response.statistics.all.wins;

		//The average winrate
		var averageWinRate = Math.round((totalWins/totalBattlesPlayed)*1000)/10;

		//Lets get the color code for this specific stat
		var color = container.printColorToStat(statName,averageWinRate);

		//Write it back to the DOM
		container.append('<h1>Average winrate: <span style="color:' + color + '">'+ averageWinRate + '&#37;</span></h1>');
	}


	/*
	*	Calculates and shows the creation time of the account based on a Unix time stamp
	*/
	$.fn.getAccountCreationTime = function(response){
		//We define what we get in
		var container = $(this);

		//Defining some variables
		var timeCreatedUnix = response.created_at;

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
		var averageExperience = response.statistics.all.battle_avg_xp;
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
		var totalDamage = response.statistics.all.damage_dealt;
		//Total amount of battles
		var battles = response.statistics.all.battles;

		var averageDamage = Math.round(totalDamage/battles);


		//Write it back to the DOM
		container.append('<h1>Average damage: ' + averageDamage + '</h1>');
	}

	/*
	*	Show when the stats was last updated
	*/

	$.fn.lastUpdated = function(response){
		//We define what we get in
		var container = $(this);

		//Defining some variables
		var lastUpdatedUnix = response.updated_at;

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

		container.append('<h1>Updated: ' + formattedTime + '</h1>');
	}

	/*
	*	Show total battles played
	*/
	$.fn.totalBattlesPlayed = function(response) {
		var statName = 'totalBattlesPlayed';
		//We define what we get in
		var container = $(this);
		//Defining some variables
		var totalBattlesPlayed = response.statistics.all.battles;
		//Lets get the color code for this specific stat
		var color = container.printColorToStat(statName,totalBattlesPlayed);
		container.append('<h1>Battles played: <span style="color:' + color + '">'+  totalBattlesPlayed + '</span></h1>');
	}
	

	/*
	*	Show hit percentage
	*/	
	$.fn.hitPercentage = function(response) {
		//We define what we get in
		var container = $(this);
		//Defining some variables
		var hitPercentage = response.battles.hits_percents;
		container.append('<h1>Hit percentage: ' + hitPercentage + '&#37;</h1>');
	}

	/*
	*	Show Clan Name and Image
	*/
	$.fn.clan = function(response, serverAbbreviation){
		
		var container = $(this);
		var clan = response.clan.clan;
		
		if(clan!==null){
			var clanName = response.clan.clan.abbreviation
			var clanImageUrl = response.clan.clan.emblems_urls.small;
			var clanId = response.clan.clan.id;
			var clanUrl = 'http://worldoftanks' + serverAbbreviation +  '/uc/clans/' + clanId + '-' + clanName + '/';
			container.append('<h1>Clan: ' + clanName + '<a href="' + clanUrl +'" target="wot_stats_clans"><img class ="clan_image" src="' + clanImageUrl + '" /></a>');	
		}
		
			
	}


	/*
	*	Show average damage during the past period 
	*/
	$.fn.averageDamagePast = function(response1, response2) {

		var container = $(this),
		damage24HoursAgo,
		totalDamage,
		damageLast24Hours,
		battlesLast24Hours,
		battles24HoursAgo,
		totalAmountOfBattles,
		averageDamageLast24Hours;

		//Total damage 24 hours ago.
		try {
			damage24HoursAgo = response2.stat.statistics.all.damage_dealt;
		}
		catch(error){
			damage24HoursAgo = 0;
		}	

		//Total amount of battles 24 hours ago
		try {
			battles24HoursAgo = response2.stat.statistics.all.battles;
		}
		catch(error){
			battles24HoursAgo = 0;
		}
		

		//Total damage, according to last update
		totalDamage = response1.statistics.all.damage_dealt;
		//The accumulated damage the last 24 hours
		damageLast24Hours = totalDamage - damage24HoursAgo;
		
		//Total amount of battles, to last update.
		totalAmountOfBattles = response1.statistics.all.battles;
		//The amount of battles the last 24 hours
		battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
		//Calculate the average damage done last 24 hours.
		averageDamageLast24Hours = Math.round(damageLast24Hours/battlesLast24Hours);
		container.append('<h1>Average damage: ' +  averageDamageLast24Hours + '</h1>');
	}

	/*
	*	Show amount of battles played the past 24 hours
	*/
	$.fn.battlesPlayedPast = function(response1, response2) {
		var container = $(this),
			battles24HoursAgo,
			totalAmountOfBattles,
			battlesLast24Hours,
			noResponse ="";
		//Total amount of battles, to last update.
		totalAmountOfBattles = response1.statistics.all.battles;

		//Total amount of battles 24 hours ago
		try {
			battles24HoursAgo = response2.stat.statistics.all.battles;
		}
		catch(error){
			battles24HoursAgo = totalAmountOfBattles;
			noResponse = "(No response with data recieved from API, blame it on the boggie ;))";
			//console.log("The error from battlesPlayedPast func is:" +  error);
		}
		//The amount of battles the last 24 hours
		battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
		container.append('<h1>Battles played: ' + battlesLast24Hours + '</h1><h4 style="color:#f54747">' + noResponse + '</h4>');
	} 


	/*
	*	Show the average experience gained per game the past period
	*/
	$.fn.averageExperiencePast = function(response1, response2) {
		//Define what we get in
		var container = $(this),
			battles24HoursAgo,
			totalXpGainedLast24,
			totalAmountOfBattles,
			battlesLast24Hours,
			totalXpGained,
			xpGainedPast24,
			averageXpGainedPast24;
			

		//First we will get the amount of battles for the past 24 hours
		//Total amount of battles, to last update.
		totalAmountOfBattles = response1.statistics.all.battles;
		//Total amount of battles 24 hours ago
		try{
			battles24HoursAgo = response2.stat.statistics.all.battles;
		}
		catch(error){
			battles24HoursAgo = totalAmountOfBattles;
			//console.log("No battles recorded the 24 last hours... TT. From averageExperiencePast func");
		}	
		
		//The amount of battles the last 24 hours
		battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

		//Now we will get the total xp gain and subtract how it looked 24 hours ago
		//Get the total XP so far
		totalXpGained = response1.statistics.all.xp;
		//Get the total XP from 24 hours back
		try{
			totalXpGainedLast24 = response2.stat.statistics.all.xp;
		}
		catch(error){
			totalXpGainedLast24 = totalXpGained;
		}
		
		//Subtract the difference to get the xp gained the past 24 hours
		xpGainedPast24 = totalXpGained - totalXpGainedLast24;
		//Now we calculate the average xp gained per fight the last 24 hours
		averageXpGainedPast24 = Math.round(xpGainedPast24/battlesLast24Hours);
		//Print it to the DOM
		container.append('<h1>Average experience: ' + averageXpGainedPast24 + '</h1>');
	}

	/*
	*	Shows average winrate from the past 24 hours
	*/
	$.fn.averageWinRatePast = function(response1, response2) {
		//Define what we get in
		var container = $(this),
		battles24HoursAgo,
		totalWinsLast24,
		statName,
		totalAmountOfBattles,
		battlesLast24Hours,
		totalWins,
		winsPast24,
		winRatioPast24,
		color;

		//We define what we send to the color code
		statName = 'averageWinRate';

		//What to do.
		//Get amount of battles and amount of wins, divide to get percentage

		//First we will get the amount of battles for the past 24 hours
		//Total amount of battles, to last update.
		totalAmountOfBattles = response1.statistics.all.battles;
		//Total amount of battles 24 hours ago
		try {
			battles24HoursAgo = response2.stat.statistics.all.battles;
		}
		catch(error){
			battles24HoursAgo = totalAmountOfBattles;
			//console.log("No battles recorded last 24 hours...");
		}
		
		//The amount of battles the last 24 hours
		battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

		//Get amount of wins for the past 24 hours
		//Get total wins, current
		totalWins = response1.statistics.all.wins;
		//Get total wins, 24 hours ago
		try {
			totalWinsLast24 = response2.stat.statistics.all.wins;
		}
		catch(error){
			totalWinsLast24 = totalWins;
		}
		
		//Subtract to get amount of wins for the past 24 hours
		winsPast24 = totalWins - totalWinsLast24;
		//Divide to get the win percentage from the past 24 hours
		winRatioPast24 = (Math.round(((winsPast24/battlesLast24Hours)*1000)))/10;

		//Lets get the color code for this specific stat
		color = container.printColorToStat(statName,winRatioPast24);

		//Print to DOM
		container.append('<h1>Average winrate: <span style="color:' + color + '">'+ winRatioPast24 + '&#37;</span></h1>');
	}

	/*
	*	Calculates average capture points over all battles
	*/
	$.fn.averageCapPoints = function(response) {
		var container = $(this),
		totalCapPoints,
		totalAmountOfBattles,
		averageCapPoints;

		totalCapPoints = response.statistics.all.capture_points;

		//Total amount of battles, to last update.
		totalAmountOfBattles = response.statistics.all.battles;
		
		if(totalAmountOfBattles === 0){
			averageCapPoints = 0;
		}
		else {
			averageCapPoints = Math.round((totalCapPoints/totalAmountOfBattles)*100)/100;
		}
		container.append('<h1>Average capture points: ' + averageCapPoints + '</h1>');
	}

	/*
	*	Calculates average capture points over the last period
	*/
	$.fn.averageCapPointsPast = function(response1, response2) {
		var container = $(this),
		totalCapPointsLast24,
		totalAmountOfBattles24Last,
		capPointsPast24,
		totalAmountOfBattles,
		battlesPast24,
		averageCapPoints,
		totalCapPoints;

		//Getting the total cap points
		totalCapPoints = response1.statistics.all.capture_points;
		//Getting total cap points from 24 hours ago
		try {
			totalCapPointsLast24 = response2.stat.statistics.all.capture_points;
		}
		catch(error){
			totalCapPointsLast24 = totalCapPoints;
		}
		

		capPointsPast24 = totalCapPoints - totalCapPointsLast24;

		//Total amount of battles, to last update.
		totalAmountOfBattles = response1.statistics.all.battles;
		//Total amount of battles, 24 hours ago.
		try {
			totalAmountOfBattles24Last = response2.stat.statistics.all.battles;
		}
		catch(error){
			totalAmountOfBattles24Last = totalAmountOfBattles;
		}
		
		//Calculate the battles the past 24 hours
		battlesPast24 = totalAmountOfBattles - totalAmountOfBattles24Last;

		if(battlesPast24 === 0){
			averageCapPoints = 0;
		}
		else {
			averageCapPoints = Math.round((capPointsPast24/battlesPast24)*100)/100;
		}
		
		container.append('<h1>Average capture points: ' + averageCapPoints + '</h1>');
		
	}

	/*
	*	Calculate average defense points
	*/
	$.fn.averageDefPoints = function(response) {
		var container = $(this);
		//Get the total number of def points
		var totalDefPoints = response.statistics.all.dropped_capture_points;
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response.statistics.all.battles;

		if(totalAmountOfBattles === 0){
			var averageDefPoints = 0;
		}
		else {
			var averageDefPoints = Math.round((totalDefPoints/totalAmountOfBattles)*100)/100;
		}
		
		container.append('<h1>Average defence points: ' + averageDefPoints + '</h1>');
	}


	/*
	*	Calculate average defense points the last period
	*/
	$.fn.averageDefPointsPast = function(response1, response2) {
		var container = $(this),
		totalDefPoints,
		totalDefPoints24Last,
		defPointsPast24,
		totalAmountOfBattles,
		totalAmountOfBattlesLast24,
		battlesPast24,
		averageDefPoints;

		//Get the total number of def points
		totalDefPoints = response1.statistics.all.dropped_capture_points;
		//Get the total number of def points 24 hours ago
		try{
			totalDefPoints24Last = response2.stat.statistics.all.dropped_capture_points;
		}
		catch(error){
			totalDefPoints24Last = totalDefPoints;
		}
		
		//Calculate the difference
		defPointsPast24 = totalDefPoints - totalDefPoints24Last;

		//Total amount of battles, to last update
		totalAmountOfBattles = response1.statistics.all.battles;
		//Total amount of battles, 24 hours ago
		try {
			totalAmountOfBattlesLast24 = response2.stat.statistics.all.battles;
		}
		catch(error){
			totalAmountOfBattlesLast24 = totalAmountOfBattles;
		}
		
		//Calculate the difference
		battlesPast24 = totalAmountOfBattles - totalAmountOfBattlesLast24;

		if(battlesPast24 === 0){
			averageDefPoints = 0;
		}
		else {
			averageDefPoints = Math.round((defPointsPast24/battlesPast24)*100)/100;
		}
		container.append('<h1>Average defence points: ' + averageDefPoints + '</h1>');
	}


	/*
	*	Shows the average tier played in total
	*/
	$.fn.averageTier = function(response1, response4, tankDataArray){
		//Defining our container
		var container = $(this),
		countMatchesIteration,
		countMatchesLevelIteration,
		tanksArray,
		tanksArrayLength,
		tankDataArrayLength,
		averageTier,
		totalAmountOfBattles,
		newTankArray = [];
		

		//Defining some variables we need when we iterate through the array
		countMatchesIteration = 0;
		countMatchesLevelIteration = 0;

		

		totalAmountOfBattles = response1.statistics.all.battles;


		//Getting in our vehicles array from the object
		var count=0;
		tanksArray = tankDataArray.data;
		
		
		for(var i=0, tanksArrayLength = response4.length; i<tanksArrayLength; i++){
			
			for(key in tanksArray) {
				//console.log(key);
				if(key == response4[i].tank_id){
					count++;
					//console.log(key);

					var modifiedTankNameArray = (tanksArray[key].name).split(':'),
						modifiedTankName = (modifiedTankNameArray[1]).toLowerCase();

					var imgUrl = 'http://worldoftanks.eu/static/3.21.0.4/encyclopedia/tankopedia/vehicle/' + tanksArray[key].nation + '-' + modifiedTankName + '.png'; 
					
					var newTank = {
									'tank_id': tanksArray[key].tank_id,
									'level': tanksArray[key].level,
									'name': tanksArray[key].name,
									'nation': tanksArray[key].nation,
									'short_name': tanksArray[key].name_i18n,
									'battles': response4[i].statistics.battles,
									'wins': response4[i].statistics.wins,
									'mark_of_mastery': response4[i].mark_of_mastery,
									'image_url': imgUrl
					};

					newTankArray.push(newTank);
				}
			}
		}
		console.log(count);
		console.log(newTankArray);

		/*
		for(var tank in tanksArray){
			//Getting the specific tier for this tank
			var tier = tanksArray[tank].level;
			//Getting the number of battles played in this tank
			var matches = tanksArray[tank].battle_count;
			//Iterating over all tanks and counting the amount of total games played
			countMatchesIteration = countMatchesIteration + matches;
			//Iterating and summing up the product of this tank's matches*tier
			countMatchesLevelIteration = countMatchesLevelIteration + (matches*tier);
		}
		//Do our average tier calculation
		averageTier = Math.round((countMatchesLevelIteration/countMatchesIteration)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTier + '</h1>');
		*/
		console.log("Leeengthy is " + tanksArrayLength);

		console.log("Leeengthy2 is " + tankDataArrayLength);
	}

	/*
	*	Shows the average tier over the last period, decided by the input
	*/
	$.fn.averageTierPast = function(response1, response2){

		//Define our first vehicles array
		var tanksArray1 = response1.vehicles;
		var tanksArray2 = response2.vehicles
		
		//This is the new array with elements from total stats, that also resides in recent stats
		var tanksArrayJoined = [];
		//This is the array that will hold new vehicle data, only available through total stats..
		var tanksArrayNew = [];

		//Lets start splitting the different length arrays in two, on with the elements that match and one with the newly added tanks
		//Here we will put our data that coincides over both recent and total stats, in a new array
		for(var tank2 in tanksArray2){

			var tankName2 = tanksArray2[tank2].localized_name;
			
			for(var i=0; i<tanksArray1.length; i++){
			
				if(tanksArray1[i].localized_name===tankName2){
					//Save the tank object in the new array, now that we found it
					tanksArrayJoined.push(tanksArray1[i]);
				}	
			}
		}	

		//Now lets find the odd elements, the new vehicles that recently showed up and push them into a new array.
		for(var tank1 in tanksArray1){

			var tankName1 = tanksArray1[tank1].localized_name;
			var tankExist = false;

			for(var i=0; i<tanksArray2.length; i++){
				var tankName2 = tanksArray2[i].localized_name;

				if(tankName1 === tankName2){
					tankExist = true;
				}

			}

			if(tankExist===false){
				//Do the splitting here, else do nothing..
				tanksArrayNew.push(tanksArray1[tank1]);
			}
		}

		//Defining what we get in
		var container = $(this);

		//Defining some variables we will use to iterate through the arrays and build up the integers for calculation
		var countMatchesIterationPast24 = 0;
		var countMatchesLevelIterationPast24 = 0;

		//Now lets check the joined array, containing vehicles that both existed now and 24 hours ago
		for(var tank in tanksArrayJoined){
			//Getting the specific tier for this tank
			var tier = tanksArrayJoined[tank].level;
			//Getting the number of battles played in this tank
			var matchesTotal = tanksArrayJoined[tank].battle_count;
			//Getting the number of battles played in this tank, at least how it looked 24 hours ago
			var matchesLast24 = tanksArray2[tank].battle_count;
			//Subtracting the difference to get the number of fights in this tank during the past 24 hours
			var matchesPast24 = matchesTotal - matchesLast24;
			//Iterating over all tanks and counting the amount of total games played the past 24 hours
			countMatchesIterationPast24 = countMatchesIterationPast24 + matchesPast24;
			//Iterating and summing up the product of this tank's matches*tier
			countMatchesLevelIterationPast24 = countMatchesLevelIterationPast24 + (matchesPast24*tier);
		}


		//Now lets check the new array, which only contains stats about vehicles bought during the past 24 hours
		for(var tank in tanksArrayNew){
			//Getting the specific tier for this tank
			var tier = tanksArrayNew[tank].level;
			//Getting the number of battles played in this tank
			var matchesTotal = tanksArrayNew[tank].battle_count;
			//Iterating over all tanks and counting the amount of total games played the past 24 hours
			countMatchesIterationPast24 = countMatchesIterationPast24 + matchesTotal;
			//Iterating and summing up the product of this tank's matches*tier
			countMatchesLevelIterationPast24 = countMatchesLevelIterationPast24 + (matchesTotal*tier);
		}


		//Do our average tier calculation
		var averageTierPast24 = Math.round((countMatchesLevelIterationPast24/countMatchesIterationPast24)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTierPast24 + '</h1>');

	}

	
	/*
	*	This will show us the name and the image of the most played vehicle in total
	*/
	$.fn.favoriteVehicleTotal = function(response) {
		//Define what we get in
		var container = $(this);
		//Define our vehicles array
		var tanksArray = response.vehicles;
		//Define our battles variable, this will increase as we iterate through
		var mostBattlesPlayed = 0;
		//Define the variable we will call to fetch the tank which is most used, we start with a really large number since then it won't be undefined in the array, but just not show up
		var tankIdMostPlayed = 99999999;

		//Now we iterate through all vehicles
		for(var tank in tanksArray){
			
			//Fetch the amount of battles for this vehicle
			var battles = tanksArray[tank].battle_count;
			
			
			//If the battles in this vehicle is more than our current max, mostBattlesPlayed, then we update our mostBattlesPlayed with this amount of battles and set tankIdMostPlayed to this tank
			if(battles>mostBattlesPlayed){
				mostBattlesPlayed = battles;
				tankIdMostPlayed = tank;
			}

		}
		//We check to see if there are any battles played at all
		if(typeof(tanksArray[tankIdMostPlayed])!== 'undefined'){
			//Define the vehicle name of the most played tank
			var vehicleName = tanksArray[tankIdMostPlayed].localized_name;
			//Define part of the url we need to show the image of the most played tank
			var vehiclePartImgUrl = tanksArray[tankIdMostPlayed].image_url;
			//Define the whole url of the most played tank
			var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;

			var vehicleImgObject = '<img class="vehicle_image" src="' + vehicleImgUrl + '">';
		}
		else{
			var vehicleName = '..Never gonna..';
			var vehiclePartImgUrl = '';
			var vehicleImgObject = '';
		}
		
		//Print it to the DOM
		container.append('<h1>Most played: ' + vehicleName + vehicleImgObject);
	}

	/*
	*	Shows us the name and image of the most played vehicle from the past 24 hours
	*/
	$.fn.favoriteVehiclePast = function(response1, response2) {
		
		//Define our first vehicles array
		var tanksArray1 = response1.vehicles;
		var tanksArray2 = response2.vehicles
		
		//This is the new array with elements from total stats, that also resides in recent stats
		var tanksArrayJoined = [];
		//This is the array that will hold new vehicle data, only available through total stats..
		var tanksArrayNew = [];

		//Lets start splitting the different length arrays in two, on with the elements that match and one with the newly added tanks
		//Here we will put our data that coincides over both recent and total stats, in a new array
		for(var tank2 in tanksArray2){

			var tankName2 = tanksArray2[tank2].localized_name;
			
			for(var i=0; i<tanksArray1.length; i++){
			
				if(tanksArray1[i].localized_name===tankName2){
					//Save the tank object in the new array, now that we found it
					tanksArrayJoined.push(tanksArray1[i]);
				}	
			}
		}	

		//Now lets find the odd elements, the new vehicles that recently showed up and push them into a new array.
		for(var tank1 in tanksArray1){

			var tankName1 = tanksArray1[tank1].localized_name;
			var tankExist = false;

			for(var i=0; i<tanksArray2.length; i++){
				var tankName2 = tanksArray2[i].localized_name;

				if(tankName1 === tankName2){
					tankExist = true;
				}

			}

			if(tankExist===false){
				//Do the splitting here, else do nothing..
				tanksArrayNew.push(tanksArray1[tank1]);
			}
		}
		
		//Define what we get in
		var container = $(this);

		//Set a variable to see if the vehicle exist in the new array(just bought it), or not
		var newVehicle = false;
		//Define our battles variable, this will increase as we iterate through
		var mostBattlesPlayed = 0;
		//Define the variable we will call to fetch the tank which is most used
		var tankIdMostPlayed = 999999999;

		//Now we iterate through all vehicles in the joined Array, we are still missing the potential vehicles in the newArray
		for(var tank in tanksArrayJoined){
			//Fetch the amount of battles for this vehicle
			var battlesTotal = tanksArrayJoined[tank].battle_count;

			var battlesLast24Hours = tanksArray2[tank].battle_count;

			var battlesPast24 = battlesTotal - battlesLast24Hours;

			//If the battles in this vehicle is more than our current max, mostBattlesPlayed, then we update our mostBattlesPlayed with this amount of battles and set tankIdMostPlayed to this tank
			if(battlesPast24>mostBattlesPlayed){
				mostBattlesPlayed = battlesPast24;
				tankIdMostPlayed = tank;
			}
		}

		//Lets see if we have any battles played in a new tank, in the newArray
		for(var tank in tanksArrayNew){
			//We check to see if there are any battles played at all
			if(typeof(tanksArrayNew[tankIdMostPlayed])!== 'undefined'){
			
				//Fetch the amount of battles for this vehicle
				var battlesTotal = tanksArrayNew[tank].battle_count;

				var battlesPast24 = tanksArrayNew[tank].battle_count;

				//If the battles in this vehicle is more than our current max, mostBattlesPlayed, then we update our mostBattlesPlayed with this amount of battles and set tankIdMostPlayed to this tank
				if(battlesPast24>mostBattlesPlayed){
					mostBattlesPlayed = battlesPast24;
					tankIdMostPlayed = tank;
					newVehicle = true;
				}
			}

		}

		/*
		//Define the vehicle name of the most played tank
		var vehicleName = tanksArrayJoined[tankIdMostPlayed].localized_name;
		
		//Define part of the url we need to show the image of the most played tank
		var vehiclePartImgUrl = tanksArrayJoined[tankIdMostPlayed].image_url;
		//Define the whole url of the most played tank
		var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;
		*/

		//We check to see if there are any battles played at all
		if(typeof(tanksArrayJoined[tankIdMostPlayed])!== 'undefined'){
			//Now lets see if we have a new vehicle that has been played most
			if(newVehicle===true){
				//Define the vehicle name of the most played tank, 
				var vehicleName = tanksArrayNew[tankIdMostPlayed].localized_name;
				//Define part of the url we need to show the image of the most played tank
				var vehiclePartImgUrl = tanksArrayNew[tankIdMostPlayed].image_url;
				//Define the whole url of the most played tank
				var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;
				var vehicleImgObject = '<img class="vehicle_image" src="' + vehicleImgUrl + '">';

			}
			else {
				//Define the vehicle name of the most played tank, 
				var vehicleName = tanksArrayJoined[tankIdMostPlayed].localized_name;
				//Define part of the url we need to show the image of the most played tank
				var vehiclePartImgUrl = tanksArrayJoined[tankIdMostPlayed].image_url;
				//Define the whole url of the most played tank
				var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;
				var vehicleImgObject = '<img class="vehicle_image" src="' + vehicleImgUrl + '">';
			}
			
		}
		else{
			var vehicleName = '..give you up!..';
			var vehiclePartImgUrl = '';
			var vehicleImgObject = '';
		}
		//Print it to the DOM
		container.append('<h1>Most played: ' + vehicleName + vehicleImgObject);
		
	}


	/*
	*	Average Spotted per game total
	*/
	$.fn.averageSpotted = function(response){
		var container = $(this);
		//Get the total amount of spots
		var totalSpotted = response.statistics.all.spotted;
		//Fetching the amount of battles
		var totalBattlesPlayed = response.statistics.all.battles;
		//Get the average spot, by dividing the spots with battles, and the rounding it for display
		var averageSpotted = Math.round((totalSpotted/totalBattlesPlayed)*100)/100;
		//Print to DOM
		container.append('<h1>Average spotted: ' + averageSpotted + '</h1>');
	}


	/*
	*	Average Spotted per game the last period
	*/
	$.fn.averageSpottedPast = function(response1, response2){
		var container = $(this),
		totalSpotted,
		totalBattlesPlayed,
		totalSpottedLast24,
		battlesLast24Hours,
		battlesPast24,
		spottedPast24,
		averageSpotted;

		//Get the total amount of spots
		totalSpotted = response1.statistics.all.spotted;
		//Fetching the amount of battles
		totalBattlesPlayed = response1.statistics.all.battles;
		//Lets get the total spotted as it were 24 hours ago
		try {
			totalSpottedLast24 = response2.stat.statistics.all.spotted;
		}
		catch(error){
			totalSpottedLast24 = totalSpotted;
		}
		
		//Total amount of battles 24 hours ago
		try{
			battlesLast24Hours = response2.stat.statistics.all.battles;
		}
		catch(error){
			battlesLast24Hours = totalBattlesPlayed;
		}
		
		//The amount of battles the last 24 hours
		battlesPast24 = totalBattlesPlayed - battlesLast24Hours;
		//The amount of spots the last 24 hours
		spottedPast24 = totalSpotted - totalSpottedLast24;

		//Get the average spot, by dividing the spots with battles
		averageSpotted = Math.round((spottedPast24/battlesPast24)*100)/100;
		
		container.append('<h1>Average spotted: ' + averageSpotted + '</h1>');
	}


	/*
	*	Average Frags Total
	*/
	$.fn.averageFrags = function(response){
		var container = $(this),
		totalBattlesPlayed,
		totalFrags,
		averageFrags;
		//Fetching the amount of battles
		totalBattlesPlayed = response.statistics.all.battles;
		//Fetching the amount of total frags
		totalFrags = response.statistics.all.frags;
		//Calculating average frags
		averageFrags = Math.round((totalFrags/totalBattlesPlayed)*100)/100;
		container.append('<h1>Average kills: ' + averageFrags + '</h1>')
	}	

	/*
	*	Average Frags Past
	*/
	$.fn.averageFragsPast = function(response1, response2){
		var container = $(this),
		totalBattlesPlayed,
		battles24HoursAgo,
		totalFrags,
		totalFragsLast24,
		totalFragsPast24,
		battlesPast24,
		averageFrags;

		//Fetching the amount of battles in total
		totalBattlesPlayed = response1.statistics.all.battles;
		//Total amount of battles 24 hours ago
		try {
			battles24HoursAgo = response2.stat.statistics.all.battles;
		}
		catch(error){
			battles24HoursAgo = totalBattlesPlayed;
		}
		//Fetching the amount of total frags
		totalFrags = response1.statistics.all.frags;
		//Fetching the amount of frags 24 hours ago
		try {
			totalFragsLast24 = response2.stat.statistics.all.frags;
		}
		catch(error){
			totalFragsLast24 = totalFrags;
		}
		
		//Calculate total frags during the past 24 hours
		totalFragsPast24 = totalFrags - totalFragsLast24;
		//Calculate total battles during the past 24 hours
		battlesPast24 = totalBattlesPlayed - battles24HoursAgo;
		//Calculating average frags
		averageFrags = Math.round((totalFragsPast24/battlesPast24)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average kills: ' + averageFrags + '</h1>')	
	}


	/*
	*	WN7 Agreggated function calculation, for total stats
	*/
	$.fn.wn7Total = function(response) {
		//Defining our container
		var container = $(this);

		//Defining for our color code
		var statName = 'wn7';

		/* 
		*	METHOD:
		*	The formula is an addition of different complex terms,
		*	which in turn consist of different factors weighted with
		*	different typical statistical factors to make the value normalized
		*	The main contributing parts of the formula seen without weights and normalization
		*	is: Frags, Damage, Spot, DefencePoints, WinRate and a penalty based on uptill tier 5 and Games played. 
		*	Frags*weight + Damage*weight + Spot*weight + DefencePoints*weight + WinRate*weight - GamesTop/GamesBelow*weight
		*	To do this I will separate the formula in the different terms and then add upp the result.
		*/

		/*
		*	WN7 formula: (Read more at: http://forum.worldoftanks.com/index.php?/topic/184017-wn7-what-is-it-and-how-does-it-work/)
		*	(1240-1040/(MIN(TIER,6))^0.164)*FRAGS
		*	+DAMAGE*530/(184*e^(0.24*TIER)+130)
		*	+SPOT*125*MIN(TIER, 3)/3
		*	+MIN(DEF,2.2)*100
		*	+((185/(0.17+e^((WINRATE-35)*-0.134)))-500)*0.45
		*	-[(5 - MIN(TIER,5))*125] / [1 + e^( ( TIER - (GAMESPLAYED/220)^(3/TIER) )*1.5 )]
		*
		*	With my rewrittings and according to the code below it could be written such as:
		* 	WN7 = fragsObject + damageObject + spottedObject + defencePointsObject + winRateObject - gamesObject
		*/


		//First lets fetch the values we need, averagetier, games, averagespot, averagedefencepoints, winrate
		//Starting with our average tier
		function averageTier(response){
				//Defining some variables we need when we iterate through the array
				var countMatchesIteration = 0;
				var countMatchesLevelIteration = 0;

				//Getting in our vehicles array from the object
				var tanksArray = response.vehicles;
				
				for(var tank in tanksArray){
					//Getting the specific tier for this tank
					var tier = tanksArray[tank].level;
					//Getting the number of battles played in this tank
					var matches = tanksArray[tank].battle_count;
					//Iterating over all tanks and counting the amount of total games played
					countMatchesIteration = countMatchesIteration + matches;
					//Iterating and summing up the product of this tank's matches*tier
					countMatchesLevelIteration = countMatchesLevelIteration + (matches*tier);
				}
				//Do our average tier calculation
				var averageTier = Math.round((countMatchesLevelIteration/countMatchesIteration)*100)/100;
				return averageTier;
		}

		//Fetching the amount of battles we played
		function battlesPlayed(response){
			//Defining some variables
			var totalBattlesPlayed = response.statistics.all.battles;
			return totalBattlesPlayed;
		}	


		//Fetching the average amount of frags
		function averageFrags(response){
			//Fetching the amount of battles
			console.log(response);
			var totalBattlesPlayed = response.statistics.all.battles;
			//Fetching the amount of total frags
			var totalFrags = response.statistics.all.frags;
			//Calculating average frags
			var averageFrags = totalFrags/totalBattlesPlayed;
			return averageFrags;
		}

		//Fetching average spoting per game
		function averageSpotted(response){
			//Get the total amount of spots
			var totalSpotted = response.statistics.all.spotted;
			//Fetching the amount of battles
			var totalBattlesPlayed = response.statistics.all.battles;
			//Get the average spot, by dividing the spots with battles
			var averageSpotted = totalSpotted/totalBattlesPlayed;
			return averageSpotted;
		}

		//Fetching average damage
		function averageDamage(response){
			//Defining some variables
			var totalBattlesPlayed = response.statistics.all.battles;
			//Getting the total damage
			var totalDamage = response.statistics.all.damage_dealt;
			//Calculate the average damage
			var averageDamage = totalDamage/totalBattlesPlayed;
			return averageDamage;
		}

		//Get the average def points
		function averageDefPoints(response) {
			//Get the total number of def points
			var totalDefPoints = response.statistics.all.dropped_capture_points;
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response.statistics.all.battles;

			if(totalAmountOfBattles === 0){
				var averageDefPoints = 0;
			}
			else {
				var averageDefPoints = Math.round((totalDefPoints/totalAmountOfBattles)*100)/100;
			}
			return averageDefPoints;
		}

		//Get the winrate
		function winRate(response){
			//Get total amount of wins
			var totalWins = response.statistics.all.wins;
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response.statistics.all.battles;
			//Calculate the win ratio
			var winRate = (totalWins/totalAmountOfBattles)*100;
			return winRate;
		}

		//Creating our objects from the functions above, these variables, containing values calculated fom the functions above, will go into our WN7 formula
		var averageTier = averageTier(response);
		var averageFrags = averageFrags(response);
		var averageDamage = averageDamage(response);
		var theWinRate = winRate(response);
		var averageDefPoints = averageDefPoints(response);
		var averageSpotted = averageSpotted(response);
		var battlesPlayed = battlesPlayed(response);


		//Lets start defining our functions as objects
		//The frag function object needs average frags and average tier
		var fragsObject = function(averageFrags, averageTier){
			//Cap the tier to 6
			if(averageTier>6){
				averageTier = 6;
			}

			//Set up the formula, also we are adding the capped variable described above
			var fragsResult = (1240-(1040/(Math.pow(averageTier, 0.164))))*averageFrags;
			return fragsResult;	
		}

		//The Damage function object needs average damage and average tier
		var damageObject = function(averageDamage, averageTier){
			//Setting up the formula for the damage section, and then returning the result
			var damageResult = (averageDamage*530)/(184*Math.exp(0.24*averageTier) + 130);
			return damageResult;	
		}

		//The spotting function
		var spottedObject = function(averageSpotted, averageTier){
			//Cap the tier to 3
			if(averageTier>3){
				averageTier = 3;
			}

			var spottedResult = ((averageSpotted*125*averageTier)/3);
			return spottedResult;
		}

		//The defence points function
		var defencePointsObject = function(averageDefPoints){
			//Set the max value of the averageDefPoints to be 2.2
			if(averageDefPoints>2.2){
				averageDefPoints = 2.2;
			}
			var defencePointsResult = Math.round(averageDefPoints*100);
			return defencePointsResult;
		}

		
		//The winRate function
		var winRateObject = function(theWinRate){
			var winRateResult = ((185/(0.17 + Math.exp((theWinRate-35)*-0.134)))-500)*0.45;
			return winRateResult;
		}

		//The Games Played Top function
		var gamesObject = function(battlesPlayed, averageTier){
			//Cap the tier to 5
			if(averageTier>5){
				averageTier = 5;
			}

			//We separate the top and bottom part of the formula
			var topPart = [(5-(averageTier))*125];
			var bottomPart =  [1 + Math.exp((averageTier-Math.pow((battlesPlayed/220),(3/averageTier)))*1.5)];
			//And put it back together in the end
			var gamesObjectResult = topPart/bottomPart;
			return gamesObjectResult;
		}

		/*
		*	The whole formula WN7 put together looks something like this
		*	WN7 = fragsObject + damageObject + spottedObject + defencePointsObject + winRateObject - gamesObject
		*
		*	So lets instatiate the objects and get our values for the things
		*/
		//Instating and getting the calculated values for each part of the formula
		var frags = fragsObject(averageFrags, averageTier);
		var damage = damageObject(averageDamage, averageTier);
		var spotted = spottedObject(averageSpotted, averageTier);
		var defencePoints = defencePointsObject(averageDefPoints);
		var winRate = winRateObject(theWinRate);
		var games = gamesObject(battlesPlayed, averageTier);

		//Adding upp the values, and getting the wn7 value
		var wn7 = frags + damage + spotted + defencePoints + winRate - games; 
		
		//A rounded value of WN7 with 1 decimal
		var wn7Rounded1Decimal = (Math.round(wn7*10))/10;

		//A rounded value of WN7 with 0 decimals
		var wn7Rounded= Math.round(wn7);

		//Define the variables we need to color our wn7 result
		var color = container.printColorToStat(statName, wn7Rounded);

		//Print the result to the DOM
		container.append('<h1>WN7 Rating: <span style="color:' + color +'">'  + wn7Rounded + '</span></h1>');

	}

	/*
	*	WN7 Agreggated function calculation, for recent stats
	*/
	$.fn.wn7Past = function(response1, response2) {
		//Defining our container
		var container = $(this);

		//Defining for our color code
		var statName = 'wn7';

		/* 
		*	METHOD:
		*	The formula is an addition of different complex terms,
		*	which in turn consist of different factors and operators weighted with
		*	different typical statistical factors to make the value normalized
		*	The main contributing parts of the formula seen without weights and normalization
		*	is: Frags, Damage, Spot, DefencePoints, WinRate and a penalty based on uptill tier 5 and Games played. 
		*	Frags*weight + Damage*weight + Spot*weight + DefencePoints*weight + WinRate*weight - GamesTop/GamesBelow*weight
		*	To do this I will separate the formula in the different terms and then add upp the result.
		*/

		/*
		*	WN7 formula: (Read more at: http://forum.worldoftanks.com/index.php?/topic/184017-wn7-what-is-it-and-how-does-it-work/)
		*	(1240-1040/(MIN(TIER,6))^0.164)*FRAGS
		*	+DAMAGE*530/(184*e^(0.24*TIER)+130)
		*	+SPOT*125*MIN(TIER, 3)/3
		*	+MIN(DEF,2.2)*100
		*	+((185/(0.17+e^((WINRATE-35)*-0.134)))-500)*0.45
		*	-[(5 - MIN(TIER,5))*125] / [1 + e^( ( TIER - (GAMESPLAYED/220)^(3/TIER) )*1.5 )]
		*
		*	With my rewrittings and according to the code below it could be written such as:
		* 	WN7 = fragsObject + damageObject + spottedObject + defencePointsObject + winRateObject - gamesObject
		*/


		//First lets fetch the values we need, averagetier, games, averagespot, averagedefencepoints, winrate
		//Starting with our average tier
		function averageTierPast(response1, response2){
				//Define our first vehicles array
				var tanksArray1 = response1.vehicles;
				var tanksArray2 = response2.vehicles
				
				//This is the new array with elements from total stats, that also resides in recent stats
				var tanksArrayJoined = [];
				//This is the array that will hold new vehicle data, only available through total stats..
				var tanksArrayNew = [];

				//Lets start splitting the different length arrays in two, on with the elements that match and one with the newly added tanks
				//Here we will put our data that coincides over both recent and total stats, in a new array
				for(var tank2 in tanksArray2){

					var tankName2 = tanksArray2[tank2].localized_name;
					
					for(var i=0; i<tanksArray1.length; i++){
					
						if(tanksArray1[i].localized_name===tankName2){
							//Save the tank object in the new array, now that we found it
							tanksArrayJoined.push(tanksArray1[i]);
						}	
					}
				}	

				//Now lets find the odd elements, the new vehicles that recently showed up and push them into a new array.
				for(var tank1 in tanksArray1){

					var tankName1 = tanksArray1[tank1].localized_name;
					var tankExist = false;

					for(var i=0; i<tanksArray2.length; i++){
						var tankName2 = tanksArray2[i].localized_name;

						if(tankName1 === tankName2){
							tankExist = true;
						}

					}

					if(tankExist===false){
						//Do the splitting here, else do nothing..
						tanksArrayNew.push(tanksArray1[tank1]);
					}
				}

				//Defining what we get in
				var container = $(this);

				//Defining some variables we will use to iterate through the arrays and build up the integers for calculation
				var countMatchesIterationPast24 = 0;
				var countMatchesLevelIterationPast24 = 0;

				
				for(var tank in tanksArrayJoined){
					//Getting the specific tier for this tank
					var tier = tanksArrayJoined[tank].level;
					//Getting the number of battles played in this tank
					var matchesTotal = tanksArrayJoined[tank].battle_count;
					//Getting the number of battles played in this tank, at least how it looked 24 hours ago
					var matchesLast24 = tanksArray2[tank].battle_count;
					//Subtracting the difference to get the number of fights in this tank during the past 24 hours
					var matchesPast24 = matchesTotal - matchesLast24;
					//Iterating over all tanks and counting the amount of total games played the past 24 hours
					countMatchesIterationPast24 = countMatchesIterationPast24 + matchesPast24;
					//Iterating and summing up the product of this tank's matches*tier
					countMatchesLevelIterationPast24 = countMatchesLevelIterationPast24 + (matchesPast24*tier);
				}

				//Now lets check the new array, which only contains stats about vehicles bought during the past 24 hours
				for(var tank in tanksArrayNew){
					//Getting the specific tier for this tank
					var tier = tanksArrayNew[tank].level;
					//Getting the number of battles played in this tank
					var matchesTotal = tanksArrayNew[tank].battle_count;
					//Iterating over all tanks and counting the amount of total games played the past 24 hours
					countMatchesIterationPast24 = countMatchesIterationPast24 + matchesTotal;
					//Iterating and summing up the product of this tank's matches*tier
					countMatchesLevelIterationPast24 = countMatchesLevelIterationPast24 + (matchesTotal*tier);
				}


				//Do our average tier calculation
				var averageTierPast24 = countMatchesLevelIterationPast24/countMatchesIterationPast24;
				//Return the result
				return averageTierPast24;
		}

		//Fetching the amount of battles we played
		function battlesPlayedPast(response1, response2){
			var totalAmountOfBattles,
				battles24HoursAgo,
				battlesLast24Hours;

			//Total amount of battles, to last update.
			totalAmountOfBattles = response1.summary.battles_count;
			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.summary.battles_count;
			}
			catch(error){
				battles24HoursAgo = totalAmountOfBattles;
			}
			
			//The amount of battles the last 24 hours
			battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
			return battlesLast24Hours;
		}	


		//Fetching the average amount of frags
		function averageFragsPast(response1, response2){
			var totalBattlesPlayed,
				battles24HoursAgo,
				totalFrags,
				totalFragsLast24,
				totalFragsPast24,
				battlesPast24,
				averageFrags;

			//Fetching the amount of battles in total
			totalBattlesPlayed = response1.summary.battles_count;
			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.summary.battles_count;
			}
			catch(error){
				battles24HoursAgo = totalBattlesPlayed;
			}
			
			//Fetching the amount of total frags
			totalFrags = response1.battles.frags;
			//Fetching the amount of frags 24 hours ago
			try{
				totalFragsLast24 = response2.battles.frags;	
			}
			catch(error){
				totalFragsLast24 = totalFrags;
			}
			
			//Calculate total frags during the past 24 hours
			totalFragsPast24 = totalFrags - totalFragsLast24;
			//Calculate total battles during the past 24 hours
			battlesPast24 = totalBattlesPlayed - battles24HoursAgo;


			//Calculating average frags
			averageFrags = totalFragsPast24/battlesPast24;
			return averageFrags;
		}

		//Fetching average spoting per game
		function averageSpottedPast(response1, response2){
			var totalSpotted,
				totalBattlesPlayed,
				totalSpottedLast24,
				battlesLast24Hours,
				battlesPast24,
				spottedPast24,
				averageSpotted;

			//Get the total amount of spots
			totalSpotted = response1.battles.spotted;
			//Fetching the amount of battles
			totalBattlesPlayed = response1.summary.battles_count;

			//Lets get the total spotted as it were 24 hours ago
			try {
				totalSpottedLast24 = response2.battles.spotted;
			}
			catch(error){
				totalSpottedLast24 = totalSpotted;
			}
			
			//Total amount of battles 24 hours ago
			try {
				battlesLast24Hours = response2.summary.battles_count;
			}
			catch(error){
				battlesLast24Hours = totalBattlesPlayed;
			}
			
			//The amount of battles the last 24 hours
			battlesPast24 = totalBattlesPlayed - battlesLast24Hours;
			//The amount of spots the last 24 hours
			spottedPast24 = totalSpotted - totalSpottedLast24;

			//Get the average spot, by dividing the spots with battles
			averageSpotted = spottedPast24/battlesPast24;
			return averageSpotted;
		}

		//Fetching average damage
		function averageDamagePast(response1, response2){
			var damage24HoursAgo,
				totalDamage,
				damageLast24Hours,
				battles24HoursAgo,
				totalAmountOfBattles,
				battlesLast24Hours,
				averageDamageLast24Hours;

			//Total damage, according to last update
			totalDamage = response1.battles.damage_dealt;
			//Total amount of battles, to last update.
			totalAmountOfBattles = response1.summary.battles_count;	

			//Total damage 24 hours ago.
			try{
				damage24HoursAgo = response2.battles.damage_dealt;
			}
			catch(error){
				damage24HoursAgo = totalDamage;
			}	
			//The accumulated damage the last 24 hours
			damageLast24Hours = totalDamage - damage24HoursAgo;

			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.summary.battles_count;
			}
			catch(error){
				battles24HoursAgo = totalAmountOfBattles;
			}
			
			
			//The amount of battles the last 24 hours
			battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
			//Calculate the average damage done last 24 hours.
			averageDamageLast24Hours = Math.round(damageLast24Hours/battlesLast24Hours);
			return averageDamageLast24Hours;
		}

		//Get the average def points
		function averageDefPointsPast(response1, response2) {
			var totalDefPoints,
				totalDefPoints24Last,
				defPointsPast24,
				totalAmountOfBattles,
				totalAmountOfBattlesLast24,
				battlesPast24,
				averageDefPoints;

			//Get the total number of def points
			totalDefPoints = response1.ratings.dropped_ctf_points.value;
			//Get the total number of def points 24 hours ago
			try{
				totalDefPoints24Last = response2.ratings.dropped_ctf_points.value;
			}
			catch(error){
				totalDefPoints24Last = totalDefPoints;
			}
			
			//Calculate the difference
			defPointsPast24 = totalDefPoints - totalDefPoints24Last;

			//Total amount of battles, to last update
			totalAmountOfBattles = response1.summary.battles_count;

			//Total amount of battles, 24 hours ago
			try{
				totalAmountOfBattlesLast24 = response2.summary.battles_count;
			}
			catch(error){
				totalAmountOfBattlesLast24 = totalAmountOfBattles;
			}
			
			//Calculate the difference
			battlesPast24 = totalAmountOfBattles - totalAmountOfBattlesLast24;

			if(battlesPast24 === 0){
				averageDefPoints = 0;
			}
			else {
				averageDefPoints = defPointsPast24/battlesPast24;
			}
			return averageDefPoints;
		}

		//Get the winrate
		function winRatePast(response1, response2){
			var totalAmountOfBattles,
				battles24HoursAgo,
				battlesLast24Hours,
				totalWins,
				totalWinsLast24,
				winsPast24,
				winRatioPast24;

			//First we will get the amount of battles for the past 24 hours
			//Total amount of battles, to last update.
			totalAmountOfBattles = response1.summary.battles_count;
			//Total amount of battles 24 hours ago
			try {
				battles24HoursAgo = response2.summary.battles_count;
			}
			catch(error){
				battles24HoursAgo = totalAmountOfBattles;
			}
			
			//The amount of battles the last 24 hours
			battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

			//Get amount of wins for the past 24 hours
			//Get total wins, current
			totalWins = response1.summary.wins;
			//Get total wins, 24 hours ago
			try {
				totalWinsLast24 = response2.summary.wins;
			}
			catch(error){
				totalWinsLast24 = totalWins;
			}
			
			//Subtract to get amount of wins for the past 24 hours
			winsPast24 = totalWins - totalWinsLast24;
			//Divide to get the win percentage from the past 24 hours
			winRatioPast24 = (winsPast24/battlesLast24Hours)*100;
			return winRatioPast24;
		}

		//Creating our objects from the functions above, these variables, containing values calculated fom the functions above, will go into our WN7 formula
		var averageTier = averageTierPast(response1, response2),
			averageFrags = averageFragsPast(response1, response2),
			averageDamage = averageDamagePast(response1, response2),
			theWinRate = winRatePast(response1, response2),
			averageDefPoints = averageDefPointsPast(response1, response2),
			averageSpotted = averageSpottedPast(response1, response2),
			battlesPlayed = battlesPlayedPast(response1, response2);


		//Lets start defining our functions as objects
		//The frag function object needs average frags and average tier
		var fragsObject = function(averageFrags, averageTier){
			//Cap the tier to 6
			if(averageTier>6){
				averageTier = 6;
			}

			//Set up the formula, also we are adding the capped variable described above
			var fragsResult = (1240-(1040/(Math.pow(averageTier, 0.164))))*averageFrags;
			return fragsResult;	
		}

		//The Damage function object needs average damage and average tier
		var damageObject = function(averageDamage, averageTier){
			//Setting up the formula for the damage section, and then returning the result
			var damageResult = (averageDamage*530)/(184*Math.exp(0.24*averageTier) + 130);
			return damageResult;	
		}

		//The spotting function
		var spottedObject = function(averageSpotted, averageTier){
			//Cap the tier to 3
			if(averageTier>3){
				averageTier = 3;
			}

			var spottedResult = ((averageSpotted*125*averageTier)/3);
			return spottedResult;
		}

		//The defence points function
		var defencePointsObject = function(averageDefPoints){
			//Set the max value of the averageDefPoints to be 2.2
			if(averageDefPoints>2.2){
				averageDefPoints = 2.2;
			}
			var defencePointsResult = Math.round(averageDefPoints*100);
			return defencePointsResult;
		}

		
		//The winRate function
		var winRateObject = function(theWinRate){
			var winRateResult = ((185/(0.17 + Math.exp((theWinRate-35)*-0.134)))-500)*0.45;
			return winRateResult;
		}

		//The Games Played Top function
		var gamesObject = function(battlesPlayed, averageTier){
			//Cap the tier to 5
			if(averageTier>5){
				averageTier = 5;
			}

			//We separate the top and bottom part of the formula
			var topPart = [(5-(averageTier))*125];
			var bottomPart =  [1 + Math.exp((averageTier-Math.pow((battlesPlayed/220),(3/averageTier)))*1.5)];
			//And put it back together in the end
			var gamesObjectResult = topPart/bottomPart;
			return gamesObjectResult;
		}

		/*
		*	The whole formula WN7 put together looks something like this
		*	WN7 = fragsObject + damageObject + spottedObject + defencePointsObject + winRateObject - gamesObject
		*
		*	So lets instatiate the objects and get our values for the things
		*/
		//Instating and getting the calculated values for each part of the formula
		var frags = fragsObject(averageFrags, averageTier);
		var damage = damageObject(averageDamage, averageTier);
		var spotted = spottedObject(averageSpotted, averageTier);
		var defencePoints = defencePointsObject(averageDefPoints);
		var winRate = winRateObject(theWinRate);
		var games = gamesObject(battlesPlayed, averageTier);

		//Adding upp the values, and getting the wn7 value
		var wn7 = frags + damage + spotted + defencePoints + winRate - games; 
		
		//A rounded value of WN7 with 1 decimal
		var wn7Rounded1Decimal = (Math.round(wn7*10))/10;

		//A rounded value of WN7 with 0 decimals
		var wn7Rounded= Math.round(wn7);

		//Define the variables we need to color our wn7 result
		var color = container.printColorToStat(statName, wn7Rounded);

		//Print the result to the DOM
		container.append('<h1>WN7 Rating: <span style="color:' + color +'">'  + wn7Rounded + '</span></h1>');

	

		/*
		//TEST CONSOLE PRINTS
		//HMm lets see the errors..
		console.log('wn7 RECENT STARTING FROM HERE:::::');
		console.log('General STATS, unmodified:');

		console.log('tier: '+ averageTier);
		console.log('frags: '+ averageFrags);
		console.log('dmg :' + averageDamage);
		console.log('winrate ' + theWinRate);
		console.log('defpoints ' + averageDefPoints);
		console.log('spotted ' + averageSpotted);
		console.log('battles ' + battlesPlayed);

		console.log('');

		console.log('Modified STATS weighted parameters in WN7');
		console.log('frags part: ' + frags);
		console.log('damage part: ' + damage);
		console.log('spotted part: ' + spotted);
		console.log('defencePoints part: ' + defencePoints);
		console.log('winRate part: ' + winRate);
		console.log('games part: ' + games);

		console.log('');
		console.log('WN7 in total is: ' + wn7);
		console.log('WN7Round in total is: ' + wn7Rounded);
		*/

	}

});