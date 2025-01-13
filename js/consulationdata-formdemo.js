function validateConsultantFormDemo(){ 

  	var name 	= document.formname.name.value;
	var age 	= document.formname.age.value;
	var email 	= document.formname.email.value;
	var country = document.formname.country.value;
	var mobile 	= document.formname.mobile.value;
	var message = document.formname.message.value;
    var page    = document.formname.page.value;

            
   var data = $('#formname').serialize();
   // alert(data);
          

	
	jQuery("#consultantResponseDemo").html('<img src="/images/loader.gif" width="20" height="20" alt="loader">');	
	$.post("/includes/consultant-form-submit.php", {name : name, age:age, email: email, country: country, mobile: mobile, message: message, page: page, g_response: grecaptcha.getResponse(0)},
	function(data, status){
		if(data == 'Message sent!'){
			jQuery("#consultantFormDemo").hide();
			jQuery("#consultantSuccessMessageDemo").show();
		}
		jQuery("#consultantResponseDemo").html(data);
	});	
	return false;
}