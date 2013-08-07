jQuery(document).ready(function(){
	
	/*
	*	Declaring some variables to access the label...
	*/
	var label = $("#search_player_form_section").find("label");
	var textField = $("#search_player_form_section").find("input[type=text]");
	var labelValue = label.text();
	
	//Hiding the label from start...
	label.hide();

	//Setting the value of the textfield equal to that of the label
	textField.val(labelValue);



	//Create some functions

	function RemoveName() {
		if(textField.val()=='Tanker Name'){
			textField.val('');
		}
	}

	function CheckField() {
		if(textField.val()==''){
			textField.val('Tanker Name');
		}

	}

	

	//Create some listeners..
	textField.on('blur', CheckField);
	textField.on('focus', RemoveName);


	//console.log('Ok this is awesome too..' +  labelValue);


});