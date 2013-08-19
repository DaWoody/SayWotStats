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
	
	//Hiding the label from start...
	label.hide();
	about.hide();
	//Setting the value of the textfield equal to that of the label
	textField.val(labelValue);



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

	//Create some listeners..
	textField.on('blur', CheckField);
	textField.on('focus', RemoveName);
	about_link.on('click', showAbout);



});