;(function($,undefined) {
/*-----------------------------------------------------------------------------------*/
/* 
	initialize variables
*/
	var $layout = $("#layout"),
			$mainNav = $("#main-nav ul");
/* 
	end initialize variables
*/
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
	end Navigation togle
*/

/*
	Calculate #overlay height on window resize
*/
	$(window).resize(function(){
		$("#overlay").height($("#layout").height());
	}).trigger('resize');
/*
	end Calculate #overlay height on window resize
*/

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
/*
	end "More" button trigger
*/

/*
	apply flexslider 2
*/
	$('.flexslider').flexslider({
    animation: "slide",
    directionNav: false
  });
/*
	end apply flexslider 2
*/
/*
	apply resmenu
*/
	$layout.responsiveMenu({
      positionMenu: "right",
      minWidth: 2000,
      closeAfterClick: false,
      menuElem: [$mainNav],
      afterOpenFn: function(){
        
      },
      afterCloseFn: function(){

      }
    });
/*
	end apply resmenu
*/
/*--------------------------------------------------------*/
})(jQuery);