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
		var headline = '<div class="recent_total_stats_headline_div"><h1>1 Week</h1></div>';
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
		
		
		var container = $(this),
		clan=null;

		try{
			clan = response.clan_id;
			
		}
		catch(error){
			console.log(error);
		}
		
		if(clan!==null){
			
			//http://clans.worldoftanks.eu/media/clans/emblems/cl_562/500020562/emblem_64x64.png
			
			var clanId = clan.toString(),
				clanIdLength = clanId.length,
				firstPartOfStringInteger = parseInt(clanIdLength, 10) - 3,
				secondPartOfString = clanId.substring(firstPartOfStringInteger);

			var clanUrl = 'http://clans.worldoftanks' + serverAbbreviation +  '/media/clans/emblems/cl_' + secondPartOfString + '/' + clanId + '/emblem_32x32.png';

			container.append('<h1>Clan: <img class ="clan_image" src="' + clanUrl + '" /></h1>');	
			
		}
		else{
			container.append('<h1>Clan: Has no clan</h1>');
		}
		
			
	}

	$.fn.allPlayerTanks = function(tanks, tankDataArray){
		var tanksArray = tankDataArray.data;
		var playerTanks = [];
		for(var i=0, tanksArrayLength = tanks.length; i<tanksArrayLength; i++){
			
			for(key in tanksArray) {
				
				if(key == tanks[i].tank_id){
					

					var modifiedTankNameArray = (tanksArray[key].name).split(':'),
						modifiedTankName = (modifiedTankNameArray[1]).toLowerCase();

					var imgUrl = 'http://worldoftanks.eu/static/3.21.0.4/encyclopedia/tankopedia/vehicle/' + tanksArray[key].nation + '-' + modifiedTankName + '.png'; 
					
					var newTank = {
									'tank_id': tanksArray[key].tank_id,
									'level': tanksArray[key].level,
									'name': tanksArray[key].name,
									'nation': tanksArray[key].nation,
									'short_name': tanksArray[key].name_i18n,
									'battles': tanks[i].statistics.battles,
									'wins': tanks[i].statistics.wins,
									'mark_of_mastery': tanks[i].mark_of_mastery,
									'image_url': imgUrl
					};

					playerTanks.push(newTank);
				}
			}
		}
		return playerTanks;
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
	$.fn.averageTier = function(response1, response4, playerTanks){
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

		
		var theTankArray =  playerTanks;//window.newTankDataArray,
			battlesMultipliedWithTier = 0;

		for(var i=0, x=theTankArray.length; i<x; i++){
			battlesMultipliedWithTier += (theTankArray[i].battles * theTankArray[i].level);
		}

		
		//Do our average tier calculation
		averageTier = Math.round((battlesMultipliedWithTier/totalAmountOfBattles)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTier + '</h1>');
		
		
	}

	/*
	*	Shows the average tier over the last period, decided by the input
	*/
	$.fn.averageTierPast = function(vehicleTotalObject, response2, tankDataArray){

		//Use our global variable tanksDataArray to verify against
		//Response2 is our most recent data where we make comparison against
		//Build a new array on the fly with most recent tankdata


		//Define our first vehicles array
		var container = $(this),
			tanksArray1 = vehicleTotalObject,
			tanksArray2,
			theTankDataArray = tankDataArray.data,
			tanksArrayJoinedLength,
			totalAmountOfBattles=0,
			totalAmountOfLevelsWeighted=0;


			try{
				if(response2.stat!==null){
					tanksArray2 = response2.stat.vehicles
				}
				else {
					throw new Error("stat.vehicles doesn't exist currently, cause of backend trouble from the API 2.0, blame it on the russian backend devs ;)");
					tanksArray2 = [];
				}
					
			}
			catch(error){
				console.log(error + "Object that got returned just below in console");
				console.log(response2);
				tanksArray2 = [];
			}
			
		
		//This is the new array with elements from total stats, that also resides in recent stats
		var tanksArrayJoined = [];
		//This is the array that will hold new vehicle data, only available through total stats..
		var tanksArrayNew = [];

		//Lets start splitting the different length arrays in two, on with the elements that match and one with the newly added tanks
		//Here we will put our data that coincides over both recent and total stats, in a new array
		for(var j=0, y=tanksArray2.length; j<y; j++){

			var tankId = tanksArray2[j].tank_id,
				tankLevel =0,
				tankName,
				tanksArrayJoinedLength;

			for(tank in theTankDataArray){
				if(theTankDataArray[tank].tank_id === tankId){
					tankLevel = theTankDataArray[tank].level;
					tankName = theTankDataArray[tank].name;
				}
			}

			//Get level of tank as a value from the tankDataArray

			
			//Push the tank to a new array which we will work with
			//Here we will modify the game value etc if it exist
			
			tanksArrayJoined.push({
				'tankId': tanksArray2[j].tank_id,
				'battles': tanksArray2[j].battles,
				'wins':tanksArray2[j].wins,
				'markOfMastery': tanksArray2[j].mark_of_mastery,
				'level':tankLevel,
				'name': tankName
			});
	

		}
		
		tanksArrayJoinedLength = tanksArrayJoined.length;

		//Now lets modify the values in our newly created array by, subtracting the values we have from the old values
		for(var i=0, x=tanksArray1.length; i<x; i++){
			var oldTankId = tanksArray1[i].tank_id,
				oldBattles=tanksArray1[i].statistics.battles,
				newBattles;
				for(var j=0; j<tanksArrayJoinedLength; j++){
					if(tanksArrayJoined[j].tankId === oldTankId){
						newBattles = oldBattles - tanksArrayJoined[j].battles;
						tanksArrayJoined[j].battles = newBattles;
					}
					
				}
		}

		
		
		//Now lets do the actual calculation of the average Tier
		for(var i=0; i<tanksArrayJoinedLength; i++){
			
			totalAmountOfLevelsWeighted += Number(tanksArrayJoined[i].battles) * Number(tanksArrayJoined[i].level);
			totalAmountOfBattles += Number(tanksArrayJoined[i].battles);
		}	
			

		//Resulting value is here, for average tier
		var averageTierPast24 = Math.round((totalAmountOfLevelsWeighted/totalAmountOfBattles)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTierPast24 + '</h1>');
	
		
	}

	
	/*
	*	This will show us the name and the image of the most played vehicle in total
	*/
	$.fn.favoriteVehicleTotal = function(response, playerTanks) {
		//Define what we get in
		var container = $(this),
		//Define our vehicles array
		tanksArray = playerTanks,
		mostBattles =0,
		tankId,
		imgUrl,
		vehicleName,
		vehicleImgObject;

		
		for(var i=0, x=tanksArray.length; i<x; i++){
			if(tanksArray[i].battles>mostBattles){

				
				mostBattles = tanksArray[i].battles;
				tankId = tanksArray[i].tank_id;
				imgUrl = tanksArray[i].image_url;
				vehicleName = tanksArray[i].short_name;
				//console.log(imgUrl);
			}
		}

		//Define our battles variable, this will increase as we iterate through
		vehicleImgObject = '<img class="vehicle_image" src="' + imgUrl + '">';
		//Print it to the DOM
		container.append('<h1>Most played: ' + vehicleName + vehicleImgObject);
	}

	/*
	*	Shows us the name and image of the most played vehicle from the past 24 hours
	*/
	$.fn.favoriteVehiclePast = function(response2, playerTanks) {

		var container = $(this),
			tanksArrayNew = [],
			recentTankArray = [],
			mostPlayedBattles = 0,
			mostPlayedTankId = 0,
			imgUrl='',
			vehicleImgObject = '<img class="vehicle_image" src="">',
			vehicleName='No tank played recently',
			recentBattlesTotal,
			totalBattles,
			recentBattles;
			
			try{
				recentTankArray = response2.stat.vehicles;
			}
			catch(error){
				console.log(error);
			}

		for(var i=0, x=recentTankArray.length; i<x; i++){

			for(var j=0, y=playerTanks.length; j<y; j++){

				if(recentTankArray[i].tank_id===playerTanks[j].tank_id){
						recentBattlesTotal = recentTankArray[i].battles;
						totalBattles = playerTanks[j].battles;
						recentBattles = totalBattles - recentBattlesTotal;
						

					if(recentBattles>mostPlayedBattles){
						mostPlayedBattles = recentBattles;
						mostPlayedTankId = playerTanks[j].tank_id;
					}
					
				}
			

			}

		}

		//Nu leta upp bilden på tanken och lägg till urlen i imgUrl
		for(var j=0, y=playerTanks.length; j<y; j++){
			
			if(mostPlayedTankId === playerTanks[j].tank_id){
				vehicleName = playerTanks[j].short_name;
				imgUrl = playerTanks[j].image_url;
			}
		}

		//Define our battles variable, this will increase as we iterate through
		vehicleImgObject = '<img class="vehicle_image" src="' + imgUrl + '">';
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
	$.fn.wn7Total = function(response, playerTanks) {
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
		function averageTier(response, playerTanks){
				//Defining some variables we need when we iterate through the array
				var countMatchesIteration = 0;
				var countMatchesLevelIteration = 0;
				
				//Getting in our vehicles array from the object
				var tanksArray = playerTanks;
				
				for(var tank in tanksArray){
					//Getting the specific tier for this tank
					var tier = tanksArray[tank].level;
					//Getting the number of battles played in this tank
					var matches = tanksArray[tank].battles;
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
		var averageTier = averageTier(response, playerTanks);
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
	$.fn.wn7Recent = function(response1, response2, playerTankData, tankDataArray, vehicleTotalObject) {
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
		function averageTierPast(response2, tankDataArray, vehicleTotalObject){
				

				//Use our global variable tanksDataArray to verify against
		//Response2 is our most recent data where we make comparison against
		//Build a new array on the fly with most recent tankdata


			//Define our first vehicles array
			var container = $(this),
				tanksArray1 = vehicleTotalObject,
				tanksArray2,
				theTankDataArray = tankDataArray.data,
				tanksArrayJoinedLength,
				totalAmountOfBattles=0,
				totalAmountOfLevelsWeighted=0;


				try{
					if(response2.stat!==null){
						tanksArray2 = response2.stat.vehicles
					}
					else {
						throw new Error("stat.vehicles doesn't exist currently, cause of backend trouble from the API 2.0, blame it on the russian backend devs ;)");
						tanksArray2 = [];
					}
						
				}
				catch(error){
					console.log(error + "Object that got returned just below in console");
					console.log(response2);
					tanksArray2 = [];
				}
				
			
			//This is the new array with elements from total stats, that also resides in recent stats
			var tanksArrayJoined = [];
			//This is the array that will hold new vehicle data, only available through total stats..
			var tanksArrayNew = [];

			//Lets start splitting the different length arrays in two, on with the elements that match and one with the newly added tanks
			//Here we will put our data that coincides over both recent and total stats, in a new array
			for(var j=0, y=tanksArray2.length; j<y; j++){

				var tankId = tanksArray2[j].tank_id,
					tankLevel =0,
					tankName,
					tanksArrayJoinedLength;

				for(tank in theTankDataArray){
					if(theTankDataArray[tank].tank_id === tankId){
						tankLevel = theTankDataArray[tank].level;
						tankName = theTankDataArray[tank].name;
					}
				}

				//Get level of tank as a value from the tankDataArray

				
				//Push the tank to a new array which we will work with
				//Here we will modify the game value etc if it exist
				
				tanksArrayJoined.push({
					'tankId': tanksArray2[j].tank_id,
					'battles': tanksArray2[j].battles,
					'wins':tanksArray2[j].wins,
					'markOfMastery': tanksArray2[j].mark_of_mastery,
					'level':tankLevel,
					'name': tankName
				});
		

			}
			
			tanksArrayJoinedLength = tanksArrayJoined.length;

			//Now lets modify the values in our newly created array by, subtracting the values we have from the old values
			for(var i=0, x=tanksArray1.length; i<x; i++){
				var oldTankId = tanksArray1[i].tank_id,
					oldBattles=tanksArray1[i].statistics.battles,
					newBattles;
					for(var j=0; j<tanksArrayJoinedLength; j++){
						if(tanksArrayJoined[j].tankId === oldTankId){
							newBattles = oldBattles - tanksArrayJoined[j].battles;
							tanksArrayJoined[j].battles = newBattles;
						}
						
					}
			}

			
			
			//Now lets do the actual calculation of the average Tier
			for(var i=0; i<tanksArrayJoinedLength; i++){
				
				totalAmountOfLevelsWeighted += Number(tanksArrayJoined[i].battles) * Number(tanksArrayJoined[i].level);
				totalAmountOfBattles += Number(tanksArrayJoined[i].battles);
			}	
				

			//Resulting value is here, for average tier
			var averageTierPast24 = Math.round((totalAmountOfLevelsWeighted/totalAmountOfBattles)*100)/100;
			//Return the object
			return averageTierPast24;
		
		}

		//Fetching the amount of battles we played
		function battlesPlayedPast(response1, response2){
			var totalAmountOfBattles,
				battles24HoursAgo,
				battlesLast24Hours;

			//Total amount of battles, to last update.
			totalAmountOfBattles = response1.statistics.all.battles;
			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.stat.statistics.all.battles;
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
			totalBattlesPlayed = response1.statistics.all.battles;
			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.stat.statistics.all.battles;
			}
			catch(error){
				battles24HoursAgo = totalBattlesPlayed;
			}
			
			//Fetching the amount of total frags
			totalFrags = response1.statistics.all.frags;
			//Fetching the amount of frags 24 hours ago
			try{
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
			try {
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
			totalDamage = response1.statistics.all.damage_dealt;
			//Total amount of battles, to last update.
			totalAmountOfBattles = response1.statistics.all.battles;	

			//Total damage 24 hours ago.
			try{
				damage24HoursAgo = response2.stat.statistics.all.damage_dealt;
			}
			catch(error){
				damage24HoursAgo = totalDamage;
			}	
			//The accumulated damage the last 24 hours
			damageLast24Hours = totalDamage - damage24HoursAgo;

			//Total amount of battles 24 hours ago
			try{
				battles24HoursAgo = response2.stat.statistics.all.battles;
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
			try{
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
			totalAmountOfBattles = response1.statistics.all.battles;
			//Total amount of battles 24 hours ago
			try {
				battles24HoursAgo = response2.stat.statistics.all.battles;
			}
			catch(error){
				battles24HoursAgo = totalAmountOfBattles;
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
			winRatioPast24 = (winsPast24/battlesLast24Hours)*100;
			return winRatioPast24;
		}

		//Creating our objects from the functions above, these variables, containing values calculated fom the functions above, will go into our WN7 formula
		var averageTier = averageTierPast(response2, tankDataArray, vehicleTotalObject),
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
		var frags = fragsObject(averageFrags, averageTier),
			damage = damageObject(averageDamage, averageTier),
			spotted = spottedObject(averageSpotted, averageTier),
			defencePoints = defencePointsObject(averageDefPoints),
			winRate = winRateObject(theWinRate),
			games = gamesObject(battlesPlayed, averageTier);

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
	
	$.fn.wn8Total = function(wn8DataArray, playerTankData, tankDataArray, totalVehicleData, totalPlayerData){
		//The idea is to first build up the general value for rFRAGS, rSPOT etc...
		//To do this we need to iterate through the amount of battles the user had in each tank, and add that value from wn8TankDataArray
		//This can be cool :)!
		var container = $(this),
			statName = 'wn8',
			wn8Total;


		var rWIN_object = function(wn8DataArray, totalVehicleData, totalPlayerData){
			var battles,
			tankId,
			expTotalWins = 0,
			totalWins = totalPlayerData.statistics.all.wins,
			rWins = 0,
			rWinsCap = 0,
			averageWinsPerGame = 0;	

			for(var i=0, x=totalVehicleData.length; i<x; i++){
				tankId = totalVehicleData[i].tank_id.toString();
				battles = totalVehicleData[i].statistics.battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){
					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageWinsPerGame = parseFloat(wn8DataArray.data[j].expWinRate);
						expTotalWins += averageWinsPerGame * battles;
					}
				}
				
			}

			rWins = (totalWins / (expTotalWins/100));
			rWinsCap = (rWins - 0.71) / (1 - 0.71);
			//Set min value
			if(rWinsCap<0){
				rWinsCap = 0;
			}
			//return our win capped object;
			return parseFloat(rWinsCap);
		};

		var rDAMAGE_object = function(wn8DataArray, totalVehicleData, totalPlayerData){
			var battles,
				tankId,
				expTotalDamage = 0,
				totalDamage = totalPlayerData.statistics.all.damage_dealt,
				rDamage = 0,
				rDamageCap = 0,
				averageDamagePerGame = 0;

			for(var i=0, x=totalVehicleData.length; i<x; i++){
				tankId = totalVehicleData[i].tank_id.toString();
				battles = totalVehicleData[i].statistics.battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){
					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the damage now
						averageDamagePerGame = parseFloat(wn8DataArray.data[j].expDamage);
						expTotalDamage += averageDamagePerGame * battles;
					}
				}
				
			}
			//Now lets divide the reminder with the total damage value the player has acquired.
			rDamage = (totalDamage / expTotalDamage)
			//Now lets add the cap and use the formula in WN8
			//rDAMAGEc = (rDAMAGE – 0.22) / (1 - 0.22)
			rDamageCap = (rDamage - 0.22) / (1 - 0.22);
			//Add the max/min value condition
			if(rDamageCap<0){
				rDamageCap = 0;
			}
			//Return the capped damage object
			return parseFloat(rDamageCap);
			
		};

		var rFRAGS_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap){
			var battles,
			tankId,
			expTotalFrags = 0,
			totalFrags = totalPlayerData.statistics.all.frags,
			rFrags = 0,
			rFragsCap = 0,
			averageFragsPerGame = 0;

			for(var i=0, x=totalVehicleData.length; i<x; i++){
				tankId = totalVehicleData[i].tank_id.toString();
				battles = totalVehicleData[i].statistics.battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){
					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageFragsPerGame = parseFloat(wn8DataArray.data[j].expFrag);
						expTotalFrags += averageFragsPerGame * battles;
					}
				}
			}
			//Lets get the ratio
			rFrags = (totalFrags / expTotalFrags);

			//Lets add the cap in the formula
			rFragsCap = (rFrags - 0.12) / (1 - 0.12);
			//Set min value
			if(rFragsCap<0){
				rFragsCap = 0;
			}
			//Set max value
			if(rFragsCap > (rDamageCap + 0.2)){
				rFragsCap = rDamageCap + 0.2;
			}
			//Return our frags object	
			return parseFloat(rFragsCap);
		};

		var rSPOT_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap){
			var battles,
			tankId,
			expTotalSpot = 0,
			totalSpot = totalPlayerData.statistics.all.spotted,
			rSpot = 0,
			rSpotCap = 0,
			averageSpotPerGame = 0;

			for(var i=0, x=totalVehicleData.length; i<x; i++){
				tankId = totalVehicleData[i].tank_id.toString();
				battles = totalVehicleData[i].statistics.battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){
					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageSpotPerGame = parseFloat(wn8DataArray.data[j].expSpot);
						expTotalSpot += averageSpotPerGame * battles;
					}
				}
			}

			rSpot = (totalSpot / expTotalSpot);
			rSpotCap = (rSpot - 0.38) / (1 - 0.38);

			//Set min value
			if(rSpotCap < 0){
				rSpotCap = 0;
			}
			//Set max value
			if(rSpotCap > (rDamageCap + 0.1)){
				rSpotCap = rDamageCap + 0.1;
			}
			//Return our object
			return parseFloat(rSpotCap);	
		};


		var rDEF_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap){
			var battles,
			tankId,
			expTotalDef = 0,
			totalDef = totalPlayerData.statistics.all.dropped_capture_points,
			rDef = 0,
			rDefCap = 0,
			averageDefPerGame = 0;

			for(var i=0, x=totalVehicleData.length; i<x; i++){
				tankId = totalVehicleData[i].tank_id.toString();
				battles = totalVehicleData[i].statistics.battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){
					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageDefPerGame = parseFloat(wn8DataArray.data[j].expDef);
						expTotalDef += averageDefPerGame * battles;
					}
				}
			}

			
			
			rDef = (totalDef / expTotalDef);
			rDefCap = (rDef - 0.1) / (1 - 0.1);

			//Set min value
			if(rDefCap < 0){
				rDefCap = 0;
			}
			//Set max value
			if(rDefCap > (rDamageCap + 0.1)){
				rDefCap = rDamageCap + 0.1;
			}
			//Return our object
			return parseFloat(rDefCap);
		};

		//Extra function to calculate normalized winrate object
		var winNormalized_object = function(rWINc){
			if(rWINc>1.8){
				rWINc = 1.8;
			}
			return rWINc;
		};

		//Instantiate our different objects
		var rDAMAGEc = rDAMAGE_object(wn8DataArray, totalVehicleData, totalPlayerData),
			rWINc = rWIN_object(wn8DataArray, totalVehicleData, totalPlayerData),
			rFRAGSc = rFRAGS_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc),
			rSPOTc = rSPOT_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc),
			rDEFc = rDEF_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc),
			rWINcNormalized = winNormalized_object(rWINc);
		
		

		//WN8 = 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*MIN(1.8,rWINc)
		wn8Total = parseInt((parseFloat(980*rDAMAGEc) + parseFloat(210*rDAMAGEc*rFRAGSc) + parseFloat(155*rFRAGSc*rSPOTc) + parseFloat(75*rDEFc*rFRAGSc) + parseFloat(145*rWINcNormalized)), 10);
		
		//Define the variables we need to color our wn7 result
		var newcolor = container.printColorToStat(statName, wn8Total);

		//Print the result to the DOM
		container.append('<h1>WN8 Rating: <span style="color:' + newcolor +'">'  + wn8Total + '</span></h1>');

	}
	
	$.fn.wn8Recent = function(wn8DataArray, playerTankData, tankDataArray, totalVehicleData, totalPlayerData, recentPlayerData){
		//The idea is to first build up the general value for rFRAGS, rSPOT etc...
		//To do this we need to iterate through the amount of battles the user had in each tank, and add that value from wn8TankDataArray
		//This can be cool :)!
		var container = $(this),
			statName = 'wn8',
			wn8Recent,
			recentBattlesArray = [];

		var rWIN_object = function(wn8DataArray, totalVehicleData, totalPlayerData, recentPlayerData){
			var battles,
			recentBattles,
			totalBattles,
			totalWins = totalPlayerData.statistics.all.wins - recentPlayerData.stat.statistics.all.wins,
			totalVehicleWins,
			recentWins,
			temporaryTankId,
			tankId,
			expTotalWins = 0,
			rWins = 0,
			rWinsCap = 0,
			averageWinsPerGame = 0;	

			
			//The idea is to build a new array with the most recently played tanks, with battles and stuff
			//We make this array accesible by closure to the rest of the functions within wn8Recent
			for(var j=0, y=totalVehicleData.length; j<y; j++){
				temporaryTankId = totalVehicleData[j].tank_id;
				totalBattles = totalVehicleData[j].statistics.battles;
				totalVehicleWins = totalVehicleData[j].statistics.wins;

				for(var i=0, x=recentPlayerData.stat.vehicles.length; i<x; i++){
					
					if(recentPlayerData.stat.vehicles[i].tank_id === temporaryTankId){
						recentBattles = recentPlayerData.stat.vehicles[i].battles;
						recentWins = recentPlayerData.stat.vehicles[i].wins;
						battles = totalBattles - recentBattles;
						wins = totalVehicleWins - recentWins;
						if(battles>0){
							//Now lets push to the new array
							recentBattlesArray.push({
								'tank_id':temporaryTankId,
								'battles':battles,
								'wins': wins
							});
						}
					}
					
				}		
			}



			
			for(var i=0, x=recentBattlesArray.length; i<x; i++){
				tankId = recentBattlesArray[i].tank_id.toString();
				battles = recentBattlesArray[i].battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
					
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){

					if(wn8DataArray.data[j].IDNum === tankId){
						console.log(wn8DataArray.data[j]);
						//Add the frags
						averageWinsPerGame = parseFloat(wn8DataArray.data[j].expWinRate);
						expTotalWins += averageWinsPerGame * battles;

						console.log(expTotalWins);
					}
				}
			}
			

			rWins = (totalWins / (expTotalWins/100));
			console.log(rWins);
			rWinsCap = (rWins - 0.71) / (1 - 0.71);
			//Set min value
			if(rWinsCap<0){
				rWinsCap = 0;
			}

			//return our win capped object;
			return parseFloat(rWinsCap);
			
			
		};

		var rDAMAGE_object = function(wn8DataArray, totalVehicleData, totalPlayerData, recentPlayerData){
			var battles,
				tankId,
				expTotalDamage = 0,
				totalDamage = totalPlayerData.statistics.all.damage_dealt - recentPlayerData.stat.statistics.all.damage_dealt,
				rDamage = 0,
				rDamageCap = 0,
				averageDamagePerGame = 0;


			for(var i=0, x=recentBattlesArray.length; i<x; i++){
				tankId = recentBattlesArray[i].tank_id.toString();
				battles = recentBattlesArray[i].battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
					
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){

					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageDamagePerGame = parseFloat(wn8DataArray.data[j].expDamage);
						expTotalDamage += averageDamagePerGame * battles;
					}
				}
			}


			//Now lets divide the reminder with the total damage value the player has acquired.
			rDamage = (totalDamage / expTotalDamage)
			//Now lets add the cap and use the formula in WN8
			//rDAMAGEc = (rDAMAGE – 0.22) / (1 - 0.22)
			rDamageCap = (rDamage - 0.22) / (1 - 0.22);
			//Add the max/min value condition
			if(rDamageCap<0){
				rDamageCap = 0;
			}


			//Return the capped damage object
			return parseFloat(rDamageCap);
			
		};

		var rFRAGS_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap, recentPlayerData){
			var battles,
			tankId,
			expTotalFrags = 0,
			totalFrags = totalPlayerData.statistics.all.frags - recentPlayerData.stat.statistics.all.frags,
			rFrags = 0,
			rFragsCap = 0,
			averageFragsPerGame = 0;

			for(var i=0, x=recentBattlesArray.length; i<x; i++){
				tankId = recentBattlesArray[i].tank_id.toString();
				battles = recentBattlesArray[i].battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
					
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){

					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageFragsPerGame = parseFloat(wn8DataArray.data[j].expFrag);
						expTotalFrags += averageFragsPerGame * battles;
					}
				}
			}


			//Lets get the ratio
			rFrags = (totalFrags / expTotalFrags);

			//Lets add the cap in the formula
			rFragsCap = (rFrags - 0.12) / (1 - 0.12);
			//Set min value
			if(rFragsCap<0){
				rFragsCap = 0;
			}
			//Set max value
			if(rFragsCap > (rDamageCap + 0.2)){
				rFragsCap = rDamageCap + 0.2;
			}


			//Return our frags object	
			return parseFloat(rFragsCap);
		};

		var rSPOT_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap, recentPlayerData){
			var battles,
			tankId,
			expTotalSpot = 0,
			totalSpot = totalPlayerData.statistics.all.spotted - recentPlayerData.stat.statistics.all.spotted,
			rSpot = 0,
			rSpotCap = 0,
			averageSpotPerGame = 0;

			for(var i=0, x=recentBattlesArray.length; i<x; i++){
				tankId = recentBattlesArray[i].tank_id.toString();
				battles = recentBattlesArray[i].battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
					
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){

					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageSpotPerGame = parseFloat(wn8DataArray.data[j].expSpot);
						expTotalSpot += averageSpotPerGame * battles;
					}
				}
			}

			rSpot = (totalSpot / expTotalSpot);
			rSpotCap = (rSpot - 0.38) / (1 - 0.38);

			//Set min value
			if(rSpotCap < 0){
				rSpotCap = 0;
			}
			//Set max value
			if(rSpotCap > (rDamageCap + 0.1)){
				rSpotCap = rDamageCap + 0.1;
			}

			//Return our object
			return parseFloat(rSpotCap);	
		};


		var rDEF_object = function(wn8DataArray, totalVehicleData, totalPlayerData, rDamageCap, recentPlayerData){
			var battles,
			tankId,
			expTotalDef = 0,
			totalDef = totalPlayerData.statistics.all.dropped_capture_points - recentPlayerData.stat.statistics.all.dropped_capture_points,
			rDef = 0,
			rDefCap = 0,
			averageDefPerGame = 0;


			for(var i=0, x=recentBattlesArray.length; i<x; i++){
				tankId = recentBattlesArray[i].tank_id.toString();
				battles = recentBattlesArray[i].battles;
				//Now lets multiply the average damage for this particular tank with the amount of battles played
					
				for(var j=0, y=wn8DataArray.data.length; j<y; j++){

					if(wn8DataArray.data[j].IDNum === tankId){
						//Add the frags
						averageDefPerGame = parseFloat(wn8DataArray.data[j].expDef);
						expTotalDef += averageDefPerGame * battles;
					}
				}
			}

			
			
			rDef = (totalDef / expTotalDef);
			rDefCap = (rDef - 0.10) / (1 - 0.10);

			//Set min value
			if(rDefCap < 0){
				rDefCap = 0;
			}
			//Set max value
			if(rDefCap > (rDamageCap + 0.1)){
				rDefCap = rDamageCap + 0.1;
			}
			
			//Return our object
			return parseFloat(rDefCap);
		};

		//Extra function to calculate normalized winrate object
		var winNormalized_object = function(rWINc){
			if(rWINc>1.8){
				rWINc = 1.8;
			}
			return rWINc;
		};

		//Instantiate our different objects
		var	rWINc = rWIN_object(wn8DataArray, totalVehicleData, totalPlayerData, recentPlayerData),
			rDAMAGEc = rDAMAGE_object(wn8DataArray, totalVehicleData, totalPlayerData, recentPlayerData),
			rFRAGSc = rFRAGS_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc, recentPlayerData),
			rSPOTc = rSPOT_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc, recentPlayerData),
			rDEFc = rDEF_object(wn8DataArray, totalVehicleData, totalPlayerData, rDAMAGEc, recentPlayerData),
			rWINcNormalized = winNormalized_object(rWINc);
		



		/*
		//Console Logs To track the errors in WN8 Recent
		console.log("=== START WN8 RECENT FORMULA ===");
		console.log("rWINc: " + rWINc);
		console.log("rDAMAGEc: " + rDAMAGEc);
		console.log("rFRAGSc: " + rFRAGSc);
		console.log("rSPOTc: " + rSPOTc);
		console.log("rDEFc: " + rWINc);
		console.log("rWINcNormalized: " + rWINcNormalized);
		console.log("==== END WN8 RECENT FORMULA ===");
		*/

		//WN8 = 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*MIN(1.8,rWINc)
		//wn8Recent = parseInt((parseFloat(980*rDAMAGEc) + parseFloat(210*rDAMAGEc*rFRAGSc) + parseFloat(155*rFRAGSc*rSPOTc) + parseFloat(75*rDEFc*rFRAGSc) + parseFloat(145*rWINcNormalized)), 10);
		
		wn8Recent = parseInt((parseInt(980*rDAMAGEc) + parseInt(210*rDAMAGEc*rFRAGSc) + parseInt(155*rFRAGSc*rSPOTc) + parseInt(75*rDEFc*rFRAGSc) + parseInt(145*rWINcNormalized)), 10);


		//Define the variables we need to color our wn7 result
		var newcolor = container.printColorToStat(statName, wn8Recent);

		//Print the result to the DOM
		container.append('<h1>WN8 Rating: <span style="color:' + newcolor +'">'  + wn8Recent + '</span></h1>');

	}
	
});