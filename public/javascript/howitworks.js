$(document).ready(function(){

  console.log(loaded!);

showHowItWorks:function(n){var m=400;
this._hideIfOutOfViewport=this.hideIfOutOfViewport.bind(this);
n.preventDefault();
Airbnb.Tracking.logEvent({event_name:"homepage",event_data:{section:"hero",action:"click",target:"how_it_works_button"}});
this.els.hiwSection.addClass("how-it-works--with-images");
window.scrollTo(0,0);
this.els.hiwSection.animate({top:this.els.hiwShiftHeight+"px"},m);
this.els.shiftWithHiw.animate({marginTop:this.els.shiftHeight+"px"},m);
$(window).on("scroll",this._hideIfOutOfViewport);
this.els.hiwSection.attr("aria-hidden",false);
this.els.hiwSection.get(0).tabIndex=-1;
this.els.hiwSection.get(0).focus()
},hideIfOutOfViewport:function(){if($(window).scrollTop()>this.els.shiftHeight){Airbnb.Tracking.logEvent({event_name:"homepage",event_data:{section:"how_it_works",action:"scroll_close",target:"self"}});
this.hideHowItWorks(0);
return window.scrollTo(0,0)
}},hideHowItWorks:function(m){this.els.shiftWithHiw.animate({marginTop:"0"},m);
this.els.hiwSection.animate({top:"-="+(this.els.shiftHeight+1)+"px"},m);
$(window).off("scroll",this._hideIfOutOfViewport);
this._hideIfOutOfViewport=null;
this.els.hiwSection.attr("aria-hidden",true)
}

};