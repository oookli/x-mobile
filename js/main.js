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