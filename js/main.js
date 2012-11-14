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
/*--------------------------------------------------------*/
})(jQuery);