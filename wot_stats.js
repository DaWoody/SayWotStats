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
	var stats_button = $("#submit_btn");
			
	
	/*
	*	Some global variables coming from functions
	*/

	var test = 'hello';



	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php';
	var httpShowPlayer = 'wot_show_player_stats.php';



	/*
	*	Fetch Player Statistics Function
	*/
	function FetchPlayerStatistics(id) {

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

				//First we clear our DOM from previous searches
				player_stats.html('');

				/*
				*	Call our different plugins here below
				*/

				//Call our Calculate Total Time Played function, calles our plugin file, wot_stats_functions.js
				player_stats.calculateTotalTimePlayed(response);
				player_stats.averageWinRate(response);
				player_stats.getAccountCreationTime(response);

			},

			error: function(response) {
				player_stats.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
			}, 

			timeout: 3000

		});
	}


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
					stats_button.addClass('disabled');
					stats_button.disabled = true;

				},

				complete: function() {
					player_stats.removeClass('loading');
					stats_button.removeClass('disabled');
					stats_button.disabled = false;
				},

				//contentType: 'application/json',
				success: function(response) {
					var status = response.status;
					
					//console.log(response);
					//The error message we will print out if there is something wrong with the search
					var htmlMsg = '<div><h1 class="player_stats_result">Ops the magic kitten did not find that Tanker, please try again ;)..</h1></div>';	

					
					if(status==="ok") {
						//Since we know the status is ok, we check if the player exist.
						var player_exist = response.data.filtered_count;
						
						if(player_exist===1){

							//Get the id from the data, since now the player do exist.
							var id = response.data.items[0].id;	
							//And call our second Ajax call
							FetchPlayerStatistics(id);
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
					player_stats.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
				},

				timeout: 3000

			});
	}

	
	/*
	*	Search Player Listener
	*/
	$('#search_player_form_section').find('form').on('submit', SearchPlayer);


});