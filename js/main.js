;(function($,undefined) {
/*-----------------------------------------------------------------------------------*/


/*
	Navigation togle
*/
$("#main-nav-trigger").on("click",toggleNavigaton);
$("#overlay").on("click",hidePopup);

function toggleNavigaton(){
	$(this).toggleClass("active");
	if ($(this).hasClass("active")){
		$("#main-nav").removeClass("hidden");
		$("#overlay").removeClass("hidden");
	} else {
		$("#main-nav").addClass("hidden");
		$("#overlay").addClass("hidden");
	}
	return false;
}

function hidePopup(){
	if($('#main-nav-trigger').length && $("#main-nav").length) {
		$('#main-nav-trigger').removeClass("active");
		$("#main-nav").addClass("hidden");
	}
	$("#overlay").addClass("hidden");
	return false;
}

/*
	Calculate #overlay height on window resize
*/
$(window).resize(function(){
	$("#overlay").height($("#layout").height());
}).trigger('resize');


/*
	"More" button trigger
*/
$('.speaker-content .speaker-full-content').removeClass('collapsed').hide();
$('.speaker-content .more-link').on('click', toggleSpeakerFullContent);

function toggleSpeakerFullContent (e) {
	$(this).toggleClass('active');
	$(this).closest('.speaker-content').find('.speaker-brief-content').toggleClass('overflow-content');
	//$(this).closest('.speaker-content').find('.speaker-full-content').toggleClass('collapsed');
	if($(this).is('.active')) {
		$(this).closest('.speaker-content').find('.speaker-full-content').slideDown(200);
	} else {
		$(this).closest('.speaker-content').find('.speaker-full-content').slideUp(200);
	}
	
	
	e.preventDefault();
}

(function ($) {
  $.fn.slideDown = function (duration) {    
    var position = this.css('position');

    this.css({
      display:'block',
      height:'auto'
    });

    var height = this.height();

    this.css({
      height: 0
    });

    this.animate({
      height: height
    }, duration);
  };
})(Zepto);

(function ($) {
  $.fn.slideUp = function (duration) {
    this.animate({
      height: 0
    }, 
    duration,
    'linear',
    function(){
    	$(this).css({
		      display:'none',
		      height:'auto'
		    });
    });
  };
})(Zepto);



/*--------------------------------------------------------*/
})(Zepto);