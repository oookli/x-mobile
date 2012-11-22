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
        "class": "mobile-menu "+thisElem.options.positionMenu,
        "html": "<ul></ul>",
        "css": {
          "height": thisElem.$html.height()
        }
      });
      if(thisElem.options.ulClass.length!==0) {
        thisElem.$mobMenu.addClass(thisElem.options.ulClass);
      }
      if(thisElem.options.removeMenuElem) {
        thisElem.BuildMenu();
        thisElem.displayMenu(elem);
      }else {
        thisElem.masParent = [];
        $.each(thisElem.options.menuElem,function(i,val){
          thisElem.masParent.push($(val).parent());
        });
        thisElem.DisplayMenuCopy(elem);
      }
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
    CopyMenu: function(flag){
      var thisElem = this;
      if( typeof flag === "undefined" ) {
        flag=true;
      }
      if( (typeof thisElem.options.menuElem !== "undefined") && (thisElem.options.menuElem.length!=0) ){
        $.each(thisElem.options.menuElem,function(i,val){
          var parentObj = $(val).parent();
          thisElem.$mobMenu.html("");
          if(flag){
            $(val).appendTo(thisElem.$mobMenu);
          }else {
            console.log(thisElem.masParent[i]);
            thisElem.masParent[i].append($(val));
          }
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
        });
      }
    },
    displayMenu: function(elem){
      var thisElem = this,
          $mobBut = $( "<a>", {
            "class": "mob-menu-but "+thisElem.options.positionMenu,
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
          if(!thisElem.$mobMenu.hasClass("opened")){
            thisElem.$elem
              .before( thisElem.$mobMenu )
              .append( $mobBut );
            thisElem.showOldMenu();
          }
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
    DisplayMenuCopy: function(elem){
      var thisElem = this,
          $mobBut = $( "<a>", {
            "class": "mob-menu-but "+thisElem.options.positionMenu,
            "href": "#",
            "click": function(event){
              event.preventDefault();
              thisElem.openMenu(thisElem.$mobMenu);
            }
          });
      thisElem.elem = elem;
      thisElem.$elem = $( elem );
      $(window).resize(function(){
        if( thisElem.$elem.width() <= thisElem.options.minWidth ) {
          thisElem.$mobMenu.css({
            "height": thisElem.$html.height()+"px"
          });
          thisElem.CopyMenu();
          thisElem.$elem
            .before( thisElem.$mobMenu )
            .append( $mobBut );
        }else {
          thisElem.$html.removeAttr("style");
          thisElem.$body.removeAttr("style");
          thisElem.$mobMenu.remove();
          thisElem.$elem
            .removeAttr("style")
          if(thisElem.$elem.find($mobBut).length) {
            $mobBut.detach();
          }
          if(thisElem.$mobMenu.hasClass("opened")){
            thisElem.closeMenu(thisElem.$mobMenu);
          }
          thisElem.CopyMenu(false);
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
      if (thisElem.options.useAnimCss) {
        var transEnd = "";
        if($.browser.webkit) {
            transEnd = "webkitTransitionEnd";
        } else if($.browser.mozilla) {
            transEnd = "transitionend";
        } else if ($.browser.opera) {
            transEnd = "oTransitionEnd";
        }
      }
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
        if(thisElem.options.useAnimCss) {
          thisElem.$elem
            .unbind(transEnd)
            .addClass("mobile-menu-open "+thisElem.options.positionMenu)
            .append($mobDisable);
          console.log(thisElem.$elem[0]);
          console.log($mobDisable[0]);
        }else {
          thisElem.$elem
            .addClass("mobile-menu-open")
            .animate({
              marginLeft: (thisElem.options.positionMenu==="left")?"+":"-"+thisElem.calcPercent(thisElem.$elem.width(),60)
            },"normal","swing",function(){
              thisElem.$elem.append($mobDisable);
            });
        }
        if( (typeof thisElem.options.elemTranslate !== "undefined") && (thisElem.options.elemTranslate.length!=0) ){
          $.each(thisElem.options.elemTranslate,function( i, val ){
            $(val)
              .addClass("mobile-menu-open "+thisElem.options.positionMenu)
              .append($mobDisable.clone());
          });
        }
        if(thisElem.options.afterOpenFn && typeof thisElem.options.afterOpenFn === "function") {
          thisElem.options.afterOpenFn.call(this,menuElem);
        }
      }else {
        thisElem.closeMenu(menuElem);
        thisElem.$html.removeAttr("style");
      }
    },
    closeMenu: function(menuElem){
      var thisElem = this;
      if (thisElem.options.useAnimCss) {
        var transEnd = "";
        if($.browser.webkit) {
            transEnd = "webkitTransitionEnd";
        } else if($.browser.mozilla) {
            transEnd = "transitionend";
        } else if ($.browser.opera) {
            transEnd = "oTransitionEnd";
        }
        thisElem.$elem
          .bind(transEnd,function(){
            menuElem.removeClass("opened");
            thisElem.$body.removeAttr("style");
          })
          .removeClass("mobile-menu-open "+thisElem.options.positionMenu)
          .find(".disable-mobile").remove();
      }else {
        thisElem.$elem
          .animate({
              marginLeft: 0
            },"normal","swing",function(){
              menuElem.removeClass("opened");
              thisElem.$body.removeAttr("style");
              thisElem.$elem
                .removeClass("mobile-menu-open")
                .find(".disable-mobile").remove();
            });
      }
      if( (typeof thisElem.options.elemTranslate !== "undefined") && (thisElem.options.elemTranslate.length!=0) ){
        $.each(thisElem.options.elemTranslate,function( i, val ){
          $(val)
            .removeClass("mobile-menu-open "+thisElem.options.positionMenu)
            .find(".disable-mobile").remove();
        });
      }
      if(thisElem.options.afterCloseFn && typeof thisElem.options.afterCloseFn === "function") {
        thisElem.options.afterCloseFn.call(this,menuElem);
      }
    },
    calcPercent: function(percElem,perc){
      return calcPerc=(percElem*perc)/100;
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
    elemTranslate: [],
    useAnimCss: true,
    menuElemExcludeClass: "hide-for-responsive",
    ulClass: "",
    removeMenuElem: true,
    closeAfterClick: true,
    afterOpenFn: function(){},
    afterCloseFn: function(){}
  };
})( jQuery, window, document );