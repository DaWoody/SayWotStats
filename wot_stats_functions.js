/*
*	Description: 	Functions defined as plugins for the site, Say Wot? - stats (http://saywotstats.net)
*	VersionInfo:  	Using WOT API v1.X
*	Author: 		Johan "DaWoody" Wedfelt
*	Author 			URL: https://github.com/DaWoody
*	License:   		GNU General Public License, version 3(GPL-3.0) (http://opensource.org/licenses/GPL-3.0)
*	
*
*/

jQuery(document).ready(function(){
	
	/*
	*	Show Tanker Name
	*/
	$.fn.playerName = function(response){
		var container = $(this);
		var playerName = response.data.name;
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
		var headline = '<div class="recent_total_stats_headline_div"><h1>Recent<br><span>(24 hours from last update)</span></h1></div>';
		container.prepend(headline);
	}

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

		//Get total battles
		var totalBattlesPlayed = response.data.summary.battles_count;

		//Get total wins, current
		var totalWins = response.data.summary.wins;

		//The average winrate
		var averageWinRate = Math.round((totalWins/totalBattlesPlayed)*1000)/10;
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
		container.append('<h1>Average damage: ' + averageDamage + '</h1>');
	}

	/*
	*	Show when the stats was last updated
	*/

	$.fn.lastUpdated = function(response){
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

		container.append('<h1>Updated: ' + formattedTime + '</h1>');
	}

	/*
	*	Show total battles played
	*/
	$.fn.totalBattlesPlayed = function(response) {
		//We define what we get in
		var container = $(this);
		//Defining some variables
		var totalBattlesPlayed = response.data.summary.battles_count;
		container.append('<h1>Battles played: ' + totalBattlesPlayed + '</h1>');
	}
	

	/*
	*	Show hit percentage
	*/	
	$.fn.hitPercentage = function(response) {
		//We define what we get in
		var container = $(this);
		//Defining some variables
		var hitPercentage = response.data.battles.hits_percents;
		container.append('<h1>Hit percentage: ' + hitPercentage + '&#37;</h1>');
	}

	/*
	*	Show Clan Name and Image
	*/
	$.fn.clan = function(response, serverAbbreviation){
		
		var container = $(this);
		var clan = response.data.clan.clan;
		
		if(clan!==null){
			var clanName = response.data.clan.clan.abbreviation
			var clanImageUrl = response.data.clan.clan.emblems_urls.small;
			var clanId = response.data.clan.clan.id;
			var clanUrl = 'http://worldoftanks' + serverAbbreviation +  '/uc/clans/' + clanId + '-' + clanName + '/';
			container.append('<h1>Clan: ' + clanName + '<a href="' + clanUrl +'" target="wot_stats_clans"><img class ="clan_image" src="' + clanImageUrl + '" /></a>');	
		}
		
			
	}

	/*
	*	Show total damage, Is this used??:...
	*/
	$.fn.totalDamage = function(response) {
		var container = $(this);

		var totalDamage = response.data.battles.damage_dealt;
		container.append('<h1>Total damage: ' + totalDamage + '</h1>');
	}

	/*
	*	Show average damage past 24 hours
	*/
	$.fn.averageDamagePast24 = function(response1, response2) {

		var container = $(this);

		//Total damage 24 hours ago.	
		var damage24HoursAgo = response2.stats[0].stats.battles.damage_dealt;
		//Total damage, according to last update
		var totalDamage = response1.data.battles.damage_dealt;
		//The accumulated damage the last 24 hours
		var damageLast24Hours = totalDamage - damage24HoursAgo;
		//Total amount of battles 24 hours ago
		var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//The amount of battles the last 24 hours
		var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
		//Calculate the average damage done last 24 hours.
		var averageDamageLast24Hours = Math.round(damageLast24Hours/battlesLast24Hours);
		container.append('<h1>Average damage: ' +  averageDamageLast24Hours + '</h1>');
	}

	/*
	*	Show amount of battles played the past 24 hours
	*/
	$.fn.battlesPlayedPast24 = function(response1, response2) {
		var container = $(this);
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//Total amount of battles 24 hours ago
		var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
		//The amount of battles the last 24 hours
		var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

		container.append('<h1>Battles played: ' + battlesLast24Hours + '</h1>');
	} 


	/*
	*	Show the average experience gained per game the past 24 hours
	*/
	$.fn.averageExperiencePast24 = function(response1, response2) {
		//Define what we get in
		var container = $(this);
		//First we will get the amount of battles for the past 24 hours
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//Total amount of battles 24 hours ago
		var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
		//The amount of battles the last 24 hours
		var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

		//Now we will get the total xp gain and subtract how it looked 24 hours ago
		//Get the total XP so far
		var totalXpGained = response1.data.experience.xp;
		//Get the total XP from 24 hours back
		var totalXpGainedLast24 = response2.stats[0].stats.experience.xp;
		//Subtract the difference to get the xp gained the past 24 hours
		var xpGainedPast24 = totalXpGained - totalXpGainedLast24;
		//Now we calculate the average xp gained per fight the last 24 hours
		var averageXpGainedPast24 = Math.round(xpGainedPast24/battlesLast24Hours);
		//Print it to the DOM
		container.append('<h1>Average experience: ' + averageXpGainedPast24 + '</h1>');
	}

	/*
	*	Shows average winrate from the past 24 hours
	*/
	$.fn.averageWinRatePast24 = function(response1, response2) {
		//Define what we get in
		var container = $(this);

		//What to do.
		//Get amount of battles and amount of wins, divide to get percentage

		//First we will get the amount of battles for the past 24 hours
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//Total amount of battles 24 hours ago
		var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
		//The amount of battles the last 24 hours
		var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

		//Get amount of wins for the past 24 hours
		//Get total wins, current
		var totalWins = response1.data.summary.wins;
		//Get total wins, 24 hours ago
		var totalWinsLast24 = response2.stats[0].stats.summary.wins;
		//Subtract to get amount of wins for the past 24 hours
		var winsPast24 = totalWins - totalWinsLast24;
		//Divide to get the win percentage from the past 24 hours
		var winRatioPast24 = (Math.round(((winsPast24/battlesLast24Hours)*1000)))/10;

		//Print to DOM
		container.append('<h1>Average winrate: ' + winRatioPast24 + '&#37;</h1>');
	}

	/*
	*	Calculates average capture points over all battles
	*/
	$.fn.averageCapPoints = function(response) {
		var container = $(this);

		var totalCapPoints = response.data.ratings.ctf_points.value;

		//Total amount of battles, to last update.
		var totalAmountOfBattles = response.data.summary.battles_count;
		
		if(totalAmountOfBattles === 0){
			var averageCapPoints = 0;
		}
		else {
			var averageCapPoints = Math.round((totalCapPoints/totalAmountOfBattles)*100)/100;
		}
		container.append('<h1>Average capture points: ' + averageCapPoints + '</h1>');
		
	}

	/*
	*	Calculates average capture points over the last 24 hours
	*/
	$.fn.averageCapPointsPast24 = function(response1, response2) {
		var container = $(this);

		//Getting the total cap points
		var totalCapPoints = response1.data.ratings.ctf_points.value;
		//Getting total cap points from 24 hours ago
		var totalCapPointsLast24 = response2.stats[0].stats.ratings.ctf_points.value;

		var capPointsPast24 = totalCapPoints - totalCapPointsLast24;

		//Total amount of battles, to last update.
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//Total amount of battles, 24 hours ago.
		var totalAmountOfBattles24Last = response2.stats[0].stats.summary.battles_count;

		var battlesPast24 = totalAmountOfBattles - totalAmountOfBattles24Last;


		
		if(battlesPast24 === 0){
			var averageCapPoints = 0;
		}
		else {
			var averageCapPoints = Math.round((capPointsPast24/battlesPast24)*100)/100;
		}
		
		container.append('<h1>Average capture points: ' + averageCapPoints + '</h1>');
		
	}

	/*
	*	Calculate average defense points
	*/
	$.fn.averageDefPoints = function(response) {
		var container = $(this);
		//Get the total number of def points
		var totalDefPoints = response.data.ratings.dropped_ctf_points.value;
		//Total amount of battles, to last update.
		var totalAmountOfBattles = response.data.summary.battles_count;

		if(totalAmountOfBattles === 0){
			var averageDefPoints = 0;
		}
		else {
			var averageDefPoints = Math.round((totalDefPoints/totalAmountOfBattles)*100)/100;
		}
		
		container.append('<h1>Average defence points: ' + averageDefPoints + '</h1>');
	}


	/*
	*	Calculate average defense points last 24 hours
	*/
	$.fn.averageDefPointsPast24 = function(response1, response2) {
		var container = $(this);
		//Get the total number of def points
		var totalDefPoints = response1.data.ratings.dropped_ctf_points.value;
		//Get the total number of def points 24 hours ago
		var totalDefPoints24Last = response2.stats[0].stats.ratings.dropped_ctf_points.value;
		//Calculate the difference
		var defPointsPast24 = totalDefPoints - totalDefPoints24Last;

		//Total amount of battles, to last update
		var totalAmountOfBattles = response1.data.summary.battles_count;
		//Total amount of battles, 24 hours ago
		var totalAmountOfBattlesLast24 = response2.stats[0].stats.summary.battles_count;
		//Calculate the difference
		var battlesPast24 = totalAmountOfBattles - totalAmountOfBattlesLast24;

		if(battlesPast24 === 0){
			var averageDefPoints = 0;
		}
		else {
			var averageDefPoints = Math.round((defPointsPast24/battlesPast24)*100)/100;
		}
		container.append('<h1>Average defence points: ' + averageDefPoints + '</h1>');
	}


	/*
	*	Shows the average tier played in total
	*/
	$.fn.averageTier = function(response){
		//Defining our container
		var container = $(this);
		//Defining some variables we need when we iterate through the array
		var countMatchesIteration = 0;
		var countMatchesLevelIteration = 0;

		//Getting in our vehicles array from the object
		var tanksArray = response.data.vehicles;
		
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
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTier + '</h1>');
	}

	/*
	*	Shows the average tier from the past 24 hours
	*/
	$.fn.averageTierPast24 = function(response1, response2){

		//Define our first vehicles array
		var tanksArray1 = response1.data.vehicles;
		var tanksArray2 = response2.stats[0].stats.vehicles
		
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
	*	A test function...to split arrays..
	*/
	$.fn.arraySplitFunction = function(response1, response2){

		
		//Define our first vehicles array
		var tanksArray1 = response1.data.vehicles;
		var tanksArray2 = response2.stats[0].stats.vehicles
		
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
		
	}



	/*
	*	This will show us the name and the image of the most played vehicle in total
	*/
	$.fn.favoriteVehicleTotal = function(response) {
		//Define what we get in
		var container = $(this);
		//Define our vehicles array
		var tanksArray = response.data.vehicles;
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
	$.fn.favoriteVehiclePast24 = function(response1, response2) {
		
		//Define our first vehicles array
		var tanksArray1 = response1.data.vehicles;
		var tanksArray2 = response2.stats[0].stats.vehicles
		
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
	*	Math test function
	*/
	$.fn.mathTest = function(response){
		var number1 = 2;
		var number2 = 2;

		//var number3 = Math.pow(number1, number2);

		var number4 = Math.exp(1);
		console.log(number4);


		
		
		//Fetching the average amount of frags
		function averageFragsPast24(response2){
			//Fetching the amount of battles in total
			//var totalBattlesPlayed = response1.data.summary.battles_count;
			//Total amount of battles 24 hours ago
			//var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
			//Fetching the amount of total frags
			//var totalFrags = response1.data.battles.frags;
			//Fetching the amount of frags 24 hours ago
			var totalFragsLast24 = response2.stats[0].stats.battles.frags;
			//Calculating average frags
			//var averageFrags = totalFrags/totalBattlesPlayed;
			console.log('OOOk average frags ' + totalFragsLast24);
		}

		averageFragsPast24(response);
		
	}


	/*
	*	WN7 Agreggated function calculation, for total stats
	*/
	$.fn.wn7Total = function(response) {
		//Defining our container
		var container = $(this);

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
				var tanksArray = response.data.vehicles;
				
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
			var totalBattlesPlayed = response.data.summary.battles_count;
			return totalBattlesPlayed;
		}	


		//Fetching the average amount of frags
		function averageFrags(response){
			//Fetching the amount of battles
			var totalBattlesPlayed = response.data.summary.battles_count;
			//Fetching the amount of total frags
			var totalFrags = response.data.battles.frags;
			//Calculating average frags
			var averageFrags = totalFrags/totalBattlesPlayed;
			return averageFrags;
		}

		//Fetching average spoting per game
		function averageSpotted(response){
			//Get the total amount of spots
			var totalSpotted = response.data.battles.spotted;
			//Fetching the amount of battles
			var totalBattlesPlayed = response.data.summary.battles_count;
			//Get the average spot, by dividing the spots with battles
			var averageSpotted = totalSpotted/totalBattlesPlayed;
			return averageSpotted;
		}

		//Fetching average damage
		function averageDamage(response){
			//Defining some variables
			var totalBattlesPlayed = response.data.summary.battles_count;
			//Getting the total damage
			var totalDamage = response.data.battles.damage_dealt;
			//Calculate the average damage
			var averageDamage = totalDamage/totalBattlesPlayed;
			return averageDamage;
		}

		//Get the average def points
		function averageDefPoints(response) {
			//Get the total number of def points
			var totalDefPoints = response.data.ratings.dropped_ctf_points.value;
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response.data.summary.battles_count;

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
			var totalWins = response.data.summary.wins;
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response.data.summary.battles_count;
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

		//Print the result to the DOM
		container.append('<h1>WN7 Rating: ' + wn7Rounded + '</h1>');


		/* TEST CONSOLE PRINTS
		//HMm lets see the errors..
		console.log('wn7 STARTING FROM HERE:::::');
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

	/*
	*	WN7 Agreggated function calculation, for recent stats
	*/
	$.fn.wn7Past24 = function(response1, response2) {
		//Defining our container
		var container = $(this);

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
		function averageTierPast24(response1, response2){
				//Define our first vehicles array
				var tanksArray1 = response1.data.vehicles;
				var tanksArray2 = response2.stats[0].stats.vehicles
				
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
		function battlesPlayedPast24(response1, response2){
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response1.data.summary.battles_count;
			//Total amount of battles 24 hours ago
			var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
			//The amount of battles the last 24 hours
			var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
			return battlesLast24Hours;
		}	


		//Fetching the average amount of frags
		function averageFragsPast24(response1, response2){
			//Fetching the amount of battles in total
			var totalBattlesPlayed = response1.data.summary.battles_count;
			//Total amount of battles 24 hours ago
			var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
			//Fetching the amount of total frags
			var totalFrags = response1.data.battles.frags;
			//Fetching the amount of frags 24 hours ago
			var totalFragsLast24 = response2.stats[0].stats.battles.frags;
			//Calculate total frags during the past 24 hours
			var totalFragsPast24 = totalFrags - totalFragsLast24;
			//Calculate total battles during the past 24 hours
			var battlesPast24 = totalBattlesPlayed - battles24HoursAgo;


			//Calculating average frags
			var averageFrags = totalFragsPast24/battlesPast24;
			return averageFrags;
		}

		//Fetching average spoting per game
		function averageSpottedPast24(response1, response2){
			//Get the total amount of spots
			var totalSpotted = response1.data.battles.spotted;
			//Fetching the amount of battles
			var totalBattlesPlayed = response1.data.summary.battles_count;

			//Lets get the total spotted as it were 24 hours ago
			var totalSpottedLast24 = response2.stats[0].stats.battles.spotted;
			//Total amount of battles 24 hours ago
			var battlesLast24Hours = response2.stats[0].stats.summary.battles_count;
			//The amount of battles the last 24 hours
			var battlesPast24 = totalBattlesPlayed - battlesLast24Hours;
			//The amount of spots the last 24 hours
			var spottedPast24 = totalSpotted - totalSpottedLast24;

			//Get the average spot, by dividing the spots with battles
			var averageSpotted = spottedPast24/battlesPast24;
			return averageSpotted;
		}

		//Fetching average damage
		function averageDamagePast24(response1, response2){
			//Total damage 24 hours ago.	
			var damage24HoursAgo = response2.stats[0].stats.battles.damage_dealt;
			//Total damage, according to last update
			var totalDamage = response1.data.battles.damage_dealt;
			//The accumulated damage the last 24 hours
			var damageLast24Hours = totalDamage - damage24HoursAgo;
			//Total amount of battles 24 hours ago
			var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response1.data.summary.battles_count;
			//The amount of battles the last 24 hours
			var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;
			//Calculate the average damage done last 24 hours.
			var averageDamageLast24Hours = Math.round(damageLast24Hours/battlesLast24Hours);
			return averageDamageLast24Hours;
		}

		//Get the average def points
		function averageDefPointsPast24(response1, response2) {
			//Get the total number of def points
			var totalDefPoints = response1.data.ratings.dropped_ctf_points.value;
			//Get the total number of def points 24 hours ago
			var totalDefPoints24Last = response2.stats[0].stats.ratings.dropped_ctf_points.value;
			//Calculate the difference
			var defPointsPast24 = totalDefPoints - totalDefPoints24Last;

			//Total amount of battles, to last update
			var totalAmountOfBattles = response1.data.summary.battles_count;
			//Total amount of battles, 24 hours ago
			var totalAmountOfBattlesLast24 = response2.stats[0].stats.summary.battles_count;
			//Calculate the difference
			var battlesPast24 = totalAmountOfBattles - totalAmountOfBattlesLast24;

			if(battlesPast24 === 0){
				var averageDefPoints = 0;
			}
			else {
				var averageDefPoints = defPointsPast24/battlesPast24;
			}
			return averageDefPoints;
		}

		//Get the winrate
		function winRatePast24(response1, response2){
			//First we will get the amount of battles for the past 24 hours
			//Total amount of battles, to last update.
			var totalAmountOfBattles = response1.data.summary.battles_count;
			//Total amount of battles 24 hours ago
			var battles24HoursAgo = response2.stats[0].stats.summary.battles_count;
			//The amount of battles the last 24 hours
			var battlesLast24Hours = totalAmountOfBattles - battles24HoursAgo;

			//Get amount of wins for the past 24 hours
			//Get total wins, current
			var totalWins = response1.data.summary.wins;
			//Get total wins, 24 hours ago
			var totalWinsLast24 = response2.stats[0].stats.summary.wins;
			//Subtract to get amount of wins for the past 24 hours
			var winsPast24 = totalWins - totalWinsLast24;
			//Divide to get the win percentage from the past 24 hours
			var winRatioPast24 = (winsPast24/battlesLast24Hours)*100;
			return winRatioPast24;
		}

		//Creating our objects from the functions above, these variables, containing values calculated fom the functions above, will go into our WN7 formula
		var averageTier = averageTierPast24(response1, response2);
		var averageFrags = averageFragsPast24(response1, response2);
		var averageDamage = averageDamagePast24(response1, response2);
		var theWinRate = winRatePast24(response1, response2);
		var averageDefPoints = averageDefPointsPast24(response1, response2);
		var averageSpotted = averageSpottedPast24(response1, response2);
		var battlesPlayed = battlesPlayedPast24(response1, response2);


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

		//Print the result to the DOM
		container.append('<h1>WN7 Rating: ' + wn7Rounded + '</h1>');


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
		

	}

});