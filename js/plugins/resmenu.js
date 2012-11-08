if ( typeof Object.create !== "function" ){
  Object.create = function( obj ){
    function F(){}
    F.prototype = obj;
    return new F();
  };
}
(function( $, window, document, undefined ){
  var responsiveMenuOut = {
    init: function( options, elem ){
      // var
        var thisElem = this;
        thisElem.elem = elem;
        thisElem.$elem = $( elem );
        thisElem.masElemMenu = [];
        thisElem.ParentmasLi = [];
        thisElem.$html = $("html");
        thisElem.$body = $("body");
      // end var
      if( (typeof options !== "undefined") && !$.isEmptyObject(options) ) {
        thisElem.positionMenu = ( typeof options === "string" ) ? options : options.positionMenu;
      }else {
        thisElem.positionMenu = $.fn.responsiveMenu.options.positionMenu;
      }
      thisElem.options = $.extend( {}, $.fn.responsiveMenu.options, options );
      thisElem.$mobMenu = $( "<div>", {
        "class": "mobile-menu-"+thisElem.options.positionMenu,
        "html": "<ul></ul>",
        "css": {
          "height": thisElem.$html.height()
        }
      });
      if(thisElem.options.ulClass.length!==0) {
        thisElem.$mobMenu.addClass(thisElem.options.ulClass);
      }
      thisElem.BuildMenu();
      thisElem.displayMenu(elem);
    },
    BuildMenu: function(){
      var thisElem = this;
      if( (typeof thisElem.options.menuElem !== "undefined") && (thisElem.options.menuElem.length!==0) ){
        $.each(thisElem.options.menuElem,function(i,val){
          $(val)
            .find("li").each(function(i,val){
              if(!$(val).hasClass(thisElem.options.menuElemExcludeClass)) {
                var $item = $("<li>",{
                  html: $(val).html(),
                  "class": $(val).attr("class"),
                  "click": function(){
                    if( ( thisElem.$mobMenu.hasClass("opened") ) && thisElem.options.closeAfterClick ) {
                      thisElem.closeMenu(thisElem.$mobMenu);
                    }
                  }
                });
                thisElem.masElemMenu.push($item);
              }
            });
        });
      }
    },
    showOldMenu: function(flag){
      var thisElem = this;
      if( typeof flag === "undefined" ) {
        flag=false;
      }
      if( (typeof thisElem.options.menuElem !== "undefined") && (thisElem.options.menuElem.length!==0) ){
        $.each(thisElem.options.menuElem,function(i,val){
          thisElem.ParentmasLi.push($(val)[0].parentElement);
          if(flag){
            $(thisElem.ParentmasLi[i]).append($(val));
          }else {
            $(val).detach();
          }
          //(flag)?$(val).show():$(val).hide();
        });
      }
    },
    displayMenu: function(elem){
      var thisElem = this,
          $mobBut = $( "<a>", {
            "class": "mob-menu-but-"+thisElem.options.positionMenu,
            "href": "#",
            "click": function(event){
              event.preventDefault();
              thisElem.openMenu(thisElem.$mobMenu);
            }
          });
      thisElem.elem = elem;
      thisElem.$elem = $( elem );
      if(thisElem.masElemMenu.length!==0) {
        $.each(thisElem.masElemMenu,function(i,val){
          thisElem.$mobMenu.find("ul").append(val);
        });
      }
      $(window).resize(function(){
        if( thisElem.$elem.width() <= thisElem.options.minWidth ) {
          thisElem.$mobMenu.css({
            "height": thisElem.$html.height()+"px"
          });
          thisElem.$elem
            .before( thisElem.$mobMenu )
            .append( $mobBut );
          thisElem.showOldMenu();
        }else {
          thisElem.$html.removeAttr("style");
          thisElem.$body.removeAttr("style");
          thisElem.$mobMenu.remove();
          thisElem.$elem
            .removeAttr("style");
          if(thisElem.$elem.find($mobBut).length) {
            $mobBut.detach();
          }
          if(thisElem.$mobMenu.hasClass("opened")){
            thisElem.closeMenu(thisElem.$mobMenu);
          }
          thisElem.showOldMenu(true);
        }
      }).resize();
    },
    openMenu: function(menuElem) {
      var thisElem = this,
          $mobDisable = $("<div>",{
            "class": "disable-mobile",
            "click": function(){
              if(menuElem.hasClass("opened")) {
                thisElem.closeMenu(menuElem);
              }
            }
          });
      if(!menuElem.hasClass("opened")) {
        menuElem.addClass("opened");
        thisElem.$body.css({
          "width": "100%",
          "height": "100%",
          "overflow": "hidden"
        });
        thisElem.$html.css({
          "overflow": "hidden"
        });
        thisElem.$elem
          .addClass("mobile-menu-open-"+thisElem.options.positionMenu)
          .append($mobDisable);
        if(thisElem.options.afterOpenFn && typeof thisElem.options.afterOpenFn === "function") {
          thisElem.options.afterOpenFn();
        }
      }else {
        thisElem.closeMenu(menuElem);
        thisElem.$html.removeAttr("style");
      }
    },
    closeMenu: function(menuElem){
      var thisElem = this;
      thisElem.$elem
        .removeClass("mobile-menu-open-"+thisElem.options.positionMenu)
        .find(".disable-mobile").remove();
      menuElem.removeClass("opened");
      thisElem.$body.removeAttr("style");
      if(thisElem.options.afterCloseFn && typeof thisElem.options.afterCloseFn === "function") {
        thisElem.options.afterCloseFn();
      }
    }
  };
  $.fn.responsiveMenu = function( options, callbackFn ){
    if(callbackFn && typeof callbackFn === "function") {
      callbackFn();
    }
    return this.each(function(){
      var responsiveMenuIn = Object.create( responsiveMenuOut );
      responsiveMenuIn.init( options, this );
    });
  };
  $.fn.responsiveMenu.options = {
    positionMenu: "left",
    minWidth: 768,
    menuElem: [],
    menuElemExcludeClass: "hide-for-responsive",
    ulClass: "",
    closeAfterClick: true,
    afterOpenFn: function(){},
    afterCloseFn: function(){}
  };
})( jQuery, window, document );