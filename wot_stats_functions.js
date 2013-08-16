/*
*	WOT-Stats functions defined as plugins
*	Author: Johan "DaWoody" Wedfelt
*	Author URL: https://github.com/DaWoody
*	License: Open License, use as you see fit, just leave a reference to the author
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

	$.fn.clan = function(response){
		
		var container = $(this);
		var clan = response.data.clan.clan;
		
		if(clan!==null){
			var clanName = response.data.clan.clan.abbreviation
			var clanImageUrl = response.data.clan.clan.emblems_urls.small;
			var clanId = response.data.clan.clan.id;
			var clanUrl = 'http://worldoftanks.eu/uc/clans/' + clanId + '-' + clanName + '/';
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
		var winRatioPast24 = Math.round((winsPast24/battlesLast24Hours)*100);

		//Print to DOM
		container.append('<h1>Average winrate: ' + winRatioPast24 + '&#37;</h1>');
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
		//Do our average tier calculation
		var averageTierPast24 = Math.round((countMatchesLevelIterationPast24/countMatchesIterationPast24)*100)/100;
		//Print it to the DOM
		container.append('<h1>Average tier: ' + averageTierPast24 + '</h1>');

	}


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

		//console.log('The other array:');
		//console.log(tanksArrayNew);
		//console.log('Johan you freaaaking ROCK!');

		//Now lets do cool stuff with our new arrays!

		//Define our battles variable, this will increase as we iterate through
		//var mostBattlesPlayed = 0;
		//Define the variable we will call to fetch the tank which is most used	
	
		
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
		//Define the variable we will call to fetch the tank which is most used
		var tankIdMostPlayed = null;

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

		if((tanksArray[tankIdMostPlayed].localized_name)!== null){
			//Define the vehicle name of the most played tank
			var vehicleName = tanksArray[tankIdMostPlayed].localized_name;
		}
		//Define part of the url we need to show the image of the most played tank
		var vehiclePartImgUrl = tanksArray[tankIdMostPlayed].image_url;
		//Define the whole url of the most played tank
		var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;
		//Print it to the DOM
		container.append('<h1>Most played: ' + vehicleName + '<img class="vehicle_image" src="' + vehicleImgUrl + '">');
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
		console.log('tanksArray2:');
		console.log(tanksArray2);

		console.log('tanksArrayJoined');
		console.log(tanksArrayJoined);
		
		//Define what we get in
		var container = $(this);

		//Define our battles variable, this will increase as we iterate through
		var mostBattlesPlayed = 0;
		//Define the variable we will call to fetch the tank which is most used
		var tankIdMostPlayed = null;

		//Now we iterate through all vehicles
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

		//Define the vehicle name of the most played tank
		var vehicleName = tanksArrayJoined[tankIdMostPlayed].localized_name;
		
		//Define part of the url we need to show the image of the most played tank
		var vehiclePartImgUrl = tanksArrayJoined[tankIdMostPlayed].image_url;
		//Define the whole url of the most played tank
		var vehicleImgUrl = 'http://worldoftanks.eu' + vehiclePartImgUrl;

		//Print it to the DOM
		container.append('<h1>Most played: ' + vehicleName + '<img class="vehicle_image" src="' + vehicleImgUrl + '">');
		
	}
});