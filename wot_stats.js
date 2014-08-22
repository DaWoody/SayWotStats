/*
*	Description: 	The jQuery engine WoodyWotStats for the site Say Wot?-Stats. Utilizing the unoffical WOT-API, (https://gist.github.com/bartku/4271798).
*					This engine utilizes a different set of methods involving calculations on/and extracting data from the objects returned from the API. 					
*	VersionInfo:  	Using WOT API v2.X	
*	Author: 		Johan "DaWoody" Wedfelt 
*	AuthorURL:  	https://github.com/DaWoody
* 	Feedback/Dev:  	http://saywotstats.blogspot.se
*	License:   	    GNU General Public License, version 3(GPL-3.0) (http://opensource.org/licenses/GPL-3.0)
*
*/
jQuery(document).ready(function(){
	/*
	*	Some global variables
	*/
	var sourceToken 	= 	'WG-WoT_Assistant-1.4.1'; //NOT USED ANYMORE?

	//The DOM elements to manipulate, can be changed to your needs.
	var player_stats_container = $("#player_stats_container"),
	player_general_information = $("#player_general_information"),
	player_stats_total = $("#total_stats"),
	player_stats_recent = $("#recent_stats"),
	player_stats_older = $("#older_stats"),
	player_no_access = $("#player_no_access"),
	the_form = $('#search_player_form_section');
	first_loading_div = $('#first_load_message_div');


	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php',
	httpShowPlayer = 'wot_show_player_stats.php';
	
	//Some CSS fixes on first load
	player_stats_recent.addClass('on_first_load_css_fix');
	player_stats_total.addClass('on_first_load_css_fix');

	//Empty tankdata array on init!
	
	window.newTankDataArray = [];
	var tankDataArray;


	/*
	*	Load tank data prior to execution
	*/
	(function loadTankData(){

		//var promise = $.Deferred();

		var serverAbbreviation = '.eu',
			apiVer = '2.0',
			apiKey = 'd0a293dc77667c9328783d489c8cef73',
			apiFetchStatsUrl = 'http://api.worldoftanks' + serverAbbreviation + '/' +  apiVer + '/encyclopedia/tanks/?application_id=' + apiKey;

			//http://api.worldoftanks.ru/2.0/encyclopedia/tanks/?application_id=


		$.ajax(httpShowPlayer, {
				dataType: 'json',
				method: 'post',
				data: {
					url: apiFetchStatsUrl
				},

				success: function(response) {
					tankDataArray = response;
					//console.log("General tank data fetched ok!");
					the_form.removeClass('hidden');
					first_loading_div.addClass('hidden');
				},

				error: function(response) {
					//console.log('error from fetching general tank data!');

				}

			});
		
	})();


	/*
	*	Search Player Function
	*/
	function SearchPlayer(event) {
		event.preventDefault();

			//Create some variables for displaying the correct server
			var serverName, serverAbbreviation,
			//Here we need to fetch our options from the select input
			server = $('#server_selection').find('select').find('option:selected').val();

			switch(server){
				case 'ru': {
						serverName = 'Russian';
						serverAbbreviation = '.ru';	
						apiKey = '171745d21f7f98fd8878771da1000a31';
				}	
				break;

				case 'us': {
						serverName = 'North American';
						serverAbbreviation = '.com';
						apiKey = '16924c431c705523aae25b6f638c54dd';
				}
				break;
				
				case 'sea': {
						serverName = 'South East Asian';
						serverAbbreviation = '-sea.com';
						apiKey = '39b4939f5f2460b3285bfa708e4b252c';
				}
				break;
				
				case 'kr': {
						serverName = 'Korean';
						serverAbbreviation = '.kr';
						apiKey = 'ffea0f1c3c5f770db09357d94fe6abfb';
				}
				break;

				default: {
						serverName = 'European';
						serverAbbreviation = '.eu';
						apiKey = 'd0a293dc77667c9328783d489c8cef73';
				}

			}

			//API for fetching the player Name
			var apiVer = '2.0'; /* 1.0 -> 1.1 */

			//Fetching form data, needs to be updated every time the submit button is pressed...
			var tankerName = $('#search_player_form_section').find('input[type=text]').val();
			var apiFetchNameUrl	= 'http://api.worldoftanks' + serverAbbreviation +'/'+ apiVer +'/account/list/?application_id='+ apiKey +'&search='+ tankerName +''; //+'&offset=0&limit=1';

			//http://<CLUSTER_API_ADDRESS>/2.0/account/list/?application_id=<APP_ID>&search=<PARTIAL_NICKNAME>


			//Do some quick css fixes to our DOM
			player_stats_recent.removeClass('on_first_load_css_fix');
			player_stats_total.removeClass('on_first_load_css_fix');	

			$.ajax(httpFindPlayer, {
				
				dataType: 'json',
				method: 'post',
				data: {
					url: apiFetchNameUrl
				},
				beforeSend: function() {
					player_stats_container.addClass('loading');
				},

				complete: function() {
					
				},

				//contentType: 'application/json',
				success: function(response) {

					//console.log('The Check ID request');
					//console.log(response);
					
					var status = response.status,
					clan,
					playerFound = true;

					try{
						clan = response.data[0].clan_id;
					}
					catch(error){
						clan = "";
					}

					try {
						typeof response.data[0].account_id === typeof undefined;
					}
					catch(error){
						playerFound = false;
					}
					
					//console.log(response.data[0].account_id);
					

					//The error message we will print out if there is something wrong with the search
					var htmlMsg = '<h1>Ops the magic kitten did not find that Tanker on the ' + serverName + ' server, please try again ;)..</h1>';	

					
					if(status==="ok" && playerFound) {
						//Since we know the status is ok, we check if the player exist.
						
							var id = response.data[0].account_id;	

							//console.log('player id is: ' + id);

							if(clan!==null){

							}


							//Lets reset our tanks on the window object
							window.newTankDataArray = [];
							
							//Declaring our promises.
							var playerTotalStatsPromise = AjaxPlayerTotalStats.getPlayerTotalStats(id, serverAbbreviation, apiVer);
							var playerPastStatsPromise1 = AjaxPlayerPastStats.getPlayerPastStats(id, serverAbbreviation, apiVer, 24);
							var playerPastStatsPromise2 = AjaxPlayerPastStats.getPlayerPastStats(id, serverAbbreviation, apiVer, 168);  
							var playerVehicleStatsPromise = AjaxPlayerVehicleStats.getPlayerVehicleStats(id, serverAbbreviation, apiVer); 

							$.when(playerTotalStatsPromise,playerPastStatsPromise1, playerPastStatsPromise2, playerVehicleStatsPromise).done(function(response1, response2, response3, response4){
								//Now lets send the collected AJAX responses to our engine to calculate stats.
								


								//Lets make a try and catch statement here
								try {
							
									if(response2.status=="ok" && response3.status=="ok"){
										player_no_access.addClass('hidden');
										CalculateStatsEngine(response1, response2, response3, response4, serverName, serverAbbreviation, id, tankDataArray);
										//remove our css class, when we are done
										player_stats_container.removeClass('loading');
										player_stats_container.removeClass('hidden');
									}
									else {
										throw new Error("The object we recieved from the recent data did not have status ok, instead access was denied from the API");
									}
									
								}
								catch(error){
									//console.log(error);
									player_stats_container.addClass('hidden');
									player_stats_container.removeClass('loading');
									player_no_access.removeClass('hidden');

								}

								
							});
							
	

					}
					else{
						//Do stuff to DOM here when no player is found..
						player_stats_container.removeClass('loading');
						player_general_information.html(htmlMsg);
						player_stats_total.html('').addClass('on_first_load_css_fix');
						player_stats_recent.html('').addClass('on_first_load_css_fix');
						player_stats_older.html('');
					}
	
				},

				error: function(response) {
					console.log('error from the SearchPlayer AJAX call');
					//Show us an error when we get a failed AJAX call
					player_stats_container.removeClass('loading');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the ' + serverName + ' server at the moment, please try again! ;)</h1>');
					player_stats_total.html('').addClass('on_first_load_css_fix');
					player_stats_recent.html('').addClass('on_first_load_css_fix');
					player_stats_older.html('');
				},

				timeout: 20000 //Really slow system now.. 20 seconds delay

			});
	}

	//Declaring first promise as an object
	var AjaxPlayerTotalStats = {
		
		getPlayerTotalStats: function(tankerId, serverAbbreviation, apiVer) {
			//Declaring the promise
			var promise = $.Deferred();

			//Fetching our server value
			var server = server;

			//API for fetching the player stats
			//var apiVer = '2.0'; /* 1.0 -> 1.1 */
			
			//console.log("This is a test tanker: " + tankerId + " serverAbbreviation: " + serverAbbreviation + " and Api ver: " + apiVer);

			var apiFetchStatsUrl = 'http://api.worldoftanks' + serverAbbreviation + '/' + apiVer + '/account/info/?application_id=' + apiKey + '&account_id=' + tankerId;

			
			$.ajax(httpShowPlayer, {
				dataType: 'json',
				method: 'post',
				data: {
					url: apiFetchStatsUrl
				},

				success: function(response) {
					promise.resolve(response);
				},

				error: function(response) {
					console.log('error from getPlayerTotalStats');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
					player_stats_total.html('').addClass('on_first_load_css_fix');
					player_stats_recent.html('').addClass('on_first_load_css_fix');
				}

			});

			//Returning the promise
			return promise;
		}

	}

	//Declaring the second promise as an object
	var AjaxPlayerPastStats = {
		getPlayerPastStats: function(tankerId, serverAbbreviation, apiVer, hoursAgo) {

			var promise = $.Deferred();

			var	apiFetchStatsUrl = 'http://api.worldoftanks' + serverAbbreviation + '/' + apiVer + '/stats/accountbytime/?application_id=' + apiKey +'&account_id=' + tankerId + '&hours_ago=' + hoursAgo;

			$.ajax(httpShowPlayer, {
				data: {
					url: apiFetchStatsUrl
				},
				dataType: 'json',
				method: 'post',
				success: function(response){

					promise.resolve(response);

				},

				error: function(response){
					console.log('error from AjaxPlayerPastStats');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
					player_stats_recent.html('').addClass('on_first_load_css_fix');
					player_stats_total.html('').addClass('on_first_load_css_fix');
				}
			});

			return promise;
		}

	}


	//Declaring the vehicle promise as an object
	var AjaxPlayerVehicleStats = {
		getPlayerVehicleStats: function(tankerId, serverAbbreviation, apiVer, hoursAgo) {

			var promise = $.Deferred();


			var	apiFetchStatsUrl = 'http://api.worldoftanks' + serverAbbreviation + '/' + apiVer + '/account/tanks/?application_id=' + apiKey +'&account_id=' + tankerId;

			$.ajax(httpShowPlayer, {
				data: {
					url: apiFetchStatsUrl
				},
				dataType: 'json',
				method: 'post',
				success: function(response){

					promise.resolve(response);

				},

				error: function(response){
					console.log('error from AjaxPlayerPastStats');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
					player_stats_recent.html('').addClass('on_first_load_css_fix');
					player_stats_total.html('').addClass('on_first_load_css_fix');
				}
			});

			return promise;
		}

	}


	
	//This function gathers all ajax data and then fires it off to our plugins which will do the heavy lifting
	function CalculateStatsEngine(response1, response2, response3, response4, server, serverAbbreviation, tankerId, tankDataArray) {

		
		//First we modify our responses to work with our methods
		//Data for total stats section
		var responseData1 = response1.data[tankerId];
		//Data for 24 ago stats section
		var responseData2 = response2.data[0];
		//Data for 1 week ago stats section
		var responseData3 = response3.data[0];
		//Data for vehicles
		var responseData4 = response4.data[tankerId];

		var theTankDataArray = tankDataArray;




		/*	
		//Dev stuff below... could be removed later.
		console.log('Player Total Stats Object FIXED:');
		console.log(responseData1);
		console.log('Player Recent Stats Object:');
		console.log(responseData2);
		console.log('Player Older Stats Object:');
		console.log(responseData3);
		*/

		
		//We clear our DOM from previous searches
		player_general_information.html('');
		player_stats_recent.html('');
		player_stats_older.html('');
		player_stats_total.html('');

		//Call our different plugins here below


		var playerTankData = player_stats_total.allPlayerTanks(responseData4, tankDataArray);

		
				
		//24 Hours ago Stats Plugins
		player_stats_recent.printRecentStatsHeader();
		player_stats_recent.battlesPlayedPast(responseData1, responseData2);
		player_stats_recent.averageWinRatePast(responseData1,responseData2);
		player_stats_recent.averageExperiencePast(responseData1, responseData2);
		player_stats_recent.averageDamagePast(responseData1, responseData2);
		player_stats_recent.averageFragsPast(responseData1, responseData2);
		player_stats_recent.averageSpottedPast(responseData1, responseData2);
		player_stats_recent.averageDefPointsPast(responseData1, responseData2);
		player_stats_recent.averageTierPast(responseData4,responseData2, tankDataArray);
		player_stats_recent.wn7Past(responseData1, responseData2, playerTankData, tankDataArray, responseData4);
		player_stats_recent.favoriteVehiclePast(responseData2, playerTankData);
		
		//1 Weeks ago Stats Plugins
		player_stats_older.printOlderStatsHeader();
		player_stats_older.battlesPlayedPast(responseData1, responseData3);
		player_stats_older.averageWinRatePast(responseData1,responseData3);
		player_stats_older.averageExperiencePast(responseData1, responseData3);
		player_stats_older.averageDamagePast(responseData1, responseData3);
		player_stats_older.averageFragsPast(responseData1, responseData3);
		player_stats_older.averageSpottedPast(responseData1, responseData3);
		player_stats_older.averageDefPointsPast(responseData1, responseData3);
		player_stats_older.averageTierPast(responseData4,responseData3, tankDataArray);
		player_stats_older.wn7Past(responseData1, responseData3, playerTankData, tankDataArray, responseData4);
		player_stats_older.favoriteVehiclePast(responseData3, playerTankData);
		

		//Total Stats Plugins
		player_stats_total.printTotalStatsHeader();
		player_stats_total.totalBattlesPlayed(responseData1);
		
		player_stats_total.averageWinRate(responseData1);
		player_stats_total.averageExperience(responseData1);
		player_stats_total.averageDamage(responseData1);
		player_stats_total.averageFrags(responseData1);
		player_stats_total.averageSpotted(responseData1);
		player_stats_total.averageDefPoints(responseData1);
		player_stats_total.averageTier(responseData1, responseData4, playerTankData);
		player_stats_total.wn7Total(responseData1, playerTankData);
		player_stats_total.favoriteVehicleTotal(responseData1, playerTankData);
		

		//General Information Plugins
		player_general_information.playerName(responseData1);
		player_general_information.clan(responseData1, serverAbbreviation);
		player_general_information.printServer(server);
		player_general_information.lastUpdated(responseData1);
		

		//Test plugins, before going live...or just for fun ;)
		//player_stats_container.getAccountCreationTime(response1);
		//player_stats_total.hitPercentage(response1);
		//player_general_information.calculateTotalTimePlayed(response1);
		
				
	}
	
	/*
	*	Search Player Listener
	*/
	the_form.find('form').on('submit', SearchPlayer);

});