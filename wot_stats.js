/*
*	Description: 	The jQuery engine WoodyWotStats for the site WOT-Stats. Utilizing the unoffical WOT-API, (https://gist.github.com/bartku/4271798).
*					This engine utilizes a different set of methods involving calculations on/and extracting data from the objects returned from the API. 					
*	Author: 		Johan "DaWoody" Wedfelt 
*	AuthorURL:  	https://github.com/DaWoody
*
*
*
*/
jQuery(document).ready(function(){
	
	/*
	http://api.worldoftanks.eu/community/accounts/api/1.1/?source_token=WG-WoT_Assistant-1.3.2&search=DaWoody80&offset=0&limit=1
	*/


	/*
	*	Some global variables
	*/
	var source_token 	= 	'WG-WoT_Assistant-1.4.1';
	//The DOM elements to manipulate, can be changed to your needs.
	var player_stats_container = $("#player_stats_container");
	var player_general_information = $("#player_general_information");
	var player_stats_total = $("#total_stats");
	var player_stats_recent = $("#recent_stats");
	

	
	/*
	*	Some global variables, needed to compare data between the different AJAX calls
	*/
	//var responseObject1, responseObject2 = false;


	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php';
	var httpShowPlayer = 'wot_show_player_stats.php';


	/*
	*	Do some css fixes on first page load
	*/
	player_stats_recent.addClass('on_first_load_css_fix');


	/*
	*	Search Player Function
	*/
	function SearchPlayer(event) {
		event.preventDefault();

			//API for fetching the player Name
			var api_ver = '1.1'; /* 1.0 -> 1.1 */

			//Fetching form data, needs to be updated every time the submit button is pressed...
			var tankerName = $('#search_player_form_section').find('input[type=text]').val();
			var apiFetchNameUrl	= 'http://api.worldoftanks.eu/community/accounts/api/'+ api_ver +'/?source_token='+ source_token +'&search='+ tankerName +'&offset=0&limit=1';


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
					var htmlMsg = '<h1>Ops the magic kitten did not find that Tanker, please try again ;)..</h1>';	

					
					if(status==="ok") {
						//Since we know the status is ok, we check if the player exist.
						var player_exist = response.data.filtered_count;
						
						if(player_exist>0){
							//Get the id from the data, since now the player do exist.
							var id = response.data.items[0].id;	

							//Declaring our promises.
							var playerTotalStatsPromise = AjaxPlayerTotalStats.getPlayerTotalStats(id);
							var playerPastStatsPromise = AjaxPlayerPastStats.getPlayerPastStats(id); 

							$.when(playerTotalStatsPromise,playerPastStatsPromise).done(function(response1, response2){
								//Now lets send the collected AJAX responses to our engine to calculate stats.
								CalculateStatsEngine(response1, response2);
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
					player_general_information.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
					player_stats_total.html('');
					player_stats_recent.html('').addClass('on_first_load_css_fix');;
				},

				timeout: 3000

			});
	}


	//Declaring first promise outer function
	var AjaxPlayerTotalStats = {
		
		getPlayerTotalStats: function(id) {
			//Declaring the promise
			var promise = $.Deferred();

			var tankerId = id;
			//API for fetching the player stats
			var api_ver = '1.9'; /* 1.0 -> 1.1 */
			
			var apiFetchStatsUrl = 'http://api.worldoftanks.eu/community/accounts/' + tankerId + '/api/' + api_ver + '/?source_token=' + source_token;

			
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
	



	//Declaring a promise
	var AjaxPlayerPastStats = {
		getPlayerPastStats: function(id) {

			var promise = $.Deferred();

			var tankerId = id;

			var	apiFetchStatsUrl = 'http://dvstats.wargaming.net/userstats/2/stats/slice/?platform=android&server=eu&account_id=' + tankerId + '&hours_ago=24';

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
	function CalculateStatsEngine(response1, response2) {

		
		//DO stuff here, right now we are printing out data to the console so we its easy to track how create functions..
		console.log('Player Total Stats Object:');
		console.log(response1);
		console.log('Player Recent Stats Object:');
		console.log(response2);
		

		//First we clear our DOM from previous searches
		player_general_information.html('');
		player_stats_recent.html('');
		player_stats_total.html('');

		//Call our different plugins here below

		//Recent Stats Plugins
		player_stats_recent.printRecentStatsHeader();
		player_stats_recent.battlesPlayedPast24(response1, response2);
		player_stats_recent.averageWinRatePast24(response1,response2);
		player_stats_recent.averageExperiencePast24(response1, response2);
		player_stats_recent.averageDamagePast24(response1, response2);
		player_stats_recent.averageTierPast24(response1,response2);
		player_stats_recent.favoriteVehiclePast24(response1, response2);
		
		
		//Total Stats Plugins
		player_stats_total.printTotalStatsHeader();
		player_stats_total.totalBattlesPlayed(response1);
		player_stats_total.averageWinRate(response1);
		player_stats_total.averageExperience(response1);
		player_stats_total.averageDamage(response1);
		player_stats_total.averageTier(response1);
		player_stats_total.favoriteVehicleTotal(response1);
		//player_stats_total.hitPercentage(response1);


		//General Information Plugins
		player_general_information.playerName(response1);
		player_general_information.clan(response1);
		//player_general_information.calculateTotalTimePlayed(response1);
		player_general_information.lastUpdated(response1);
		
		
		//player_stats_container.getAccountCreationTime(response1);
		
				
	}
	
	/*
	*	Search Player Listener
	*/
	$('#search_player_form_section').find('form').on('submit', SearchPlayer);


});