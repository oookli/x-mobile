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
		closeAfterClick: false,
		menuElem: [$mainNav],
		afterOpenFn: function(){},
		afterCloseFn: function(){}
	});

/*==============================
	apply flexslider 2
*/

$('.flexslider').flexslider({
    animation: "slide",
    directionNav: false
});



/*==============================
	Tabs block
*/
if ($("dl.tabs-block").length){
	$('dl.tabs-block dt.tab-title ').click(function(){
		$(this).siblings().removeClass('current').end()
		.next('dd.tab-content').andSelf().addClass('current');
	});
}

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
/*--------------------------------------------------------*/
})(jQuery);