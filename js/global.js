function displayMsg(msg_err){msg_err="Please provide detail(s) mentioned below for processing your request:\n\n"+msg_err;alert(msg_err)}
function validateEmptyName(obj){obj.value=trim(obj.value);if(trim(obj.value).length<=0){return false}return true}
function validatePhone(obj){var objRegExp=/^([0-9\-\(\)\+\s]+)$/;if(!objRegExp.test(obj.value)){return false}else{return true}}
function validateName(obj){var objRegExp=/^([a-zA-Z\s\.']+)$/;if(!objRegExp.test(obj.value)){return false}return true}
function validateZip(obj){var objRegExp=/^([0-9\-\(\)\+\s]+)$/;if(!objRegExp.test(obj.value)){return false}return true}
function validateEmail(obj){var objRegExp=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;if(!objRegExp.test(obj.value)){return false}return true}
function checkRegExp(obj,expression){var objRegExp=expression;if(!expression.test(obj.value)){return false}else{return true}}
function checkExp(exp,obj,message){obj.value=trim(obj.value);if(!exp.exec(obj.value)){alert(message);obj.focus();return false}return true}
function trim(value){var exp=/^(\s*)(\S*)(\s*$)/;if(exp.test(value))value=value.replace(exp,'$2');return value}