 /* Sticky Note Script v2.0
* Created: Feb 7th, 2011 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

 
jQuery.noConflict()

function stickynote21(setting){
	var thisobj=this
	this.cssfixedsupport=!document.all || document.all && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //check for CSS fixed support
	this.reposevtstring='resize.' + setting.content.divid + (!this.cssfixedsupport? ' scroll.' + setting.content.divid : '')
	this.s=jQuery.extend({content:{divid:null, source:'inline'}, pos:['center', 'center'], hidebox:0, showfrequency:'always', fixed:false, fade:true}, setting)
	jQuery(function($){ //on document.ready
		if (setting.content.source=="inline")
			thisobj.init($, setting)
		else
			thisobj.loaddata($, setting)
	})
}

stickynote21.prototype={
	
	positionnote:function($, x, y){
		var $note=this.$note
		var windowmeasure={w:$(window).width(), h:$(window).height(), left:$(document).scrollLeft(), top:$(document).scrollTop()} //get various window measurements
		var notedimensions={w:$note.outerWidth(), h:$note.outerHeight()}
		var xpos=(x=="center")? windowmeasure.w/2-notedimensions.w/1 : (x=="left")?0 : (x=="right")? windowmeasure.w-notedimensions.w-10 : parseInt(x)
		var ypos=(y=="center")? windowmeasure.h/2-notedimensions.h/2 : (y=="top")?30 : (y=="bottom")? windowmeasure.h-notedimensions.h-0 : parseInt(y)
		xpos=(this.cssfixedsupport && this.s.fixed)? xpos : xpos+windowmeasure.left 
		ypos=(this.cssfixedsupport && this.s.fixed)? ypos : ypos+windowmeasure.top
		$note.css({left:xpos, top:ypos})
	},

	showhidenote:function(action, callback){
		var $=jQuery
		var thisobj=this
		if (action=="show"){
			this.$note.css('zIndex', stickynote21.startingzindex++)
			this.positionnote($, this.s.pos[0], this.s.pos[1])
			if (this.s.fixed){
				$(window).bind(this.reposevtstring, function(){thisobj.positionnote(jQuery, thisobj.s.pos[0], thisobj.s.pos[1])})
			}
			this.$note.fadeIn(this.s.fade? 500 : 0, function(){
				thisobj.positionnote($, thisobj.s.pos[0], thisobj.s.pos[1])
				if (typeof callback=="function")
					callback()
				if (document.all && this.style && this.style.removeAttribute)
					this.style.removeAttribute('filter') //fix IE clearType problem
			})
		}
		else if (action=="hide"){
			this.$note.hide()
			if (this.s.fixed){
				$(window).unbind(this.reposevtstring)
			}
		}
	},

	loaddata:function($, setting){
		var thisobj=this
		var url=setting.content.source
		var ajaxfriendlyurl=url.replace(/^http:\/\/[^\/]+\//i, "http://"+window.location.hostname+"/") 
		$.ajax({
			url: ajaxfriendlyurl, //path to external content
			async: true,
			error:function(ajaxrequest, e){
				alert('Error fetching Ajax content.\nError Status: '+e.status+'\nServer Response: '+ajaxrequest.responseText)
			},
			success:function(content){
				$(document.body).append(content)
				thisobj.init($, setting)
			}
		})
	},

	init:function($, setting){
		var thisobj=this
		this.$note=$('#'+setting.content.divid)
		if (this.s.fixed && this.cssfixedsupport){
			this.$note.css({position:'absolute'})
		}
		this.$note.css({visibility:'visible', display:'none'})
		var showfrequency=this.s.showfrequency
		var randomnumber=Math.floor(Math.random()*showfrequency)
		if ((showfrequency=="session" && !stickynote21.routines.getCookie(this.s.divid+"_persist")) || showfrequency=="always" || (!isNaN(randomnumber) && randomnumber==0)){
			if (showfrequency=="session")
				stickynote21.routines.setCookie(this.s.divid+"_persist", 1)
			this.showhidenote("show", this.s.hidebox>0? function(){setTimeout(function(){thisobj.showhidenote("hide")}, thisobj.s.hidebox*1000)} : null)
		}
	}
}

stickynote21.startingzindex=100

stickynote21.routines={

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]*", "i"); //construct RE to search for target name/value pair
		return (document.cookie.match(re))? document.cookie.match(re)[0].split("=")[1] : null //return cookie value if found or null
	},
	
	setCookie:function(name, value, days){
		var expirestr=''
		if (typeof days!="undefined") //if set persistent cookie
			expirestr="; expires="+expireDate.setDate(new Date().getDate()+days).toGMTString()
		document.cookie = name+"="+value+"; path=/"+expirestr
	}
}