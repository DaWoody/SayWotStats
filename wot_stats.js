/*
*	Description: 	The jQuery engine for the site WOT-Stats
*	Author: 		Johan "DaWoody" Wedfelt 
*	AuthorURL:  	https://DaWoody@github.org
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
	//The DOM elements to manipulate
	var player_stats = $("#player_stats");
			
	
	/*
	*	Some global variables, needed to compare data between the different AJAX calls
	*/
	//var responseObject1, responseObject2 = false;


	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php';
	var httpShowPlayer = 'wot_show_player_stats.php';



	


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

			$.ajax(httpFindPlayer, {
				
				dataType: 'json',
				method: 'post',
				data: {
					tanker_name: tankerName,
					url: apiFetchNameUrl
				},
				beforeSend: function() {
					player_stats.addClass('loading');
				},

				complete: function() {
					player_stats.removeClass('loading');
				},

				//contentType: 'application/json',
				success: function(response) {

					var status = response.status;

					//The error message we will print out if there is something wrong with the search
					var htmlMsg = '<div><h1 class="player_stats_result">Ops the magic!! kitten did not find that Tanker, please try again ;)..</h1></div>';	

					
					if(status==="ok") {
						//Since we know the status is ok, we check if the player exist.
						var player_exist = response.data.filtered_count;
						
						if(player_exist>0){
							//Get the id from the data, since now the player do exist.
							var id = response.data.items[0].id;	

							//Declaring our promises.
							var playerTotalStatsPromise = AjaxPlayerTotalStats.fetchPlayerTotalStats(id);
							var playerPastStatsPromise = AjaxPlayerPastStats.getPastStats(id); 

							$.when(playerTotalStatsPromise,playerPastStatsPromise).done(function(response1, response2){
								//Now lets send the collected AJAX responses to our engine to calculate stats.
								CalculateStatsEngine(response1, response2);
							});
			
						}
						else {
							//Do stuff to DOM here when no player is found..
							player_stats.html(htmlMsg);
						}

					}
					else{
						//Do stuff to DOM here when no player is found..
						player_stats.html(htmlMsg);
					}
	
				},

				error: function(response) {
					//Show us an error when we get a failed AJAX call
					player_stats.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
				},

				timeout: 3000

			});
	}


	//Declaring first promise outer function
	var AjaxPlayerTotalStats = {
		
		fetchPlayerTotalStats: function(id) {
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

				beforeSend: function() {
					
				},

				complete: function() {
					
				},

				success: function(response) {
					promise.resolve(response);
				},

				error: function(response) {
					player_stats.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
				}, 

				timeout: 3000

			});

			//Returning the promise
			return promise;
		}

	}
	



	//Declaring a promise
	var AjaxPlayerPastStats = {
		getPastStats: function(id) {

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
					console.log('Ok we executed the GetPastStats function..');
					//Do stuff here

					//var test = responseObject1;
					//console.log('Ok teh status for object 1, called from function2' + test);
					//player_stats.showAverageDamagePast24(response);

				},

				error: function(response){
					//Do error handling here..
					console.log('Getting stats from the past went wrong!');
				}
			});

			return promise;
		}

	}

	
	//This function gathers all ajax data and then fires it off to our plugins which will do the heavy lifting
	function CalculateStatsEngine(response1, response2) {

		//var test1 = response1.status;
		//var test2 = response2.status;
		//DO stuff here
		//console.log('Ok response 1 status is: ' + test1 + 'and response2  status_code is: ' + test2);
	
		//First we clear our DOM from previous searches
		player_stats.html('');

		//Call our different plugins here below

		//Total Stats Plugins
		player_stats.playerName(response1);
		player_stats.calculateTotalTimePlayed(response1);
		player_stats.averageWinRate(response1);
		player_stats.averageExperience(response1);
		player_stats.averageDamage(response1);
		player_stats.totalDamage(response1);
		player_stats.showHitPercentage(response1);

		//General Plugins
		player_stats.showLastUpdated(response1);
		player_stats.getAccountCreationTime(response1);
		player_stats.showClan(response1);
				
	}
	
	/*
	*	Search Player Listener
	*/
	$('#search_player_form_section').find('form').on('submit', SearchPlayer);


});