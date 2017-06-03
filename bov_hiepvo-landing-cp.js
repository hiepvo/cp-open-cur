/**
 * Created by hiepvo on 3/29/17.
 */

window.addEventListener('load', function(){
  'use strict';

  var wrapper_default = document.querySelectorAll('.cp-layer-wrapper')[0];
  var layers = document.querySelectorAll('.cp-layer-wrapper .layer');

  var wrapper_default_h;
  if(wrapper_default !== undefined){
    wrapper_default_h = wrapper_default.offsetHeight;
  }
  var links = document.querySelectorAll('.cp-layer-wrapper header');

  var close_links = document.querySelectorAll('.cp-layer-wrapper .close');
  var done        = document.querySelector('#cp-following .done');

  var hidden_layer = document.querySelector('#hidden_layer');
  var cp_f         = document.querySelector('#cp-following');
  var cp_f_content = document.querySelector('#cp-following .layer-content');

  var cp_f_height;
  if(cp_f_content !== null){
    cp_f_height = cp_f_content.offsetHeight;
  }

  var layer      = document.querySelectorAll('.layer')[0];
  var temp       = null;
  var inProgress = false;

  if(layer !== undefined){
    var layer_default_h = layer.offsetHeight;
  }

  if(done !== null){
    done.addEventListener('click', openSlide_cf, false);
  }

  var Id = getQueryVariable("id");
  if(Id){
    openCpById(Id);
  }

  for(var i = 0; i < close_links.length; i++){
    links[i].addEventListener('click', openSlide, false);
    close_links[i].addEventListener('click', closeBtn, false);
  }

  // restore height of element and remove class 'active'
  function closeSlide(el){
    if(el.id === 'cp-following'){
      var layer_content          = document.querySelector('.cp-following .layer-content');
      layer_content.style.height = layer_default_h + 'px';
      var close                  = document.querySelector('#' + el.id + ' span.close');
      var done                   = document.querySelector('#' + el.id + ' span.done');
      hide(close, 500);
      show(done, 500);
      addClass(el, 'visited');
    }
    else{
      var activeheaderContent = document.querySelector('#' + el.parentNode.id + ' .header-content');

      var width             = document.querySelectorAll('.layer-content:not(.active)')[0].offsetWidth;
      var wrapper           = document.querySelectorAll('.cp-layer-wrapper')[0];
      var wrapper_default_w = wrapper.offsetWidth;

      el.parentNode.style.width              = Math.round((width / wrapper_default_w) * 100) + '%';
      el.parentNode.style.transitionDuration = '0.5s';
      var close                              = document.querySelector('#' + el.parentNode.id + ' span.close');
      var article                            = document.querySelector('#' + el.parentNode.id + ' .article');

      el.style.height             = layer_default_h + 'px';
      el.style.transitionDuration = '.2s';

      activeheaderContent.style.visibility = 'hidden';
      activeheaderContent.style.opacity    = 0;

      article.style.visibility = 'hidden';
      article.style.opacity    = 0;

      setTimeout(function(){
        removeClass(el, 'active');
        addClass(el.parentNode, 'visited');
        article.removeAttribute("style");
        activeheaderContent.style.opacity         = 1;
        activeheaderContent.style.transitionDelay = '.95s';
        activeheaderContent.style.visibility      = 'visible';
      }, 750);
      hide(close, 100);
    }
  }

  function closeBtn(){
    if(this.tagName.toLowerCase() === 'span'){

      var el      = this.parentNode;
      var close   = document.querySelector('#' + el.parentNode.id + ' span.close');
      var done    = document.querySelector('#' + el.parentNode.id + ' span.done');
      var wrapper = document.querySelectorAll('.cp-layer-wrapper')[0];
      if(el.parentNode.id === 'cp-following'){
        el.style.height = layer_default_h + 'px';

        hide(close, 500);
        show(done, 500);
        wrapper.style.height = Number(getStyle(hidden_layer, 'margin-top')) + 'px';
        setTimeout(function(){
          addClass(el.parentNode, 'visited');
        }, 850);

      }
      else{

        var article             = document.querySelector('#' + el.parentNode.id + ' .article');
        var activeheaderContent = document.querySelector('#' + el.parentNode.id + ' .header-content');
        article.style.opacity   = 0;

        wrapper.style.height = Number(getStyle(el.parentNode, 'margin-top')) + 'px';

        var width                 = document.querySelectorAll('.layer-content:not(.active)')[0].offsetWidth;
        var wrapper_default_w     = wrapper.offsetWidth;
        el.parentNode.style.width = Math.round((width / wrapper_default_w) * 100) + '%';

        el.style.height                      = layer_default_h + 'px';
        el.style.transitionDuration          = '.5s';
        activeheaderContent.style.visibility = 'hidden';
        activeheaderContent.style.opacity    = 0;
        article.style.visibility             = 'hidden';
        article.style.opacity                = 0;
        setTimeout(function(){
          removeClass(el, 'active');
          removeClass(hidden_layer, 'visible');
          addClass(el.parentNode, 'visited');

          el.parentNode.style.marginTop  = getStyle(hidden_layer, 'margin-top') + 'px';
          el.parentNode.style.marginLeft = Math.round((getStyle(hidden_layer, 'margin-left') / wrapper_default_w * 100)) + '%';
          hidden_layer.style.marginTop   = getStyle(el.parentNode, 'margin-top') + 'px';
          hidden_layer.style.marginLeft  = Math.round((getStyle(el.parentNode, 'margin-left') / wrapper_default_w * 100)) + '%';

          activeheaderContent.style.opacity         = 1;
          activeheaderContent.style.transitionDelay = '.95s';
          activeheaderContent.style.visibility      = 'visible';

          temp = null;
          article.removeAttribute("style");
        }, 750);
        hide(close, 100);
      }
    }
  }

  function setAnimationDelay(el){
    var prop;
    var styl = window.getComputedStyle(el);
    if(styl.getPropertyValue('animation-delay')){
      prop = 'animation-delay';
    } else if(styl.getPropertyValue('-webkit-animation-delay')){
      prop = '-webkit-animation-delay';

    } else if(styl.getPropertyValue('-moz-animation-delay')){
      prop = '-moz-animation-delay';
    }

    var newEl = el.cloneNode(true);
    newEl.style.setProperty(prop, 0.5 + 's', '');
    el.parentNode.replaceChild(newEl, el);
  }

  function openSlide(e){
    if(inProgress === true || inProgress === undefined){
      return;
    }
    inProgress = true;
    var currentEl;
    var parent;
    if(e.isTrusted === true){
      currentEl = this.parentNode.parentNode;
      parent    = this.parentNode.parentNode.parentNode;
    }
    else{

      currentEl = e.parentNode.parentNode;
      parent    = e.parentNode.parentNode.parentNode;
    }

    var lastChild = parent.lastElementChild;
    if(temp === null){
      temp = lastChild;
    }
    else{
      lastChild = temp;
    }

    if(currentEl.className.indexOf('on-top') === -1){
      addClass(currentEl, 'on-top');
    }
    var lastActive          = document.querySelector('#' + lastChild.id + ' div');
    var content             = document.querySelector('#' + currentEl.id + ' div');
    var close               = document.querySelector('#' + currentEl.id + ' .close');
    var article             = document.querySelector('#' + currentEl.id + ' .article');
    var activeheaderContent = document.querySelector('#' + lastChild.id + ' .header-content');
    var headerContent       = document.querySelector('#' + currentEl.id + ' .header-content');
    var wrapper             = document.querySelectorAll('.cp-layer-wrapper')[0];

    var wrapper_default_w = wrapper.offsetWidth;

    if(lastActive.className.indexOf('active') !== -1){
      closeSlide(lastActive);

      setTimeout(function(){
        lastChild.style.marginTop     = getStyle(hidden_layer, 'margin-top') + 'px';
        lastChild.style.marginLeft    = Math.round(getStyle(hidden_layer, 'margin-left') / wrapper_default_w * 100) + '%';
        hidden_layer.style.marginTop  = getStyle(lastChild, 'margin-top') + 'px';
        hidden_layer.style.marginLeft = Math.round(getStyle(lastChild, 'margin-left') / wrapper_default_w * 100) + '%';

        currentEl.style.marginTop     = getStyle(lastChild, 'margin-top') + 'px';
        currentEl.style.marginLeft    = Math.round(getStyle(lastChild, 'margin-left') / wrapper_default_w * 100) + '%';
        hidden_layer.style.marginTop  = getStyle(currentEl, 'margin-top') + 'px';
        hidden_layer.style.marginLeft = Math.round(getStyle(currentEl, 'margin-left') / wrapper_default_w * 100) + '%';
        show(close, 750);
      }, 750);
      headerContent.style.visibility       = 'hidden';
      headerContent.style.opacity          = 0;
      activeheaderContent.style.visibility = 'hidden';
      activeheaderContent.style.opacity    = 0;

      if(lastChild.offsetTop !== currentEl.offsetTop){
        addClass(content, 'active');
        setTimeout(function(){
          var height = wrapper_default_h + Number(getStyle(currentEl, 'margin-top'));
          addClass(hidden_layer, 'visible');
          wrapper.style.height             = height + 'px';
          content.style.height             = wrapper_default_h + 'px';
          content.style.transitionDuration = '0.75s';

          currentEl.style.width                     = '100%';
          currentEl.style.transitionDuration        = '0.75s';
          headerContent.style.opacity               = 1;
          headerContent.style.transitionDelay       = '.2s';
          headerContent.style.visibility            = 'visible';
          activeheaderContent.style.opacity         = 1;
          activeheaderContent.style.transitionDelay = '.2s';
          activeheaderContent.style.visibility      = 'visible';

        }, 1500);
      }
    }
    else{
      show(close, 500);
      closeSlide(cp_f);
      var headerContent = document.querySelector('#' + currentEl.id + ' .header-content');

      headerContent.style.visibility = 'hidden';
      headerContent.style.opacity    = 0;

      if(lastChild.id === 'cp-following'){
        lastChild = hidden_layer;
      }
      lastChild.style.marginTop  = getStyle(currentEl, 'margin-top') + 'px';
      lastChild.style.marginLeft = Math.round(getStyle(currentEl, 'margin-left') / wrapper_default_w * 100) + '%';
      currentEl.style.marginTop  = getStyle(lastChild, 'margin-top') + 'px';
      currentEl.style.marginLeft = Math.round(getStyle(lastChild, 'margin-left') / wrapper_default_w * 100) + '%';

      addClass(lastChild, 'top-layer');
      addClass(content, 'active');
      addClass(hidden_layer, 'visited');
      addClass(hidden_layer, 'visible');

      setTimeout(function(){
        setAnimationDelay(article);
        var height                       = wrapper_default_h + Number(getStyle(currentEl, 'margin-top'));
        wrapper.style.height             = height + 'px';
        content.style.height             = wrapper_default_h + 'px';
        content.style.transitionDuration = '0.75s';

        currentEl.style.width               = '100%';
        currentEl.style.transitionDuration  = '.75s';
        headerContent.style.opacity         = 1;
        headerContent.style.transitionDelay = '.2s';
        headerContent.style.visibility      = 'visible';
      }, 700);
    }
    setTimeout(function(){
      removeClass(currentEl, 'on-top');
      inProgress = false;
    }, 2000);
    temp = currentEl;
  }

  function openSlide_cf(){

    if(inProgress === true || inProgress === undefined){
      return;
    }
    inProgress = true;

    var currentEl = this.parentNode.parentNode;
    var parent    = this.parentNode.parentNode.parentNode;
    var lastChild = parent.lastElementChild;
    if(temp === null){
      temp = lastChild;
    }
    else{
      lastChild = temp;
    }

    var lastActive          = document.querySelector('#' + lastChild.id + ' div');
    var content             = document.querySelector('#' + currentEl.id + ' div');
    var activeheaderContent = document.querySelector('#' + lastChild.id + ' .header-content');
    var article             = document.querySelector('#' + currentEl.id + ' .article');
    var wrapper             = document.querySelectorAll('.cp-layer-wrapper')[0];

    var wrapper_default_w = wrapper.offsetWidth;
    if(lastActive.className.indexOf('active') !== -1){
      activeheaderContent.style.visibility = 'hidden';
      activeheaderContent.style.opacity    = 0;
      closeSlide(lastActive);
      setTimeout(function(){
        removeClass(hidden_layer, 'visible');

        lastChild.style.marginTop                 = getStyle(hidden_layer, 'margin-top') + 'px';
        lastChild.style.marginLeft                = Math.round(getStyle(hidden_layer, 'margin-left') / wrapper_default_w * 100) + '%';
        hidden_layer.style.marginTop              = getStyle(lastChild, 'margin-top') + 'px';
        hidden_layer.style.marginLeft             = Math.round(getStyle(lastChild, 'margin-left') / wrapper_default_w * 100) + '%';
        activeheaderContent.style.opacity         = 1;
        activeheaderContent.style.transitionDelay = '1s';
        activeheaderContent.style.visibility      = 'visible';

      }, 750);

      setTimeout(function(){
        removeClass(currentEl, 'visited');
        var height           = wrapper_default_h;
        wrapper.style.height = height + 'px';

        content.style.height             = cp_f_height + 'px';
        content.style.transitionDuration = '0.75s';

        currentEl.style.width              = '100%';
        currentEl.style.transitionDuration = '0.75s';
        var done                           = document.querySelector('#' + currentEl.id + ' span.done');
        var close                          = document.querySelector('#' + currentEl.id + ' .close');
        show(close, 500);
        addClass(done, 'hide');

      }, 1500);
    }
    else{

      removeClass(currentEl, 'visited');
      var height           = wrapper_default_h;
      wrapper.style.height = height + 'px';

      content.style.height             = cp_f_height + 'px';
      content.style.transitionDuration = '0.75s';

      currentEl.style.width              = '100%';
      currentEl.style.transitionDuration = '0.75s';
      article.style.opacity              = 1;
      article.style.transitionDelay      = '.2s';
      var done                           = document.querySelector('#' + currentEl.id + ' span.done');
      var close                          = document.querySelector('#' + currentEl.id + ' .close');
      show(close, 500);
      addClass(done, 'hide');
    }
    setTimeout(function(){
      inProgress = false;
    }, 3000);
    inProgress = false;
    temp       = currentEl;
  }

  function openCpById(id){
    var el = document.querySelector('#layer' + id + ' header');
    openSlide(el);
  }

  /********* helper ***********/

  function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars  = query.split("&");
    for(var i = 0; i < vars.length; i++){
      var pair = vars[i].split("=");
      if(pair[0] === variable){
        return pair[1];
      }
    }
    return (false);
  }

  function getStyle(e, styleName){
    var styleValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
      styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
    }
    else if(e.currentStyle){
      styleName  = styleName.replace(/\-(\w)/g, function(strMatch, p1){
        return p1.toUpperCase().replace('px', '');
      });
      styleValue = e.currentStyle[styleName];
    }
    return styleValue.replace('px', '');
  }

  function hide(el, time){
    setTimeout(function(){
      addClass(el, 'hide');
    }, time);
  }

  function show(el, time){
    setTimeout(function(){
      removeClass(el, 'hide');
    }, time);
  }

  function hasClass(el, className){
    if(el.classList){
      return el.classList.contains(className);
    }
    else{
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }

  function addClass(el, className){
    if(el.classList){
      el.classList.add(className);
    }
    else if(!hasClass(el, className)){
      el.className += " " + className;
    }
  }

  function removeClass(el, className){
    if(el.classList){
      el.classList.remove(className);
    }
    else if(hasClass(el, className)){
      var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

});
