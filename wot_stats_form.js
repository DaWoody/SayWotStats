/*
*	Description: 	Some functions to handle the visual/interactive part of forms and other elements for the site, Say Wot? - stats (http://saywotstats.net)
*	Author: 		Johan "DaWoody" Wedfelt
*	Author 			URL: https://github.com/DaWoody
*	License:   		GNU General Public License, version 3(GPL-3.0) (http://opensource.org/licenses/GPL-3.0)
*	
*
*/

jQuery(document).ready(function(){
	
	/*
	*	Declaring some variables to access the label...
	*/
	var label = $("#search_player_form_section").find("label");
	var about = $("#about");
	var about_link = $("#about_link");
	var textField = $("#search_player_form_section").find("input[type=text]");
	var labelValue = label.text();
	var version_link = $('#wot_stats_version_link');
	var version_info = $('#wot_stats_version_info');
	
	//Hiding the label from start and the info box
	label.hide();
	about.hide();
	version_info.hide();
	//Setting the value of the textfield equal to that of the label
	textField.val(labelValue);
	

	wotStatsVersionUrlXml = 'xml/wot_stats_version_info.xml';

	var initWotStats = {
		getVersion: function() {
					$.ajax(wotStatsVersionUrlXml,{
						dataType: 'xml',
						success: function(data) {
							//lets traverse through the data and build the DOM
							var versionTitle = $(data).find('version_title').text();
							var versionInfoHeader = $(data).find('version_info_title').text();
							var versionInfo = $(data).find('version_info').text();
							var dev_blog_url = $(data).find('dev_blog_url').text();

							console.log(versionInfoHeader);

							//Print it to the DOM
							version_link.text(versionTitle);
							version_info.html('<h3>' + versionInfoHeader + ' ' + versionTitle + '</h3>');
							version_info.append(versionInfo);
							version_info.append('Read more at the <a href="' + dev_blog_url + '">development blog</a>');
						},
						error: function(data) {
							console.log('hhmm ok something went wrong..');
						}
					});
		}	

	}
		
	


	//Create some functions
	function RemoveName() {
		textField.addClass('highlighted');
		if(textField.val()=='Tanker Name'){
			textField.val('');
		}
	}

	function CheckField() {
		if(textField.val()==''){
			textField.removeClass('highlighted');
			textField.val('Tanker Name');
		}

	}

	function showAbout() {
		about.toggle();
	}

	function showVersionInfo() {
		version_info.toggle();
	}

	//Create some listeners for our 
	textField.on('blur', CheckField);
	textField.on('focus', RemoveName);
	about_link.on('click', showAbout);
	version_link.on('click', showVersionInfo);



	//Init our form listener
	initWotStats.getVersion();


});