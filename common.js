function isValidEmailId(obj, name)

{

   obj.value=trim(obj.value);

   if (obj.value=='')

   {

	   alert('"'  + name + '" can not be blank. Please enter it.' );

	   obj.focus();

	   return false;

   }

   

   if (! isValidEmail(obj.value))

   {

      alert("Invalid e-Mail-Id entered.");

	  obj.focus();

	  return false;

   }

   return true;

}



function isValidEmail(elm)

{

 if(elm.indexOf('@',1) ==-1)

 	return (false);

 

 if(elm.indexOf('.',1) ==-1)

 	return (false);

 

 return true;

}



function isValidDate(strDate)

{

   var Llen = strDate.length;

   if (Llen != 8)

     return false;

   var LYear= strDate.substr(0,4);

   var Lmon= strDate.substr(4,2);

   var Lday= strDate.substr(6,2);

   if (LYear <=1900 && LYear >=3000)

      return false;

   if( Lday ==31 && ( Lmon ==2 || Lmon ==4 || Lmon ==6 || Lmon ==9 || Lmon ==11))

     return false;

   if( Lday >= 30 && ( Lmon ==2))

     return false;

	if( Lday ==29  && ( Lmon ==2) && ( LYear%4 != 0))

     return false;

	return true;

 }



function trim(p_str)

{

   var i=0;

   while(1)

   {

     if ( p_str.charAt(0)==" " || p_str.charAt(0)=="\n" || p_str.charAt(0)=="\r") 

       p_str = p_str.substr(i+1);

     else

       break;

    } 

   

   while(1)

   {

     i=p_str.length;

     if ( p_str.charAt(i-1)==" " || p_str.charAt(i-1)=="\n" || p_str.charAt(i-1)=="\r") 

       p_str=p_str.substr(0,i-1);

     else

       break;

   }

  return p_str; 

}// end of fun_trim

 

 function replaceCR(p_str,p_char)

 {

   var len=p_str.length;

   var lstr=""; 

   var j=0;

   for(i=0;i<len;i++)

   {

      ch=p_str.substr(i,1)

	  if(ch=="\r" || ch=="\n")

	  {

	   ch=p_char;

	   j=j+1;

	  }

	  else

	   j=0;



	  if(j<2)

  	   lstr=lstr+ch;

   }

   return lstr;

 }



 function replaceSQ2DQ(p_str)

 {

   var len=p_str.length;

   var lstr=""; 

   for(i=0;i<len;i++)

   {

      ch=p_str.substr(i,1)

	  if(ch=='"')

	  {

	   ch="''";

	  }

  	  lstr=lstr+ch;

   }

   return lstr;

 }



//Returns no. of words in a string.,

 function getWordCount(p_str)

 {

    var wordcount=0;

    var in_word=false;

	for (i=0; i<p_str.length;i++)

	{

	  ch=p_str.charAt(i);

      if (ch=="\r" || ch=="\n" || ch==" " || ch=="/" || ch=="\\" || ch=="-")

        in_word=false;

	  else

      {

        if (in_word==false)

        {

          in_word=true;

          wordcount++;         

        }

      }

	}

	return wordcount; 

 } //End  getWordCount



function isEmpty(obj, str)

{

  if ( (obj.type=="text") || (obj.type=="password") || (obj.type=="textarea") )

  {

     obj.value=trim(obj.value)

     if(obj.value=="")

     {

	   alert('"' + str + '" can not be blank. Please enter it.');

	   obj.focus();

	   return true;

     }

  }



  if (obj.type=="select-one")

  {

	  if (obj.selectedIndex==0)

	  {

		  alert('"' + str + '" is mandatory field. Please select it.');

		  obj.focus();

		  obj.select;

		  return true;

	  }

  }

  return false;

}





function hasDoubleQuote(p_str)

{

   var len=p_str.length;

   for(i=0;i<len;i++)

   {

      ch=p_str.substr(i,1)

	  if(ch=='"')

	   return true;	   

   }

   return false;

}



function breakWordBySpace(p_str, break_len)

{

    var wordcount=0;

    var dumy_text="";

    var in_word=false;

    var ch_in_word;

    break_len++;

	for (i=0; i<p_str.length;i++)

	{

	     ch=p_str.charAt(i);

         if (ch=="\r" || ch=="\n" || ch==" " || ch=="/" || ch=="\\" || ch=="-")

               in_word=false;

	     else

         {

              if (in_word==false)

              {

                   ch_in_word=0;

                   in_word=true;

                   wordcount++;

              }

             if(ch !="'" && ch != "\"")

                   ch_in_word++;

         }

         if(dumy_text=="")

             dumy_text=ch;

         else

         {

               if(ch_in_word==break_len)

               {

                    dumy_text=dumy_text + " ";

                    ch_in_word=1;

              }

              dumy_text=dumy_text+ch;

         }

	}

	p_str=dumy_text;

	return p_str; 

} //End  getWordCount



function breakWord(p_str, break_len)

{

    var wordcount=0;

    var dumy_text="";

    var in_word=false;

    var ch_in_word;

    break_len++;

	for (i=0; i<p_str.length;i++)

	{

	     ch=p_str.charAt(i);

         if (ch=="\r" || ch=="\n" || ch==" " || ch=="/" || ch=="\\" || ch=="-")

               in_word=false;

	     else

         {

              if (in_word==false)

              {

                   ch_in_word=0;

                   in_word=true;

                   wordcount++;

              }

             if(ch !="'" && ch != "\"")

                   ch_in_word++;

         }

         if(dumy_text=="")

             dumy_text=ch;

         else

         {

               if(ch_in_word==break_len)

               {

                    dumy_text=dumy_text+"\n";

                    ch_in_word=1;

              }

              dumy_text=dumy_text+ch;

         }

	}

	p_str=dumy_text;

	return p_str; 

} //End  getWordCount