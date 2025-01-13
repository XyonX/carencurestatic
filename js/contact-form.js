//function validateConsultantForm(){ 
//  	var name 	= document.myformconsultant.name.value;
//	var age 	= document.myformconsultant.UserAge.value;
//	var email 	= document.myformconsultant.email.value;
//	var country = document.myformconsultant.country.value;
//	var mobile 	= document.myformconsultant.mobile.value;
//	var message = document.myformconsultant.enquiry.value;
//    var page    = document.myformconsultant.page.value;
//    
//            
//   var data = $('#myformconsultant').serialize();
//   // alert(data);
//          
//
//	
//	jQuery("#consultantResponse").html('<img src="/images/loader.gif" width="20" height="20" alt="loader">');	
//	$.post("/includes/consultant-form-submit.php", {name : name, age:age, email: email, country: country, mobile: mobile, message: message, page: page, g_response: grecaptcha.getResponse(0)},
//	function(data, status){
//		if(data == 'Message sent!'){
//			jQuery("#consultantForm").hide();
//			jQuery("#consultantSuccessMessage").show();
//		}
//		jQuery("#consultantResponse").html(data);
//	});	
//	return false;
//}



function validateContactForm(){ 
	var name 	= document.myform.name.value;
	//var sex 	= document.myform.sex.value;
	var age 	= document.myform.age.value;
	var email 	= document.myform.email.value;
	//var address = document.myform.address.value;
	//var city 	= document.myform.city.value;
	var country = document.myform.country.value;
	//var phone 	= document.myform.phone.value;
	var mobile 	= document.myform.mobile.value;
	var message = document.myform.enquiry.value;
    var page = document.myform.page.value;
	//var hospitalsurgeon = document.myform.hospitalsurgeon.value;
	//var personal = document.myform.personal.value;
	
	jQuery("#contactResponse").html('<img src="/images/loader.gif" width="20" height="20" alt="loader">');	
	$.post("/includes/contact-form-submit.php", { name: name, age: age, email: email, country: country, mobile: mobile, message: message, page: page, g_response: grecaptcha.getResponse(0) },
	function(data, status){
		if(data == 'Message sent!'){
			jQuery("#contactForm").hide();
			jQuery("#contactSuccessMessage").show();
		}
		jQuery("#contactResponse").html(data);
	});	
	return false;
}



