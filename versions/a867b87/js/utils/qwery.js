define( function()
{
    var classSelectorRE = /^\.([\w-]+)$/,
        idSelectorRE = /^#([\w-]+)$/,
        tagSelectorRE = /^[\w-]+$/;

    var query = function(element, selector){
        var found;
        var elem = (element === document && idSelectorRE.test(selector)) ?
                ((found = element.getElementById(RegExp.$1)) ? [found] : [] ) :
                Array.prototype.slice.call(
                    classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
                    tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
                    element.querySelectorAll(selector)
                );

        return elem.length < 2 ? elem[0] : elem;
    }


    query.params = function ( name ){
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if(results == null)
        return "";
      else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    return query

})