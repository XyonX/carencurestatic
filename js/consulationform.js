//function validate(){var frmObj=document.formname;var msg_err='';if(typeof(frmObj.name)!="undefined"){if(msg_err==''){frmObj.name.focus()}if(!validateEmptyName(frmObj.name)){msg_err=msg_err+"Enter Name."+'\n'}else if(!validateName(frmObj.name)){msg_err=msg_err+"Enter Valid Name."+'\n'}}if(typeof(frmObj.email)!="undefined"){if(msg_err==''){frmObj.email.focus()}if(!validateEmptyName(frmObj.email)){msg_err=msg_err+"Enter Email."+'\n'}else if(!validateEmail(frmObj.email)){msg_err=msg_err+"Enter Valid Email"+'\n'}}if(typeof(frmObj.age)!="undefined"){if(msg_err==''){frmObj.age.focus()}if(!validateEmptyName(frmObj.age)){msg_err=msg_err+"Enter Age."+'\n'}else if(isNaN(frmObj.age.value)){msg_err=msg_err+"Enter Valid Age"+'\n'}}if(typeof(frmObj.mobile)!="undefined"){if(msg_err==''){frmObj.mobile.focus()}if(!validateEmptyName(frmObj.mobile)){msg_err=msg_err+"Enter Telephone(Mobile)."+'\n'}else if(!validatePhone(frmObj.mobile)){msg_err=msg_err+"Enter Valid Telephone(Mobile)"+'\n'}}if(typeof(frmObj.country)!="undefined"){if(msg_err==''){frmObj.country.focus()}if(!validateEmptyName(frmObj.country)){msg_err=msg_err+"Select Country."+'\n'}}if(typeof(frmObj.message)!="undefined"){if(msg_err==''){frmObj.message.focus()}if(!validateEmptyName(frmObj.message)){msg_err=msg_err+"Enter Message."+'\n'}}if(msg_err.length>0){displayMsg(msg_err);return false}return true}

function validate(){
var a=document.forms["formname"]["name"].value;
var b=document.forms["formname"]["email"].value;
var c=document.forms["formname"]["age"].value;
var d=document.forms["formname"]["mobile"].value;
var e=document.forms["formname"]["country"].value;
var f=document.forms["formname"]["message"].value;
var g=document.forms["formname"]["captcha_code"].value;
    
if(a=="" || a==null)
{
alert("Name Can not Be Blank");
document.formname.name.focus();
return false;
}

if(b=="" || b==null)
{
alert("Email Address Can not be Blank");
return false;
}
else
{
var atpos=b.indexOf("@");
var dotpos=b.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=b.length)
  {
  alert("Invalid E-mail Address Please Re-Enter");
  document.formname.email.focus();
  return false;
  }
  }
   if(c=="" || c==null || c <= 1 || c >= 99)
{
alert("Please Enter Valid Age");
document.formname.age.focus();
return false;
}
 else if(isNaN(c)){alert("Enter Valid Age");
document.formname.age.focus();
return false;}

  d = document.forms['formname']['mobile'].value;
  if(d=="" || d==null || d.length < 10 || d.length > 15 || isNaN(d))
{
alert("Mobile No. is not valid, Please Enter 10 to 15 Digit Mobile No.");
document.formname.mobile.focus();
return false;
}
    
if( document.formname.country.value == "-1" )
    {
      alert( "Please Select Your Country!" );
      return false;
    }	    
   if(f=="" || f==null)
{
alert("Enquiry Can not Be Blank");
document.formname.message.focus();
return false;
}
 if(g=="" || g==null)
{
alert("Captcha Can not Be Blank");
document.formname.captcha_code.focus();
return false;
}

if(document.formname.ran.value!=document.formname.captcha_code.value)
{
document.getElementById("error").innerHTML="Captcha Not Matched!";
document.formname.captcha_code.focus();
return false;
}
return true;    
    
}