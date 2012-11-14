;(function($,undefined) {
/*-----------------------------------------------------------------------------------*/
/*==============================
	initialize variables
*/
var $wrap = $("#main-wrap"),
	$mainNav = $("#main-nav ul");

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
$(".checkbox-wrapper").on("change","input[type='checkbox']",function(){
	var $thisParent = $(this).next();
	console.log($thisParent);
	(!$thisParent.hasClass("checked"))?
		$thisParent.addClass("checked")
		:$thisParent.removeClass("checked");
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
	console.log('navigator.geolocation ',navigator.geolocation);

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
		console.log('success' , position);
		if ($mapWrap.is('.success')) {
			// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
			return;
		}
		$mapWrap.addClass('success');
		showMap(position);
	}

	// Goelocation error handing
	function showError(error)  {
		console.log('showError');
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
		console.log('showMap',position); 
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

/*--------------------------------------------------------*/
})(jQuery);