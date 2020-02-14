(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var $, Anno, AnnoButton,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	$ = __webpack_require__(1);

	__webpack_require__(2);

	exports.Anno = Anno = (function() {
	  var _returnFromOnShow;

	  function Anno(arg) {
	    var key, options, others, val;
	    if (arg.__proto__ === Array.prototype) {
	      options = arg.shift();
	      others = arg;
	    } else {
	      options = arg;
	    }
	    if (options instanceof Anno) {
	      console.warn('Anno constructor parameter is already an Anno object.');
	    }
	    if (options == null) {
	      console.warn("new Anno() created with no options. It's recommended" + " to supply at least target and content.");
	    }
	    for (key in options) {
	      val = options[key];
	      if (key === 'chainTo' || key === 'start' || key === 'show' || key === 'hide' || key === 'hideAnno' || key === 'chainSize' || key === 'chainIndex' || key === 'version') {
	        console.warn(("Anno: Overriding '" + key + "' is not recommended. Can ") + "you override a delegated function instead?");
	      }
	    }
	    for (key in options) {
	      val = options[key];
	      this[key] = val;
	    }
	    if ((others != null ? others.length : void 0) > 0) {
	      this.chainTo(new Anno(others));
	    }
	    return;
	  }

	  Anno.setDefaults = function(options) {
	    var key, results, val;
	    results = [];
	    for (key in options) {
	      val = options[key];
	      results.push(Anno.prototype[key] = val);
	    }
	    return results;
	  };

	  Anno.prototype.chainTo = function(obj) {
	    if (obj != null) {
	      if (this._chainNext == null) {
	        this._chainNext = obj instanceof Anno ? obj : new Anno(obj);
	        this._chainNext._chainPrev = this;
	      } else {
	        this._chainNext.chainTo(obj);
	      }
	    } else {
	      console.error("Can't chainTo a null object.");
	    }
	    return this;
	  };

	  Anno.prototype._chainNext = null;

	  Anno.prototype._chainPrev = null;

	  Anno.chain = function(array) {
	    console.warn('Anno.chain([...]) is deprecated. Use ' + '`new Anno([...])` instead.');
	    return new Anno(array);
	  };

	  Anno.prototype.chainSize = function() {
	    if (this._chainNext != null) {
	      return this._chainNext.chainSize();
	    } else {
	      return 1 + this.chainIndex();
	    }
	  };

	  Anno.prototype.chainIndex = function(index) {
	    var find;
	    if (index != null) {
	      return (find = function(curr, i, u) {
	        var ci;
	        if (curr != null) {
	          ci = curr.chainIndex();
	          if ((0 <= ci && ci < i)) {
	            return find(curr._chainNext, i, u);
	          } else if ((i < ci && ci <= u)) {
	            return find(curr._chainPrev, i, u);
	          } else if (ci === i) {
	            return curr;
	          }
	        } else {
	          return console.error(("Couldn't switch to index '" + i + "'. Chain size ") + ("is '" + u + "'"));
	        }
	      })(this, index, this.chainSize());
	    } else {
	      if (this._chainPrev != null) {
	        return 1 + this._chainPrev.chainIndex();
	      } else {
	        return 0;
	      }
	    }
	  };

	  Anno.prototype.show = function() {
	    var $target, lastButton;
	    $target = this.targetFn();
	    if (this._annoElem != null) {
	      console.warn(("Anno elem for '" + this.target + "' has already been ") + "generated.  Did you call show() twice?");
	    }
	    this._annoElem = this.annoElem();
	    this.emphasiseTarget();
	    this.showOverlay();
	    $target.after(this._annoElem);
	    this._annoElem.addClass('anno-target-' + this.arrowPositionFn());
	    this.positionAnnoElem();
	    setTimeout(((function(_this) {
	      return function() {
	        return _this._annoElem.removeClass('anno-hidden');
	      };
	    })(this)), 50);
	    $target.scrollintoview();
	    setTimeout(((function(_this) {
	      return function() {
	        return _this._annoElem.scrollintoview();
	      };
	    })(this)), 300);
	    lastButton = this._annoElem.find('button').last();
	    if (this.rightArrowClicksLastButton) {
	      lastButton.keydown(function(evt) {
	        if (evt.keyCode === 39) {
	          return $(this).click();
	        }
	      });
	    }
	    if (this.autoFocusLastButton && $target.find(':focus').length === 0) {
	      lastButton.focus();
	    }
	    this._returnFromOnShow = this.onShow(this, $target, this._annoElem);
	    return this;
	  };

	  Anno.prototype.start = function() {
	    return this.show();
	  };

	  Anno.prototype.rightArrowClicksLastButton = true;

	  Anno.prototype.autoFocusLastButton = true;

	  Anno.prototype.onShow = function(anno, $target, $annoElem) {};

	  _returnFromOnShow = null;

	  Anno.prototype.hide = function() {
	    this.hideAnno();
	    setTimeout(this.hideOverlay, 50);
	    return this;
	  };

	  Anno.prototype.hideAnno = function() {
	    if (this._annoElem != null) {
	      this._annoElem.addClass('anno-hidden');
	      this.deemphasiseTarget();
	      this.onHide(this, this.targetFn(), this._annoElem, this._returnFromOnShow);
	      (function(annoEl) {
	        return setTimeout((function() {
	          return annoEl.remove();
	        }), 300);
	      })(this._annoElem);
	      this._annoElem = null;
	    } else {
	      console.warn(("Can't hideAnno() for '" + this.target + "' when @_annoElem ") + "is null.  Did you call hideAnno() twice?");
	    }
	    return this;
	  };

	  Anno.prototype.onHide = function(anno, $target, $annoElem, returnFromOnShow) {};

	  Anno.prototype.switchTo = function(otherAnno) {
	    if (otherAnno != null) {
	      this.hideAnno();
	      return otherAnno.show();
	    } else {
	      console.warn("Can't switchTo a null object. Hiding instead.");
	      return this.hide();
	    }
	  };

	  Anno.prototype.switchToChainNext = function() {
	    return this.switchTo(this._chainNext);
	  };

	  Anno.prototype.switchToChainPrev = function() {
	    return this.switchTo(this._chainPrev);
	  };

	  Anno.prototype.target = 'h1';

	  Anno.prototype.targetFn = function() {
	    var r;
	    if (typeof this.target === 'string') {
	      r = $(this.target).filter(':not(.anno-placeholder)');
	      if (r.length === 0) {
	        console.error("Couldn't find Anno.target '" + this.target + "'.");
	      }
	      if (r.length > 1) {
	        console.warn(("Anno target '" + this.target + "' matched " + r.length + " ") + "elements. Targeting the first one.");
	      }
	      return r.first();
	    } else if (this.target instanceof jQuery) {
	      if (this.target.length > 1) {
	        console.warn(("Anno jQuery target matched " + this.target.length + " ") + "elements. Targeting the first one.");
	      }
	      return this.target.first();
	    } else if (this.target instanceof HTMLElement) {
	      return $(this.target);
	    } else if (typeof this.target === 'function') {
	      return this.target();
	    } else {
	      console.error("Unrecognised Anno.target. Please supply a jQuery " + "selector string, a jQuery object, a raw DOM element or a " + "function returning a jQuery element. target:");
	      return console.error(this.target);
	    }
	  };

	  Anno.prototype.annoElem = function() {
	    this._annoElem = $("<div class='anno anno-hidden " + this.className + "'>\n<div class='anno-inner'>  <div class='anno-arrow'></div>  </div>\n</div>");
	    this._annoElem.find('.anno-inner').append(this.contentElem()).append(this.buttonsElem());
	    return this._annoElem;
	  };

	  Anno.prototype._annoElem = null;

	  Anno.prototype.className = '';

	  Anno.prototype.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

	  Anno.prototype.contentFn = function() {
	    return this.content;
	  };

	  Anno.prototype.contentElem = function() {
	    return $("<div class='anno-content'>" + this.contentFn() + "</div>");
	  };

	  Anno.prototype.showOverlay = function() {
	    var $e;
	    if ($('.anno-overlay').length === 0) {
	      $(this.appendOverlayTo || 'body').append($e = this.overlayElem().addClass('anno-hidden'));
	      return setTimeout((function() {
	        return $e.removeClass('anno-hidden');
	      }), 10);
	    } else {
	      return $('.anno-overlay').replaceWith(this.overlayElem());
	    }
	  };

	  Anno.prototype.overlayElem = function() {
	    return $("<div class='anno-overlay " + this.overlayClassName + "'></div>").click((function(_this) {
	      return function(evt) {
	        return _this.overlayClick.call(_this, _this, evt);
	      };
	    })(this));
	  };

	  Anno.prototype.overlayClassName = '';

	  Anno.prototype.overlayClick = function(anno, evt) {
	    return anno.hide();
	  };

	  Anno.prototype.hideOverlay = function() {
	    $('.anno-overlay').addClass('anno-hidden');
	    return setTimeout((function() {
	      return $('.anno-overlay').remove();
	    }), 300);
	  };

	  Anno.prototype.emphasiseTarget = function($target) {
	    var origbg, origheight, origleft, origtop, origwidth, origzindex, placeholder, ppos, startposition, tpos;
	    if ($target == null) {
	      $target = this.targetFn();
	    }
	    this._undoEmphasise = [];
	    $target.closest(':scrollable').on('mousewheel', function(evt) {
	      evt.preventDefault();
	      return evt.stopPropagation();
	    });
	    this._undoEmphasise.push(function($t) {
	      return $t.closest(':scrollable').off('mousewheel');
	    });
	    if ($target.css('position') === 'static') {
	      $target.after(placeholder = $target.clone().addClass('anno-placeholder'));
	      (function(_this) {
	        return (function(placeholder) {
	          return _this._undoEmphasise.push(function() {
	            return placeholder.remove();
	          });
	        });
	      })(this)(placeholder);
	      startposition = $target.prop('style').position;
	      (function(_this) {
	        return (function(startposition) {
	          return _this._undoEmphasise.push(function($t) {
	            return $t.css({
	              position: startposition
	            });
	          });
	        });
	      })(this)(startposition);
	      $target.css({
	        position: 'absolute'
	      });
	      if ($target.outerWidth() !== placeholder.outerWidth()) {
	        origwidth = $target.prop('style').width;
	        (function(_this) {
	          return (function(origwidth) {
	            return _this._undoEmphasise.push(function($t) {
	              return $t.css({
	                width: origwidth
	              });
	            });
	          });
	        })(this)(origwidth);
	        $target.css('width', placeholder.outerWidth());
	      }
	      if ($target.outerHeight() !== placeholder.outerHeight()) {
	        origheight = $target.prop('style').height;
	        (function(_this) {
	          return (function(origheight) {
	            return _this._undoEmphasise.push(function($t) {
	              return $t.css({
	                height: origheight
	              });
	            });
	          });
	        })(this)(origheight);
	        $target.css('height', placeholder.outerHeight());
	      }
	      ppos = placeholder.position();
	      tpos = $target.position();
	      if (tpos.top !== ppos.top) {
	        origtop = $target.prop('style').top;
	        (function(_this) {
	          return (function(origtop) {
	            return _this._undoEmphasise.push(function($t) {
	              return $t.css({
	                top: origtop
	              });
	            });
	          });
	        })(this)(origtop);
	        $target.css('top', ppos.top);
	      }
	      if (tpos.left !== ppos.left) {
	        origleft = $target.prop('style').left;
	        (function(_this) {
	          return (function(origleft) {
	            return _this._undoEmphasise.push(function($t) {
	              return $t.css({
	                left: origleft
	              });
	            });
	          });
	        })(this)(origleft);
	        $target.css('left', ppos.left);
	      }
	    }
	    if ($target.css('backgroundColor') === 'rgba(0, 0, 0, 0)' || $target.css('backgroundColor') === 'transparent') {
	      console.warn(("Anno.js target '" + this.target + "' has a transparent bg; ") + "filling it white temporarily.");
	      origbg = $target.prop('style').background;
	      (function(_this) {
	        return (function(origbg) {
	          return _this._undoEmphasise.push(function($t) {
	            return $t.css({
	              background: origbg
	            });
	          });
	        });
	      })(this)(origbg);
	      $target.css({
	        backgroundColor: 'white'
	      });
	    }
	    origzindex = $target.prop('style').zIndex;
	    (function(_this) {
	      return (function(origzindex) {
	        return _this._undoEmphasise.push(function($t) {
	          return $t.css({
	            zIndex: origzindex
	          });
	        });
	      });
	    })(this)(origzindex);
	    $target.css({
	      zIndex: '1001'
	    });
	    return $target;
	  };

	  Anno.prototype._undoEmphasise = [];

	  Anno.prototype.deemphasiseTarget = function() {
	    var $target, fn, j, len, ref;
	    $target = this.targetFn();
	    ref = this._undoEmphasise;
	    for (j = 0, len = ref.length; j < len; j++) {
	      fn = ref[j];
	      fn($target);
	    }
	    return $target;
	  };

	  Anno.prototype.position = null;

	  Anno.prototype.positionAnnoElem = function(annoEl) {
	    var $targetEl, offset, pos;
	    if (annoEl == null) {
	      annoEl = this._annoElem;
	    }
	    pos = this.positionFn();
	    $targetEl = this.targetFn();
	    offset = $targetEl.position();
	    switch (pos) {
	      case 'top':
	      case 'bottom':
	        annoEl.css({
	          left: offset.left + 'px'
	        });
	        break;
	      case 'center-top':
	      case 'center-bottom':
	        annoEl.css({
	          left: offset.left + ($targetEl.outerWidth() / 2 - annoEl.outerWidth() / 2) + 'px'
	        });
	        break;
	      case 'left':
	      case 'right':
	        annoEl.css({
	          top: offset.top + 'px'
	        });
	        break;
	      case 'center-left':
	      case 'center-right':
	        annoEl.css({
	          top: offset.top + ($targetEl.outerHeight() / 2 - annoEl.outerHeight() / 2) + 'px'
	        });
	    }
	    switch (pos) {
	      case 'top':
	      case 'center-top':
	        annoEl.css({
	          top: offset.top - annoEl.outerHeight() + 'px'
	        });
	        break;
	      case 'bottom':
	      case 'center-bottom':
	        annoEl.css({
	          top: offset.top + $targetEl.outerHeight() + 'px'
	        });
	        break;
	      case 'left':
	      case 'center-left':
	        annoEl.css({
	          left: offset.left - annoEl.outerWidth() + 'px'
	        });
	        break;
	      case 'right':
	      case 'center-right':
	        annoEl.css({
	          left: offset.left + $targetEl.outerWidth() + 'px'
	        });
	        break;
	      default:
	        if ((pos.left != null) || (pos.right != null) || (pos.top != null) || (pos.bottom != null)) {
	          annoEl.css(pos);
	        } else {
	          console.error("Unrecognised position: '" + pos + "'");
	        }
	    }
	    return annoEl;
	  };

	  Anno.prototype.positionFn = function() {
	    var $container, $target, allowed, annoBounds, bad, containerOffset, targetBounds, targetOffset, viewBounds;
	    if (this.position != null) {
	      return this.position;
	    } else if (this._annoElem != null) {
	      $target = this.targetFn();
	      $container = $target.closest(':scrollable');
	      if ($container.length === 0) {
	        $container = $('body');
	      }
	      targetOffset = $target.offset();
	      containerOffset = $container.offset();
	      targetBounds = {
	        left: targetOffset.left - containerOffset.left,
	        top: targetOffset.top - containerOffset.top
	      };
	      targetBounds.right = targetBounds.left + $target.outerWidth();
	      targetBounds.bottom = targetBounds.top + $target.outerHeight();
	      viewBounds = {
	        w: $container.width() || $container.width(),
	        h: $container.height() || $container.height()
	      };
	      annoBounds = {
	        w: this._annoElem.outerWidth(),
	        h: this._annoElem.outerHeight()
	      };
	      bad = [];
	      if (annoBounds.w > targetBounds.left) {
	        bad = bad.concat(['left', 'center-left']);
	      }
	      if (annoBounds.h > targetBounds.top) {
	        bad = bad.concat(['top', 'center-top']);
	      }
	      if (annoBounds.w + targetBounds.right > viewBounds.w) {
	        bad = bad.concat(['right', 'center-right']);
	      }
	      if (annoBounds.h + targetBounds.bottom > viewBounds.h) {
	        bad = bad.concat(['bottom', 'center-bottom']);
	      }
	      allowed = Anno.preferredPositions.filter(function(p) {
	        return indexOf.call(bad, p) < 0;
	      });
	      if (allowed.length === 0) {
	        console.error(("Anno couldn't guess a position for '" + this.target + "'. ") + "Please supply one in the constructor.");
	      } else {
	        console.warn(("Anno: guessing position:'" + allowed[0] + "' for ") + ("'" + this.target + "'. Possible Anno.preferredPositions: [" + allowed + "]."));
	      }
	      return this.position = allowed[0];
	    }
	  };

	  Anno.preferredPositions = ['bottom', 'right', 'left', 'top', 'center-bottom', 'center-right', 'center-left', 'center-top'];

	  Anno.prototype.arrowPositionFn = function() {
	    var pos, r;
	    if (this.arrowPosition != null) {
	      return this.arrowPosition;
	    } else if (typeof this.positionFn() === 'string') {
	      return {
	        'top': 'bottom',
	        'center-top': 'center-bottom',
	        'left': 'right',
	        'center-left': 'center-right',
	        'right': 'left',
	        'center-right': 'center-left',
	        'bottom': 'top',
	        'center-bottom': 'center-top'
	      }[this.positionFn()];
	    } else {
	      pos = {
	        l: parseInt(this.positionFn().left, 10),
	        t: parseInt(this.positionFn().top, 10)
	      };
	      if (Math.abs(pos.l) > Math.abs(pos.t)) {
	        r = pos.l < 0 ? 'center-right' : 'center-left';
	      } else {
	        r = pos.t < 0 ? 'center-bottom' : 'center-top';
	      }
	      console.warn(("Guessing arrowPosition:'" + r + "' for " + this.target + ". ") + "Include this in your constructor for consistency.");
	      return r;
	    }
	  };

	  Anno.prototype.arrowPosition = null;

	  Anno.prototype.buttons = [{}];

	  Anno.prototype.buttonsFn = function() {
	    if (this.buttons instanceof Array) {
	      return this.buttons.map(function(b) {
	        return new AnnoButton(b);
	      });
	    } else {
	      return [new AnnoButton(this.buttons)];
	    }
	  };

	  Anno.prototype.buttonsElem = function() {
	    var b;
	    return $("<div class='anno-btn-container'></div>").append((function() {
	      var j, len, ref, results;
	      ref = this.buttonsFn();
	      results = [];
	      for (j = 0, len = ref.length; j < len; j++) {
	        b = ref[j];
	        results.push(b.buttonElem(this));
	      }
	      return results;
	    }).call(this));
	  };

	  return Anno;

	})();

	exports.AnnoButton = AnnoButton = (function() {
	  function AnnoButton(options) {
	    var key, val;
	    for (key in options) {
	      val = options[key];
	      this[key] = val;
	    }
	  }

	  AnnoButton.prototype.buttonElem = function(anno) {
	    return $("<button class='anno-btn'></button>").html(this.textFn(anno)).addClass(this.className).click((function(_this) {
	      return function(evt) {
	        return _this.click.call(anno, anno, evt);
	      };
	    })(this));
	  };

	  AnnoButton.prototype.textFn = function(anno) {
	    if (this.text != null) {
	      return this.text;
	    } else if (anno._chainNext != null) {
	      return 'Next';
	    } else {
	      return 'Done';
	    }
	  };

	  AnnoButton.prototype.text = null;

	  AnnoButton.prototype.className = '';

	  AnnoButton.prototype.click = function(anno, evt) {
	    if (anno._chainNext != null) {
	      return anno.switchToChainNext();
	    } else {
	      return anno.hide();
	    }
	  };

	  AnnoButton.NextButton = new AnnoButton({
	    text: 'Next',
	    click: function() {
	      return this.switchToChainNext();
	    }
	  });

	  AnnoButton.DoneButton = new AnnoButton({
	    text: 'Done',
	    click: function() {
	      return this.hide();
	    }
	  });

	  AnnoButton.BackButton = new AnnoButton({
	    text: 'Back',
	    className: 'anno-btn-low-importance',
	    click: function() {
	      return this.switchToChainPrev();
	    }
	  });

	  return AnnoButton;

	})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* MIT https://github.com/kenwheeler/cash */
	(function(){
	"use strict";

	var propMap = {
	  /* GENERAL */
	  "class": 'className',
	  contenteditable: 'contentEditable',

	  /* LABEL */
	  "for": 'htmlFor',

	  /* INPUT */
	  readonly: 'readOnly',
	  maxlength: 'maxLength',
	  tabindex: 'tabIndex',

	  /* TABLE */
	  colspan: 'colSpan',
	  rowspan: 'rowSpan',

	  /* IMAGE */
	  usemap: 'useMap'
	};

	function attempt(fn, arg) {
	  try {
	    return fn(arg);
	  } catch (_a) {
	    return arg;
	  }
	}

	var doc = document,
	    win = window,
	    docEle = doc.documentElement,
	    createElement = doc.createElement.bind(doc),
	    div = createElement('div'),
	    table = createElement('table'),
	    tbody = createElement('tbody'),
	    tr = createElement('tr'),
	    isArray = Array.isArray,
	    ArrayPrototype = Array.prototype,
	    concat = ArrayPrototype.concat,
	    filter = ArrayPrototype.filter,
	    indexOf = ArrayPrototype.indexOf,
	    map = ArrayPrototype.map,
	    push = ArrayPrototype.push,
	    slice = ArrayPrototype.slice,
	    some = ArrayPrototype.some,
	    splice = ArrayPrototype.splice;
	var idRe = /^#[\w-]*$/,
	    classRe = /^\.[\w-]*$/,
	    htmlRe = /<.+>/,
	    tagRe = /^\w+$/; // @require ./variables.ts

	function find(selector, context) {
	  return !selector || !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
	} // @require ./find.ts
	// @require ./variables.ts


	var Cash =
	/** @class */
	function () {
	  function Cash(selector, context) {
	    if (!selector) return;
	    if (isCash(selector)) return selector;
	    var eles = selector;

	    if (isString(selector)) {
	      var ctx = (isCash(context) ? context[0] : context) || doc;
	      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
	      if (!eles) return;
	    } else if (isFunction(selector)) {
	      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
	    }

	    if (eles.nodeType || eles === win) eles = [eles];
	    this.length = eles.length;

	    for (var i = 0, l = this.length; i < l; i++) {
	      this[i] = eles[i];
	    }
	  }

	  Cash.prototype.init = function (selector, context) {
	    return new Cash(selector, context);
	  };

	  return Cash;
	}();

	var fn = Cash.prototype,
	    cash = fn.init;
	cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

	fn.length = 0;
	fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

	if (typeof Symbol === 'function') {
	  // Ensuring a cash collection is iterable
	  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
	}

	fn.map = function (callback) {
	  return cash(concat.apply([], map.call(this, function (ele, i) {
	    return callback.call(ele, i, ele);
	  })));
	};

	fn.slice = function (start, end) {
	  return cash(slice.call(this, start, end));
	}; // @require ./cash.ts


	var dashAlphaRe = /-([a-z])/g;

	function camelCase(str) {
	  return str.replace(dashAlphaRe, function (match, letter) {
	    return letter.toUpperCase();
	  });
	}

	function each(arr, callback, _reverse) {
	  if (_reverse) {
	    var i = arr.length;

	    while (i--) {
	      if (callback.call(arr[i], i, arr[i]) === false) return arr;
	    }
	  } else {
	    for (var i = 0, l = arr.length; i < l; i++) {
	      if (callback.call(arr[i], i, arr[i]) === false) return arr;
	    }
	  }

	  return arr;
	}

	cash.each = each;

	fn.each = function (callback) {
	  return each(this, callback);
	};

	fn.removeProp = function (prop) {
	  return this.each(function (i, ele) {
	    delete ele[propMap[prop] || prop];
	  });
	};

	function extend(target) {
	  var objs = [];

	  for (var _i = 1; _i < arguments.length; _i++) {
	    objs[_i - 1] = arguments[_i];
	  }

	  var length = arguments.length;
	  if (!length) return {};
	  if (length === 1) return extend(cash, target);

	  for (var i = 1; i < length; i++) {
	    for (var key in arguments[i]) {
	      target[key] = arguments[i][key];
	    }
	  }

	  return target;
	}

	cash.extend = extend;

	fn.extend = function (plugins) {
	  return extend(fn, plugins);
	};

	cash.guid = 1; // @require ./cash.ts

	function matches(ele, selector) {
	  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
	  return !!matches && !!selector && matches.call(ele, selector);
	}

	function isCash(x) {
	  return x instanceof Cash;
	}

	function isWindow(x) {
	  return !!x && x === x.window;
	}

	function isDocument(x) {
	  return !!x && x.nodeType === 9;
	}

	function isElement(x) {
	  return !!x && x.nodeType === 1;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	function isString(x) {
	  return typeof x === 'string';
	}

	function isUndefined(x) {
	  return x === undefined;
	}

	function isNull(x) {
	  return x === null;
	}

	function isNumeric(x) {
	  return !isNaN(parseFloat(x)) && isFinite(x);
	}

	cash.isWindow = isWindow;
	cash.isFunction = isFunction;
	cash.isNumeric = isNumeric;
	cash.isArray = isArray;

	fn.prop = function (prop, value) {
	  if (!prop) return;

	  if (isString(prop)) {
	    prop = propMap[prop] || prop;
	    if (arguments.length < 2) return this[0] && this[0][prop];
	    return this.each(function (i, ele) {
	      ele[prop] = value;
	    });
	  }

	  for (var key in prop) {
	    this.prop(key, prop[key]);
	  }

	  return this;
	};

	fn.get = function (index) {
	  if (isUndefined(index)) return slice.call(this);
	  index = Number(index);
	  return this[index < 0 ? index + this.length : index];
	};

	fn.eq = function (index) {
	  return cash(this.get(index));
	};

	fn.first = function () {
	  return this.eq(0);
	};

	fn.last = function () {
	  return this.eq(-1);
	}; // @require ./matches.ts
	// @require ./type_checking.ts


	function getCompareFunction(comparator) {
	  return isString(comparator) ? function (i, ele) {
	    return matches(ele, comparator);
	  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
	    return comparator.is(ele);
	  } : !comparator ? function () {
	    return false;
	  } : function (i, ele) {
	    return ele === comparator;
	  };
	}

	fn.filter = function (comparator) {
	  var compare = getCompareFunction(comparator);
	  return cash(filter.call(this, function (ele, i) {
	    return compare.call(ele, i, ele);
	  }));
	}; // @require collection/filter.ts


	function filtered(collection, comparator) {
	  return !comparator ? collection : collection.filter(comparator);
	} // @require ./type_checking.ts


	var splitValuesRe = /\S+/g;

	function getSplitValues(str) {
	  return isString(str) ? str.match(splitValuesRe) || [] : [];
	}

	fn.hasClass = function (cls) {
	  return !!cls && some.call(this, function (ele) {
	    return isElement(ele) && ele.classList.contains(cls);
	  });
	};

	fn.removeAttr = function (attr) {
	  var attrs = getSplitValues(attr);
	  return this.each(function (i, ele) {
	    if (!isElement(ele)) return;
	    each(attrs, function (i, a) {
	      ele.removeAttribute(a);
	    });
	  });
	};

	function attr(attr, value) {
	  if (!attr) return;

	  if (isString(attr)) {
	    if (arguments.length < 2) {
	      if (!this[0] || !isElement(this[0])) return;
	      var value_1 = this[0].getAttribute(attr);
	      return isNull(value_1) ? undefined : value_1;
	    }

	    if (isUndefined(value)) return this;
	    if (isNull(value)) return this.removeAttr(attr);
	    return this.each(function (i, ele) {
	      if (!isElement(ele)) return;
	      ele.setAttribute(attr, value);
	    });
	  }

	  for (var key in attr) {
	    this.attr(key, attr[key]);
	  }

	  return this;
	}

	fn.attr = attr;

	fn.toggleClass = function (cls, force) {
	  var classes = getSplitValues(cls),
	      isForce = !isUndefined(force);
	  return this.each(function (i, ele) {
	    if (!isElement(ele)) return;
	    each(classes, function (i, c) {
	      if (isForce) {
	        force ? ele.classList.add(c) : ele.classList.remove(c);
	      } else {
	        ele.classList.toggle(c);
	      }
	    });
	  });
	};

	fn.addClass = function (cls) {
	  return this.toggleClass(cls, true);
	};

	fn.removeClass = function (cls) {
	  if (arguments.length) return this.toggleClass(cls, false);
	  return this.attr('class', '');
	};

	function pluck(arr, prop, deep, until) {
	  var plucked = [],
	      isCallback = isFunction(prop),
	      compare = until && getCompareFunction(until);

	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (isCallback) {
	      var val_1 = prop(arr[i]);
	      if (val_1.length) push.apply(plucked, val_1);
	    } else {
	      var val_2 = arr[i][prop];

	      while (val_2 != null) {
	        if (until && compare(-1, val_2)) break;
	        plucked.push(val_2);
	        val_2 = deep ? val_2[prop] : null;
	      }
	    }
	  }

	  return plucked;
	}

	function unique(arr) {
	  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
	    return indexOf.call(self, item) === index;
	  }) : arr;
	}

	cash.unique = unique;

	fn.add = function (selector, context) {
	  return cash(unique(this.get().concat(cash(selector, context).get())));
	}; // @require core/type_checking.ts
	// @require core/variables.ts


	function computeStyle(ele, prop, isVariable) {
	  if (!isElement(ele)) return;
	  var style = win.getComputedStyle(ele, null);
	  return isVariable ? style.getPropertyValue(prop) || undefined : style[prop];
	} // @require ./compute_style.ts


	function computeStyleInt(ele, prop) {
	  return parseInt(computeStyle(ele, prop), 10) || 0;
	}

	var cssVariableRe = /^--/; // @require ./variables.ts

	function isCSSVariable(prop) {
	  return cssVariableRe.test(prop);
	} // @require core/camel_case.ts
	// @require core/cash.ts
	// @require core/each.ts
	// @require core/variables.ts
	// @require ./is_css_variable.ts


	var prefixedProps = {},
	    style = div.style,
	    vendorsPrefixes = ['webkit', 'moz', 'ms'];

	function getPrefixedProp(prop, isVariable) {
	  if (isVariable === void 0) {
	    isVariable = isCSSVariable(prop);
	  }

	  if (isVariable) return prop;

	  if (!prefixedProps[prop]) {
	    var propCC = camelCase(prop),
	        propUC = "" + propCC[0].toUpperCase() + propCC.slice(1),
	        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
	    each(props, function (i, p) {
	      if (p in style) {
	        prefixedProps[prop] = p;
	        return false;
	      }
	    });
	  }

	  return prefixedProps[prop];
	}

	; // @require core/type_checking.ts
	// @require ./is_css_variable.ts

	var numericProps = {
	  animationIterationCount: true,
	  columnCount: true,
	  flexGrow: true,
	  flexShrink: true,
	  fontWeight: true,
	  gridArea: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnStart: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowStart: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  widows: true,
	  zIndex: true
	};

	function getSuffixedValue(prop, value, isVariable) {
	  if (isVariable === void 0) {
	    isVariable = isCSSVariable(prop);
	  }

	  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
	}

	function css(prop, value) {
	  if (isString(prop)) {
	    var isVariable_1 = isCSSVariable(prop);
	    prop = getPrefixedProp(prop, isVariable_1);
	    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
	    if (!prop) return this;
	    value = getSuffixedValue(prop, value, isVariable_1);
	    return this.each(function (i, ele) {
	      if (!isElement(ele)) return;

	      if (isVariable_1) {
	        ele.style.setProperty(prop, value);
	      } else {
	        ele.style[prop] = value;
	      }
	    });
	  }

	  for (var key in prop) {
	    this.css(key, prop[key]);
	  }

	  return this;
	}

	;
	fn.css = css; // @optional ./css.ts
	// @require core/attempt.ts
	// @require core/camel_case.ts

	var JSONStringRe = /^\s+|\s+$/;

	function getData(ele, key) {
	  var value = ele.dataset[key] || ele.dataset[camelCase(key)];
	  if (JSONStringRe.test(value)) return value;
	  return attempt(JSON.parse, value);
	} // @require core/attempt.ts
	// @require core/camel_case.ts


	function setData(ele, key, value) {
	  value = attempt(JSON.stringify, value);
	  ele.dataset[camelCase(key)] = value;
	}

	function data(name, value) {
	  if (!name) {
	    if (!this[0]) return;
	    var datas = {};

	    for (var key in this[0].dataset) {
	      datas[key] = getData(this[0], key);
	    }

	    return datas;
	  }

	  if (isString(name)) {
	    if (arguments.length < 2) return this[0] && getData(this[0], name);
	    if (isUndefined(value)) return this;
	    return this.each(function (i, ele) {
	      setData(ele, name, value);
	    });
	  }

	  for (var key in name) {
	    this.data(key, name[key]);
	  }

	  return this;
	}

	fn.data = data; // @optional ./data.ts

	function getDocumentDimension(doc, dimension) {
	  var docEle = doc.documentElement;
	  return Math.max(doc.body["scroll" + dimension], docEle["scroll" + dimension], doc.body["offset" + dimension], docEle["offset" + dimension], docEle["client" + dimension]);
	} // @require css/helpers/compute_style_int.ts


	function getExtraSpace(ele, xAxis) {
	  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
	}

	each([true, false], function (i, outer) {
	  each(['Width', 'Height'], function (i, prop) {
	    var name = "" + (outer ? 'outer' : 'inner') + prop;

	    fn[name] = function (includeMargins) {
	      if (!this[0]) return;
	      if (isWindow(this[0])) return outer ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
	      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
	      return this[0]["" + (outer ? 'offset' : 'client') + prop] + (includeMargins && outer ? computeStyleInt(this[0], "margin" + (i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin" + (i ? 'Bottom' : 'Right')) : 0);
	    };
	  });
	});
	each(['Width', 'Height'], function (index, prop) {
	  var propLC = prop.toLowerCase();

	  fn[propLC] = function (value) {
	    if (!this[0]) return isUndefined(value) ? undefined : this;

	    if (!arguments.length) {
	      if (isWindow(this[0])) return this[0].document.documentElement["client" + prop];
	      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
	      return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
	    }

	    var valueNumber = parseInt(value, 10);
	    return this.each(function (i, ele) {
	      if (!isElement(ele)) return;
	      var boxSizing = computeStyle(ele, 'boxSizing');
	      ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
	    });
	  };
	}); // @optional ./inner_outer.ts
	// @optional ./normal.ts
	// @require css/helpers/compute_style.ts

	var defaultDisplay = {};

	function getDefaultDisplay(tagName) {
	  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
	  var ele = createElement(tagName);
	  doc.body.insertBefore(ele, null);
	  var display = computeStyle(ele, 'display');
	  doc.body.removeChild(ele);
	  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
	} // @require css/helpers/compute_style.ts


	function isHidden(ele) {
	  return computeStyle(ele, 'display') === 'none';
	}

	var displayProperty = '___cd';

	fn.toggle = function (force) {
	  return this.each(function (i, ele) {
	    if (!isElement(ele)) return;
	    var show = isUndefined(force) ? isHidden(ele) : force;

	    if (show) {
	      ele.style.display = ele[displayProperty] || '';

	      if (isHidden(ele)) {
	        ele.style.display = getDefaultDisplay(ele.tagName);
	      }
	    } else {
	      ele[displayProperty] = computeStyle(ele, 'display');
	      ele.style.display = 'none';
	    }
	  });
	};

	fn.hide = function () {
	  return this.toggle(false);
	};

	fn.show = function () {
	  return this.toggle(true);
	}; // @optional ./hide.ts
	// @optional ./show.ts
	// @optional ./toggle.ts


	function hasNamespaces(ns1, ns2) {
	  return !ns2 || !some.call(ns2, function (ns) {
	    return ns1.indexOf(ns) < 0;
	  });
	}

	var eventsNamespace = '___ce',
	    eventsNamespacesSeparator = '.',
	    eventsFocus = {
	  focus: 'focusin',
	  blur: 'focusout'
	},
	    eventsHover = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	},
	    eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

	function getEventNameBubbling(name) {
	  return eventsHover[name] || eventsFocus[name] || name;
	} // @require ./variables.ts


	function getEventsCache(ele) {
	  return ele[eventsNamespace] = ele[eventsNamespace] || {};
	} // @require core/guid.ts
	// @require events/helpers/get_events_cache.ts


	function addEvent(ele, name, namespaces, selector, callback) {
	  var eventCache = getEventsCache(ele);
	  eventCache[name] = eventCache[name] || [];
	  eventCache[name].push([namespaces, selector, callback]);
	  ele.addEventListener(name, callback);
	} // @require ./variables.ts


	function parseEventName(eventName) {
	  var parts = eventName.split(eventsNamespacesSeparator);
	  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
	} // @require ./get_events_cache.ts
	// @require ./has_namespaces.ts
	// @require ./parse_event_name.ts


	function removeEvent(ele, name, namespaces, selector, callback) {
	  var cache = getEventsCache(ele);

	  if (!name) {
	    for (name in cache) {
	      removeEvent(ele, name, namespaces, selector, callback);
	    }
	  } else if (cache[name]) {
	    cache[name] = cache[name].filter(function (_a) {
	      var ns = _a[0],
	          sel = _a[1],
	          cb = _a[2];
	      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
	      ele.removeEventListener(name, cb);
	    });
	  }
	}

	fn.off = function (eventFullName, selector, callback) {
	  var _this = this;

	  if (isUndefined(eventFullName)) {
	    this.each(function (i, ele) {
	      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
	      removeEvent(ele);
	    });
	  } else if (!isString(eventFullName)) {
	    for (var key in eventFullName) {
	      this.off(key, eventFullName[key]);
	    }
	  } else {
	    if (isFunction(selector)) {
	      callback = selector;
	      selector = '';
	    }

	    each(getSplitValues(eventFullName), function (i, eventFullName) {
	      var _a = parseEventName(getEventNameBubbling(eventFullName)),
	          name = _a[0],
	          namespaces = _a[1];

	      _this.each(function (i, ele) {
	        if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
	        removeEvent(ele, name, namespaces, selector, callback);
	      });
	    });
	  }

	  return this;
	};

	function on(eventFullName, selector, data, callback, _one) {
	  var _this = this;

	  if (!isString(eventFullName)) {
	    for (var key in eventFullName) {
	      this.on(key, selector, data, eventFullName[key], _one);
	    }

	    return this;
	  }

	  if (!isString(selector)) {
	    if (isUndefined(selector) || isNull(selector)) {
	      selector = '';
	    } else if (isUndefined(data)) {
	      data = selector;
	      selector = '';
	    } else {
	      callback = data;
	      data = selector;
	      selector = '';
	    }
	  }

	  if (!isFunction(callback)) {
	    callback = data;
	    data = undefined;
	  }

	  if (!callback) return this;
	  each(getSplitValues(eventFullName), function (i, eventFullName) {
	    var _a = parseEventName(getEventNameBubbling(eventFullName)),
	        name = _a[0],
	        namespaces = _a[1];

	    if (!name) return;

	    _this.each(function (i, ele) {
	      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;

	      var finalCallback = function finalCallback(event) {
	        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
	        var thisArg = ele;

	        if (selector) {
	          var target = event.target;

	          while (!matches(target, selector)) {
	            if (target === ele) return;
	            target = target.parentNode;
	            if (!target) return;
	          }

	          thisArg = target;
	          event.___cd = true; // Delegate
	        }

	        if (event.___cd) {
	          Object.defineProperty(event, 'currentTarget', {
	            configurable: true,
	            get: function get() {
	              return thisArg;
	            }
	          });
	        }

	        Object.defineProperty(event, 'data', {
	          configurable: true,
	          get: function get() {
	            return data;
	          }
	        });
	        var returnValue = callback.call(thisArg, event, event.___td);

	        if (_one) {
	          removeEvent(ele, name, namespaces, selector, finalCallback);
	        }

	        if (returnValue === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	      };

	      finalCallback.guid = callback.guid = callback.guid || cash.guid++;
	      addEvent(ele, name, namespaces, selector, finalCallback);
	    });
	  });
	  return this;
	}

	fn.on = on;

	function one(eventFullName, selector, data, callback) {
	  return this.on(eventFullName, selector, data, callback, true);
	}

	;
	fn.one = one;

	fn.ready = function (callback) {
	  var cb = function cb() {
	    return attempt(callback, cash);
	  };

	  if (doc.readyState !== 'loading') {
	    cb();
	  } else {
	    doc.addEventListener('DOMContentLoaded', cb);
	  }

	  return this;
	};

	fn.trigger = function (event, data) {
	  if (isString(event)) {
	    var _a = parseEventName(event),
	        name_1 = _a[0],
	        namespaces = _a[1];

	    if (!name_1) return this;
	    var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
	    event = doc.createEvent(type);
	    event.initEvent(name_1, true, true);
	    event.namespace = namespaces.join(eventsNamespacesSeparator);
	  }

	  event.___td = data;
	  var isEventFocus = event.type in eventsFocus;
	  return this.each(function (i, ele) {
	    if (isEventFocus && isFunction(ele[event.type])) {
	      ele[event.type]();
	    } else {
	      ele.dispatchEvent(event);
	    }
	  });
	}; // @optional ./off.ts
	// @optional ./on.ts
	// @optional ./one.ts
	// @optional ./ready.ts
	// @optional ./trigger.ts
	// @require core/pluck.ts
	// @require core/variables.ts


	function getValue(ele) {
	  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
	    return option.selected && !option.disabled && !option.parentNode.disabled;
	  }), 'value');
	  return ele.value || '';
	}

	var queryEncodeSpaceRe = /%20/g,
	    queryEncodeCRLFRe = /\r?\n/g;

	function queryEncode(prop, value) {
	  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+');
	}

	var skippableRe = /file|reset|submit|button|image/i,
	    checkableRe = /radio|checkbox/i;

	fn.serialize = function () {
	  var query = '';
	  this.each(function (i, ele) {
	    each(ele.elements || [ele], function (i, ele) {
	      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
	      var value = getValue(ele);

	      if (!isUndefined(value)) {
	        var values = isArray(value) ? value : [value];
	        each(values, function (i, value) {
	          query += queryEncode(ele.name, value);
	        });
	      }
	    });
	  });
	  return query.slice(1);
	};

	function val(value) {
	  if (!arguments.length) return this[0] && getValue(this[0]);
	  return this.each(function (i, ele) {
	    var isSelect = ele.multiple && ele.options;

	    if (isSelect || checkableRe.test(ele.type)) {
	      var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];

	      if (isSelect) {
	        each(ele.options, function (i, option) {
	          option.selected = eleValue_1.indexOf(option.value) >= 0;
	        }, true);
	      } else {
	        ele.checked = eleValue_1.indexOf(ele.value) >= 0;
	      }
	    } else {
	      ele.value = isUndefined(value) || isNull(value) ? '' : value;
	    }
	  });
	}

	fn.val = val;

	fn.clone = function () {
	  return this.map(function (i, ele) {
	    return ele.cloneNode(true);
	  });
	};

	fn.detach = function (comparator) {
	  filtered(this, comparator).each(function (i, ele) {
	    if (ele.parentNode) {
	      ele.parentNode.removeChild(ele);
	    }
	  });
	  return this;
	};

	var fragmentRe = /^\s*<(\w+)[^>]*>/,
	    singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
	var containers = {
	  '*': div,
	  tr: tbody,
	  td: tr,
	  th: tr,
	  thead: table,
	  tbody: table,
	  tfoot: table
	}; //TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
	//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

	function parseHTML(html) {
	  if (!isString(html)) return [];
	  if (singleTagRe.test(html)) return [createElement(RegExp.$1)];
	  var fragment = fragmentRe.test(html) && RegExp.$1,
	      container = containers[fragment] || containers['*'];
	  container.innerHTML = html;
	  return cash(container.childNodes).detach().get();
	}

	cash.parseHTML = parseHTML;

	fn.empty = function () {
	  return this.each(function (i, ele) {
	    while (ele.firstChild) {
	      ele.removeChild(ele.firstChild);
	    }
	  });
	};

	function html(html) {
	  if (!arguments.length) return this[0] && this[0].innerHTML;
	  if (isUndefined(html)) return this;
	  return this.each(function (i, ele) {
	    if (!isElement(ele)) return;
	    ele.innerHTML = html;
	  });
	}

	fn.html = html;

	fn.remove = function (comparator) {
	  filtered(this, comparator).detach().off();
	  return this;
	};

	function text(text) {
	  if (isUndefined(text)) return this[0] ? this[0].textContent : '';
	  return this.each(function (i, ele) {
	    if (!isElement(ele)) return;
	    ele.textContent = text;
	  });
	}

	;
	fn.text = text;

	fn.unwrap = function () {
	  this.parent().each(function (i, ele) {
	    if (ele.tagName === 'BODY') return;
	    var $ele = cash(ele);
	    $ele.replaceWith($ele.children());
	  });
	  return this;
	};

	fn.offset = function () {
	  var ele = this[0];
	  if (!ele) return;
	  var rect = ele.getBoundingClientRect();
	  return {
	    top: rect.top + win.pageYOffset,
	    left: rect.left + win.pageXOffset
	  };
	};

	fn.offsetParent = function () {
	  return this.map(function (i, ele) {
	    var offsetParent = ele.offsetParent;

	    while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
	      offsetParent = offsetParent.offsetParent;
	    }

	    return offsetParent || docEle;
	  });
	};

	fn.position = function () {
	  var ele = this[0];
	  if (!ele) return;
	  var isFixed = computeStyle(ele, 'position') === 'fixed',
	      offset = isFixed ? ele.getBoundingClientRect() : this.offset();

	  if (!isFixed) {
	    var doc_1 = ele.ownerDocument;
	    var offsetParent = ele.offsetParent || doc_1.documentElement;

	    while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
	      offsetParent = offsetParent.parentNode;
	    }

	    if (offsetParent !== ele && isElement(offsetParent)) {
	      var parentOffset = cash(offsetParent).offset();
	      offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
	      offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
	    }
	  }

	  return {
	    top: offset.top - computeStyleInt(ele, 'marginTop'),
	    left: offset.left - computeStyleInt(ele, 'marginLeft')
	  };
	};

	fn.children = function (comparator) {
	  return filtered(cash(unique(pluck(this, function (ele) {
	    return ele.children;
	  }))), comparator);
	};

	fn.contents = function () {
	  return cash(unique(pluck(this, function (ele) {
	    return ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes;
	  })));
	};

	fn.find = function (selector) {
	  return cash(unique(pluck(this, function (ele) {
	    return find(selector, ele);
	  })));
	}; // @require core/variables.ts
	// @require collection/filter.ts
	// @require traversal/find.ts


	var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	    scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
	    scriptAttributes = ['type', 'src', 'nonce', 'noModule'];

	function evalScripts(node, doc) {
	  var collection = cash(node);
	  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
	    if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
	      // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
	      var script_1 = createElement('script');
	      script_1.text = ele.textContent.replace(HTMLCDATARe, '');
	      each(scriptAttributes, function (i, attr) {
	        if (ele[attr]) script_1[attr] = ele[attr];
	      });
	      doc.head.insertBefore(script_1, null);
	      doc.head.removeChild(script_1);
	    }
	  });
	} // @require ./eval_scripts.ts


	function insertElement(anchor, target, left, inside, evaluate) {
	  if (inside) {
	    // prepend/append
	    anchor.insertBefore(target, left ? anchor.firstChild : null);
	  } else {
	    // before/after
	    anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
	  }

	  if (evaluate) {
	    evalScripts(target, anchor.ownerDocument);
	  }
	} // @require ./insert_element.ts


	function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
	  each(selectors, function (si, selector) {
	    each(cash(selector), function (ti, target) {
	      each(cash(anchors), function (ai, anchor) {
	        var anchorFinal = inverse ? target : anchor,
	            targetFinal = inverse ? anchor : target,
	            indexFinal = inverse ? ti : ai;
	        insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
	      }, reverseLoop3);
	    }, reverseLoop2);
	  }, reverseLoop1);
	  return anchors;
	}

	fn.after = function () {
	  return insertSelectors(arguments, this, false, false, false, true, true);
	};

	fn.append = function () {
	  return insertSelectors(arguments, this, false, false, true);
	};

	fn.appendTo = function (selector) {
	  return insertSelectors(arguments, this, true, false, true);
	};

	fn.before = function () {
	  return insertSelectors(arguments, this, false, true);
	};

	fn.insertAfter = function (selector) {
	  return insertSelectors(arguments, this, true, false, false, false, false, true);
	};

	fn.insertBefore = function (selector) {
	  return insertSelectors(arguments, this, true, true);
	};

	fn.prepend = function () {
	  return insertSelectors(arguments, this, false, true, true, true, true);
	};

	fn.prependTo = function (selector) {
	  return insertSelectors(arguments, this, true, true, true, false, false, true);
	};

	fn.replaceWith = function (selector) {
	  return this.before(selector).remove();
	};

	fn.replaceAll = function (selector) {
	  cash(selector).replaceWith(this);
	  return this;
	};

	fn.wrapAll = function (selector) {
	  var structure = cash(selector),
	      wrapper = structure[0];

	  while (wrapper.children.length) {
	    wrapper = wrapper.firstElementChild;
	  }

	  this.first().before(structure);
	  return this.appendTo(wrapper);
	};

	fn.wrap = function (selector) {
	  return this.each(function (i, ele) {
	    var wrapper = cash(selector)[0];
	    cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
	  });
	};

	fn.wrapInner = function (selector) {
	  return this.each(function (i, ele) {
	    var $ele = cash(ele),
	        contents = $ele.contents();
	    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
	  });
	};

	fn.has = function (selector) {
	  var comparator = isString(selector) ? function (i, ele) {
	    return find(selector, ele).length;
	  } : function (i, ele) {
	    return ele.contains(selector);
	  };
	  return this.filter(comparator);
	};

	fn.is = function (comparator) {
	  var compare = getCompareFunction(comparator);
	  return some.call(this, function (ele, i) {
	    return compare.call(ele, i, ele);
	  });
	};

	fn.next = function (comparator, _all, _until) {
	  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
	};

	fn.nextAll = function (comparator) {
	  return this.next(comparator, true);
	};

	fn.nextUntil = function (until, comparator) {
	  return this.next(comparator, true, until);
	};

	fn.not = function (comparator) {
	  var compare = getCompareFunction(comparator);
	  return this.filter(function (i, ele) {
	    return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
	  });
	};

	fn.parent = function (comparator) {
	  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
	};

	fn.index = function (selector) {
	  var child = selector ? cash(selector)[0] : this[0],
	      collection = selector ? this : cash(child).parent().children();
	  return indexOf.call(collection, child);
	};

	fn.closest = function (comparator) {
	  var filtered = this.filter(comparator);
	  if (filtered.length) return filtered;
	  var $parent = this.parent();
	  if (!$parent.length) return filtered;
	  return $parent.closest(comparator);
	};

	fn.parents = function (comparator, _until) {
	  return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
	};

	fn.parentsUntil = function (until, comparator) {
	  return this.parents(comparator, until);
	};

	fn.prev = function (comparator, _all, _until) {
	  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
	};

	fn.prevAll = function (comparator) {
	  return this.prev(comparator, true);
	};

	fn.prevUntil = function (until, comparator) {
	  return this.prev(comparator, true, until);
	};

	fn.siblings = function (comparator) {
	  return filtered(cash(unique(pluck(this, function (ele) {
	    return cash(ele).parent().children().not(ele);
	  }))), comparator);
	}; // @optional ./children.ts
	// @optional ./closest.ts
	// @optional ./contents.ts
	// @optional ./find.ts
	// @optional ./has.ts
	// @optional ./is.ts
	// @optional ./next.ts
	// @optional ./next_all.ts
	// @optional ./next_until.ts
	// @optional ./not.ts
	// @optional ./parent.ts
	// @optional ./parents.ts
	// @optional ./parents_until.ts
	// @optional ./prev.ts
	// @optional ./prev_all.ts
	// @optional ./prev_until.ts
	// @optional ./siblings.ts
	// @optional attributes/index.ts
	// @optional collection/index.ts
	// @optional css/index.ts
	// @optional data/index.ts
	// @optional dimensions/index.ts
	// @optional effects/index.ts
	// @optional events/index.ts
	// @optional forms/index.ts
	// @optional manipulation/index.ts
	// @optional offset/index.ts
	// @optional traversal/index.ts
	// @require core/index.ts
	// @priority -100
	// @require ./cash.ts
	// @require ./variables.ts


	if (true) {
	  // Node.js
	  module.exports = cash;
	} else {
	  // Browser
	  win['cash'] = win['$'] = cash;
	}
	})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery scrollintoview() plugin and :scrollable selector filter
	 *
	 * Version 1.9.4 (06 April 2016)
	 * Requires jQuery 1.4 or newer
	 *
	 * Copyright (c) 2011 Robert Koritnik
	 * Licensed under the terms of the MIT license
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	!function(root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        factory(require('jquery'));
	    } else {
	        factory(root.jQuery);
	    }
	}
	(this, function($) {
	    var converter = {
	        vertical: { x: false, y: true },
	        horizontal: { x: true, y: false },
	        both: { x: true, y: true },
	        x: { x: true, y: false },
	        y: { x: false, y: true }
	    };

	    var settings = {
	        duration: "fast",
	        direction: "both",
	        viewPadding: 0
	    };

	    var rootrx = /^(?:html)$/i;

	    // gets border dimensions
	    var borders = function(domElement, styles) {
	        styles = styles || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(domElement, null) : domElement.currentStyle);
	        var px = document.defaultView && document.defaultView.getComputedStyle ? true : false;
	        var b = {
	            top: (parseFloat(px ? styles.borderTopWidth : $.css(domElement, "borderTopWidth")) || 0),
	            left: (parseFloat(px ? styles.borderLeftWidth : $.css(domElement, "borderLeftWidth")) || 0),
	            bottom: (parseFloat(px ? styles.borderBottomWidth : $.css(domElement, "borderBottomWidth")) || 0),
	            right: (parseFloat(px ? styles.borderRightWidth : $.css(domElement, "borderRightWidth")) || 0)
	        };
	        return {
	            top: b.top,
	            left: b.left,
	            bottom: b.bottom,
	            right: b.right,
	            vertical: b.top + b.bottom,
	            horizontal: b.left + b.right
	        };
	    };

	    var dimensions = function($element) {
	        var elem = $element[0],
	            isRoot = rootrx.test(elem.nodeName),
	            $elem = isRoot ? $(window) : $element;
	        return {
	            border: isRoot ? { top: 0, left: 0, bottom: 0, right: 0 } : borders(elem),
	            scroll: {
	                top: $elem.scrollTop(),
	                left: $elem.scrollLeft(),
	                maxtop: elem.scrollHeight - elem.clientHeight,
	                maxleft: elem.scrollWidth - elem.clientWidth
	            },
	            scrollbar: isRoot
	                ? { right: 0, bottom: 0 }
	                : {
	                    right: $elem.innerWidth() - elem.clientWidth,
	                    bottom: $elem.innerHeight() - elem.clientHeight
	                },
	            rect: isRoot ? { top: 0, left: 0, bottom: elem.clientHeight, right: elem.clientWidth } : elem.getBoundingClientRect()
	        };
	    };

	    $.fn.extend({
	        scrollintoview: function(options) {
	            /// <summary>Scrolls the first element in the set into view by scrolling its closest scrollable parent.</summary>
	            /// <param name="options" type="Object">Additional options that can configure scrolling:
	            ///        duration (default: "fast") - jQuery animation speed (can be a duration string or number of milliseconds)
	            ///        direction (default: "both") - select possible scrollings ("vertical" or "y", "horizontal" or "x", "both")
	            ///        complete (default: none) - a function to call when scrolling completes (called in context of the DOM element being scrolled)
	            /// </param>
	            /// <return type="jQuery">Returns the same jQuery set that this function was run on.</return>

	            options = $.extend({}, settings, options);
	            options.direction = converter[typeof (options.direction) === "string" && options.direction.toLowerCase()] || converter.both;

	            if (typeof options.viewPadding == "number") {
	                options.viewPadding = { x: options.viewPadding, y: options.viewPadding };
	            } else if (typeof options.viewPadding == "object") {
	                if (options.viewPadding.x == undefined) {
	                    options.viewPadding.x = 0;
	                }
	                if (options.viewPadding.y == undefined) {
	                    options.viewPadding.y = 0;
	                }
	            }

	            var dirStr = "";
	            if (options.direction.x === true) dirStr = "horizontal";
	            if (options.direction.y === true) dirStr = dirStr ? "both" : "vertical";

	            var el = this.eq(0);
	            var scroller = el.parent().closest(":scrollable(" + dirStr + ")");

	            // check if there's anything to scroll in the first place
	            if (scroller.length > 0) {
	                scroller = scroller.eq(0);

	                var dim = {
	                    e: dimensions(el),
	                    s: dimensions(scroller)
	                };

	                var rel = {
	                    top: dim.e.rect.top - (dim.s.rect.top + dim.s.border.top),
	                    bottom: dim.s.rect.bottom - dim.s.border.bottom - dim.s.scrollbar.bottom - dim.e.rect.bottom,
	                    left: dim.e.rect.left - (dim.s.rect.left + dim.s.border.left),
	                    right: dim.s.rect.right - dim.s.border.right - dim.s.scrollbar.right - dim.e.rect.right
	                };

	                var animProperties = {};

	                // vertical scroll
	                if (options.direction.y === true) {
	                    if (rel.top < 0) {
	                        animProperties.scrollTop = Math.max(0, dim.s.scroll.top + rel.top - options.viewPadding.y);
	                    } else if (rel.top > 0 && rel.bottom < 0) {
	                        animProperties.scrollTop = Math.min(dim.s.scroll.top + Math.min(rel.top, -rel.bottom) + options.viewPadding.y, dim.s.scroll.maxtop);
	                    }
	                }

	                // horizontal scroll
	                if (options.direction.x === true) {
	                    if (rel.left < 0) {
	                        animProperties.scrollLeft = Math.max(0, dim.s.scroll.left + rel.left - options.viewPadding.x);
	                    } else if (rel.left > 0 && rel.right < 0) {
	                        animProperties.scrollLeft = Math.min(dim.s.scroll.left + Math.min(rel.left, -rel.right) + options.viewPadding.x, dim.s.scroll.maxleft);
	                    }
	                }

	                // scroll if needed
	                if (!$.isEmptyObject(animProperties)) {
	                    var scrollExpect = {},
	                        scrollListener = scroller;

	                    if (rootrx.test(scroller[0].nodeName)) {
	                        scroller = $("html,body");
	                        scrollListener = $(window);
	                    }

	                    function animateStep(now, tween) {
	                        scrollExpect[tween.prop] = Math.floor(now);
	                    };

	                    function onscroll(event) {
	                        $.each(scrollExpect, function(key, value) {
	                            if (Math.floor(scrollListener[key]()) != Math.floor(value)) {
	                                options.complete = null; // don't run complete function if the scrolling was interrupted
	                                scroller.stop('scrollintoview');
	                            }
	                        });
	                    }

	                    scrollListener.on('scroll', onscroll);

	                    scroller
	                        .stop('scrollintoview')
	                        .animate(animProperties, { duration: options.duration, step: animateStep, queue: 'scrollintoview' })
	                        .eq(0) // we want function to be called just once (ref. "html,body")
	                        .queue('scrollintoview', function(next) {
	                            scrollListener.off('scroll', onscroll);
	                            $.isFunction(options.complete) && options.complete.call(scroller[0]);
	                            next();
	                        })

	                    scroller.dequeue('scrollintoview');
	                } else {
	                    // when there's nothing to scroll, just call the "complete" function
	                    $.isFunction(options.complete) && options.complete.call(scroller[0]);
	                }
	            }

	            // return set back
	            return this;
	        }
	    });

	    var scrollValue = {
	        auto: true,
	        scroll: true,
	        visible: false,
	        hidden: false
	    };

	    var scroll = function(element, direction) {
	        direction = converter[typeof (direction) === "string" && direction.toLowerCase()] || converter.both;
	        var styles = (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(element, null) : element.currentStyle);
	        var overflow = {
	            x: scrollValue[styles.overflowX.toLowerCase()] || false,
	            y: scrollValue[styles.overflowY.toLowerCase()] || false,
	            isRoot: rootrx.test(element.nodeName)
	        };

	        // check if completely unscrollable (exclude HTML element because it's special)
	        if (!overflow.x && !overflow.y && !overflow.isRoot) {
	            return false;
	        }

	        var size = {
	            height: {
	                scroll: element.scrollHeight,
	                client: element.clientHeight
	            },
	            width: {
	                scroll: element.scrollWidth,
	                client: element.clientWidth
	            },
	            // check overflow.x/y because iPad (and possibly other tablets) don't dislay scrollbars
	            scrollableX: function() {
	                return (overflow.x || overflow.isRoot) && this.width.scroll > this.width.client;
	            },
	            scrollableY: function() {
	                return (overflow.y || overflow.isRoot) && this.height.scroll > this.height.client;
	            }
	        };
	        return direction.y && size.scrollableY() || direction.x && size.scrollableX();
	    };

	    $.expr[":"].scrollable = $.expr.createPseudo(function(direction) {
	        return function(element) {
	            return scroll(element, direction);
	        };
	    });
	});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ])
});
;