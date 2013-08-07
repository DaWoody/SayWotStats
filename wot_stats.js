jQuery(document).ready(function(){

	
	/*
	http://api.worldoftanks.eu/community/accounts/api/1.1/?source_token=WG-WoT_Assistant-1.3.2&search=DaWoody80&offset=0&limit=1
	*/


	/*
	*	Some global variables
	*/
	var source_token 	= 	'WG-WoT_Assistant-1.4.1';
	//The DOM elements to manipulate
	var player_search = $("#player_search");
	var player_time = $("#player_time");
	var stats_button = $("#submit_btn");
			
	
	//Building the API http request, internally
	var httpFindPlayer = 'wot_find_player.php';
	var httpShowPlayer = 'wot_show_player_stats.php';



	/*
	*	Calculate Total Time Played WOT
	*/

	$.fn.calculateTotalTimePlayed = function(battles) {

		/*
		*	Based on an average battle time around 5 minutes..
		*/
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

		//Do stuff here
		//console.log('Has devoted days:' + timeInDaysRounded + ', hours:' + timeInHoursRounded + ', and ' + timeInMinutes + 'minutes of his life playing WOT ;)');
		var timeContainer = $('<h1></h1>');
		timeContainer.append('Has devoted ' + timeInDaysRounded + ' days.. '+ timeInHoursRounded + ' hours.. and ' + timeInMinutes + 'minutes of his life playing WOT ;)');

		//console.log(timeContainer);
		player_time.html(timeContainer);

	}



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

				/*
				*	Getting the account creation time
				*/
				var timeCreatedUnix = response.data.created_at;

				//Creating the Date object
				var timeCreatedUTC = new Date();
				
				//Making the time display in UTC
				timeCreatedUTC.setTime(timeCreatedUnix);

				//
				var amountOfBattlesPlayed = response.data.summary.battles_count;

				//Call our Calculate Total Time Played function, this also writes to the DOM
				player_search.calculateTotalTimePlayed(amountOfBattlesPlayed);	

				

				//Get the tankers name and id
				//var name = response.data.name;
				//var id = response.data.items[0].id;

				//var div_player = '<div><h1 class="player_search_result" data-id=' + id + '>' + name +'</h1></div>';
				var stats_player = response.data.ratings.battle_avg_performance.value;
				//Do cool stuff here when we get the player stats...
				player_search.html('<h1>Right now.. the Average Battle Perfomance..:' + stats_player + '</h1>');

				console.log('Created at:' + timeCreatedUTC);
			},

			error: function(response) {
				player_search.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
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
					player_search.addClass('loading');
					stats_button.addClass('disabled');
					stats_button.disabled = true;

				},

				complete: function() {
					player_search.removeClass('loading');
					stats_button.removeClass('disabled');
					stats_button.disabled = false;
				},

				//contentType: 'application/json',
				success: function(response) {
					var status = response.status;
					
					if(status=="ok") {
						//Do stuff here if ok. Plan is to now fetch the data from the other API, calling the next function.


							
						//Get the tankers name and id
						//var name = response.data.items[0].name;
						var id = response.data.items[0].id;

						//var div_player = '<div><h1 class="player_search_result" data-id=' + id + '>' + name +'</h1></div>';
						
						/*
						*	Now we are gonna fetch the second set of data from the API
						*/	
						FetchPlayerStatistics(id);

					}
					else{
						//Do stuff to DOM here when no player is found..
						player_search.html('<div><h1 class="player_search_result">Ops the magic kitten did not find that Tanker, please try again ;)..</h1></div>');
					}
					
			
				},

				error: function(response) {
					player_search.html('<h1>Ops seems like some gremlins are messing with the server at the moment, please try again! ;)</h1>');
				},

				timeout: 3000

			});
	}

	
	/*
	*	Search Player Listener
	*/
	$('#search_player_form_section').find('form').on('submit', SearchPlayer);


});