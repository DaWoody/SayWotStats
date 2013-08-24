/*
*	Description: 	The jQuery engine WoodyWotStats for the site Say Wot?-Stats. Utilizing the unoffical WOT-API, (https://gist.github.com/bartku/4271798).
*					This engine utilizes a different set of methods involving calculations on/and extracting data from the objects returned from the API. 					
*	VersionInfo:  	Using WOT API v1.X	
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
	var source_token 	= 	'WG-WoT_Assistant-1.4.1';

	//The DOM elements to manipulate, can be changed to your needs.
	var player_stats_container = $("#player_stats_container");
	var player_general_information = $("#player_general_information");
	var player_stats_total = $("#total_stats");
	var player_stats_recent = $("#recent_stats");
	var player_stats_older = $("#older_stats");
	var the_form = $('#search_player_form_section');


	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php';
	var httpShowPlayer = 'wot_show_player_stats.php';
	
	//Some CSS fixes on first load
	player_stats_recent.addClass('on_first_load_css_fix');

	/*
	*	Search Player Function
	*/
	function SearchPlayer(event) {
		event.preventDefault();

			//Create some variables for displaying the correct server
			var serverName, serverAbbreviation;

			//Here we need to fetch our options from the select input
			var server = $('#server_selection').find('select').find('option:selected').val();

			switch(server){
				case 'ru': {
						serverName = 'Russian';
						serverAbbreviation = '.ru';	
				}	
				break;

				case 'us': {
						serverName = 'North American';
						serverAbbreviation = '.com';
				}
				break;
				/*
				case 'sea': {
						serverName = 'South East Asian';
						serverAbbreviation = '-sea.com';
				}
				break;
				*/
				case 'kr': {
						serverName = 'Korean';
						serverAbbreviation = '.kr';
				}
				break;

				default: {
						serverName = 'European';
						serverAbbreviation = '.eu';
				}

			}

			//API for fetching the player Name
			var api_ver = '1.1'; /* 1.0 -> 1.1 */

			//Fetching form data, needs to be updated every time the submit button is pressed...
			var tankerName = $('#search_player_form_section').find('input[type=text]').val();
			var apiFetchNameUrl	= 'http://api.worldoftanks' + serverAbbreviation +'/community/accounts/api/'+ api_ver +'/?source_token='+ source_token +'&search='+ tankerName +'&offset=0&limit=1';

			//Do some quick css fixes to our DOM
			player_stats_recent.removeClass('on_first_load_css_fix');	

			$.ajax(httpFindPlayer, {
				
				dataType: 'json',
				method: 'post',
				data: {
					tanker_name: tankerName,
					url: apiFetchNameUrl
				},
				beforeSend: function() {
					player_stats_container.addClass('loading');
				},

				complete: function() {
					
				},

				//contentType: 'application/json',
				success: function(response) {

					var status = response.status;

					//The error message we will print out if there is something wrong with the search
					var htmlMsg = '<h1>Ops the magic kitten did not find that Tanker on the ' + serverName + ' server, please try again ;)..</h1>';	

					
					if(status==="ok") {
						//Since we know the status is ok, we check if the player exist.
						var player_exist = response.data.filtered_count;
						
						if(player_exist>0){
							//Get the id from the data, since now the player do exist.
							var id = response.data.items[0].id;	

							//console.log('player id is: ' + id);

							//Declaring our promises.
							var playerTotalStatsPromise = AjaxPlayerTotalStats.getPlayerTotalStats(id, serverAbbreviation);
							var playerPastStatsPromise = AjaxPlayerPastStats.getPlayerPastStats(id, server); 

							$.when(playerTotalStatsPromise,playerPastStatsPromise).done(function(response1, response2){
								//Now lets send the collected AJAX responses to our engine to calculate stats.
								CalculateStatsEngine(response1, response2, serverName, serverAbbreviation);
							});
							//remove our css class, when we are done
							player_stats_container.removeClass('loading');
			
						}
						else {
							
							//Do stuff to DOM here when no player is found..
							player_stats_container.removeClass('loading');
							player_general_information.html(htmlMsg);
							player_stats_total.html('');
							player_stats_recent.html('').addClass('on_first_load_css_fix');
						}

					}
					else{
						//Do stuff to DOM here when no player is found..
						player_stats_container.removeClass('loading');
						player_general_information.html(htmlMsg);
						player_stats_total.html('');
						player_stats_recent.html('').addClass('on_first_load_css_fix');;
					}
	
				},

				error: function(response) {
					console.log('error from the SearchPlayer AJAX call');
					//Show us an error when we get a failed AJAX call
					player_stats_container.removeClass('loading');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the ' + serverName + ' server at the moment, please try again! ;)</h1>');
					player_stats_total.html('');
					player_stats_recent.html('').addClass('on_first_load_css_fix');;
				},

				timeout: 3000

			});
	}

	//Declaring first promise as an object
	var AjaxPlayerTotalStats = {
		
		getPlayerTotalStats: function(id, serverAbbreviation) {
			//Declaring the promise
			var promise = $.Deferred();

			//Fetching our server value
			var server = server;

			var tankerId = id;
			//API for fetching the player stats
			var api_ver = '1.9'; /* 1.0 -> 1.1 */
			
			var apiFetchStatsUrl = 'http://api.worldoftanks' + serverAbbreviation + '/community/accounts/' + tankerId + '/api/' + api_ver + '/?source_token=' + source_token;

			
			$.ajax(httpShowPlayer, {
				dataType: 'json',
				method: 'post',
				data: {
					tanker_id: tankerId,
					url: apiFetchStatsUrl
				},

				success: function(response) {
					promise.resolve(response);
				},

				error: function(response) {
					console.log('error from getPlayerTotalStats');
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
					player_stats_total.html('');
					player_stats_recent.html('').addClass('on_first_load_css_fix');;
				}

			});

			//Returning the promise
			return promise;
		}

	}

	//Declaring the second promise as an object
	var AjaxPlayerPastStats = {
		getPlayerPastStats: function(id, server) {

			var promise = $.Deferred();

			var tankerId = id;

			var	apiFetchStatsUrl = 'http://dvstats.wargaming.net/userstats/2/stats/slice/?platform=android&server=' + server + '&account_id=' + tankerId + '&hours_ago=24&hours_ago=336';

			$.ajax(httpShowPlayer, {
				data: {
					tanker_id: tankerId,
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
					player_stats_total.html('');
				}
			});

			return promise;
		}

	}

	
	//This function gathers all ajax data and then fires it off to our plugins which will do the heavy lifting
	function CalculateStatsEngine(response1, response2, server, serverAbbreviation) {

		/*
		//Dev stuff below... could be removed later.
		console.log('Player Total Stats Object:');
		console.log(response1);
		console.log('Player Recent Stats Object:');
		console.log(response2);
		*/

		//First we modify our responses to work with our methods
		//Data for total stats section
		var responseData1 = response1.data;
		//Data for 24 hours section
		var responseData2 = response2.stats[0].stats;
		//Data for 2 weeks section
		var responseData3 = response2.stats[1].stats;



		/*
		//Dev stuff below... could be removed later.
		console.log('Player Total Stats Object:');
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

		
		//24 Hours ago Stats Plugins
		player_stats_recent.printRecentStatsHeader();
		player_stats_recent.battlesPlayedPast(responseData1, responseData2);
		player_stats_recent.averageWinRatePast(responseData1,responseData2);
		player_stats_recent.averageExperiencePast(responseData1, responseData2);
		player_stats_recent.averageDamagePast(responseData1, responseData2);
		player_stats_recent.averageCapPointsPast(responseData1, responseData2);
		player_stats_recent.averageDefPointsPast(responseData1, responseData2);
		player_stats_recent.averageTierPast(responseData1,responseData2);
		player_stats_recent.wn7Past(responseData1, responseData2);
		player_stats_recent.favoriteVehiclePast(responseData1, responseData2);
		
		//2 Weeks ago Stats Plugins
		player_stats_older.printOlderStatsHeader();
		player_stats_older.battlesPlayedPast(responseData1, responseData3);
		player_stats_older.averageWinRatePast(responseData1,responseData3);
		player_stats_older.averageExperiencePast(responseData1, responseData3);
		player_stats_older.averageDamagePast(responseData1, responseData3);
		player_stats_older.averageCapPointsPast(responseData1, responseData3);
		player_stats_older.averageDefPointsPast(responseData1, responseData3);
		player_stats_older.averageTierPast(responseData1,responseData3);
		player_stats_older.wn7Past(responseData1, responseData3);
		player_stats_older.favoriteVehiclePast(responseData1, responseData3);

		//Total Stats Plugins
		player_stats_total.printTotalStatsHeader();
		player_stats_total.totalBattlesPlayed(responseData1);
		player_stats_total.averageWinRate(responseData1);
		player_stats_total.averageExperience(responseData1);
		player_stats_total.averageDamage(responseData1);
		player_stats_total.averageCapPoints(responseData1);
		player_stats_total.averageDefPoints(responseData1);
		player_stats_total.averageTier(responseData1);
		player_stats_total.wn7Total(responseData1);
		player_stats_total.favoriteVehicleTotal(responseData1);
		

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