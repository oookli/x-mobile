;(function($,undefined) {
/*-----------------------------------------------------------------------------------*/
/*==============================
	initialize variables
*/
var $wrap = $("#main-wrap"),
	$mainNav = $("#main-nav ul");

$.fn.toggleClassChange = function(classObj){
	if (typeof classObj === "undefined") {
		classObj = "";
	}
	var $this = $(this);
	(!$this.hasClass(classObj))?
		$this.addClass(classObj)
		:$this.removeClass(classObj);
};
/*==============================
	apply resmenu
*/
$wrap.responsiveMenu({
		positionMenu: "right",
		minWidth: 2000,
		useAnimCss: Modernizr && Modernizr.csstransitions,
		closeAfterClick: false,
		menuElem: [$mainNav]
	});

/*==============================
	apply flexslider 2
*/

$('.flexslider').flexslider({
    animation: "slide",
    directionNav: false,
    start: function(slider){
			var sliderWidth = parseFloat(100/slider.count,10),
					sliderMargin = parseFloat(sliderWidth/26,10),
					fixWidth = parseFloat(sliderMargin/slider.count,10),
					TotalWidth=0;
			$(slider.controlNav).parent().each(function(){
				$(this).css({
					"width": sliderWidth-(sliderMargin*2)+(fixWidth*2)+"%",
					"margin": "0 "+(($(this).is(":last-child"))?0:sliderMargin)+"%"+" 0 "+(($(this).is(":first-child"))?0:sliderMargin)+"%"
				});
			});
    }
});


/*==============================
	Geolocation support
*/

(function initGeolocation () {
	// Init variables 
	var $mapWrap = $('#map-wrap');
	var $header = $("#header");

	if (!$('#map-wrap').length) {
		return false;
	}

	// Check if geolocation is supported
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, showError);
	} else {
	  error('Geolocation is not supported');
	  showMap();
	}

	// Resize map size according to viewport size
	function rr() {
	    var mapHeight = $('body').height() - $header.height();
	    $mapWrap.css('height', mapHeight );
	};
	rr();
	window.onresize = rr;

	// Geolocation is supported
	function success(position) {
		if ($mapWrap.is('.success')) {
			// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
			return;
		}
		$mapWrap.addClass('success');
		showMap(position);
	}

	// Goelocation error handing
	function showError(error)  {
		switch(error.code)    {
		case error.PERMISSION_DENIED:
		  console.log("User denied the request for Geolocation.");
		  break;
		case error.POSITION_UNAVAILABLE:
		  console.log("Location information is unavailable.");
		  break;
		case error.TIMEOUT:
		  console.log("The request to get user location timed out.");
		  break;
		case error.UNKNOWN_ERROR:
		  console.log("An unknown error occurred.");
		  break;
		}
		showMap();
	}

	// Show map
	function showMap (position) {
		var latlng;
		
		var myOptions = {
		    zoom: 15,
		    center: new google.maps.LatLng(50.44329441075639, 30.525598526000977),
		    mapTypeControl: false,
		    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		if (position) { // if geolocation is suported then get users location and pass it to google map as a parameter
			latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			myOptions.center = latlng;
		}

		var map = new google.maps.Map(document.getElementById("map-wrap"), myOptions);
		
		if (position) { // if geolocation is suported then put a marker to google map
		  var marker = new google.maps.Marker({
		      position: latlng, 
		      map: map, 
		      title:"Ви знаходитесь тут. (Принаймі в радіусі "+position.coords.accuracy+" метрів від позначки)"
		  });
		}
	}
})();


/*==============================
	Custom checkboxes
*/

$(".checkbox-cont")
	.on("change","input[type='checkbox']",function(){
		$(this).next().toggleClassChange("checked");
	})
	.on("click","label",function(event){
		event.preventDefault();
		var $thisPrev = $(this).prev(),
				$thisInput = $thisPrev.find("input[type='checkbox']");
		if(!$thisInput.is(":checked")) {
			$thisInput.attr("checked",true);
		}else {
			$thisInput.attr("checked",false);
		}
		$thisPrev.find(".checkbox-block").toggleClassChange("checked");
		console.log($thisInput.is(":checked"));
	});


/*==============================
	Custom select
*/	
$(".sel-location").on("click",".sel-block .select-arrow",function(event){
	event.preventDefault();
	var element = $(this).prev()[0], worked = false;
	if (document.createEvent) {
		var e = document.createEvent("MouseEvents");
		e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		worked = element.dispatchEvent(e);
	} else if (element.fireEvent) {
		worked = element.fireEvent("onmousedown");
	}
});
/*--------------------------------------------------------*/
})(jQuery);