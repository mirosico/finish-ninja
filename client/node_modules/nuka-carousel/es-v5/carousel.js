function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable complexity */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import { getIndexes, addEvent, removeEvent, getNextMoveIndex, getPrevMoveIndex } from './utils';
import AnnounceSlide from './announce-slide';
export var Carousel = function Carousel(props) {
  var count = React.Children.count(props.children);

  var _useState = useState(props.autoplayReverse ? count - props.slidesToShow : props.slideIndex),
      _useState2 = _slicedToArray(_useState, 2),
      currentSlide = _useState2[0],
      setCurrentSlide = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      animation = _useState4[0],
      setAnimation = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      pause = _useState6[0],
      setPause = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      dragging = _useState8[0],
      setDragging = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      move = _useState10[0],
      setMove = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      frameHeight = _useState12[0],
      setFrameHeight = _useState12[1];

  var visibleHeights = useRef([]);

  var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      keyboardMove = _useState14[0],
      setKeyboardMove = _useState14[1];

  var carouselWidth = useRef(null);
  var focus = useRef(false);
  var prevMove = useRef(0);
  var carouselEl = useRef(null);
  var timer = useRef(null);
  var isMounted = useRef(true);
  useEffect(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  useEffect(function () {
    // disable img draggable attribute by default, this will improve the dragging
    document.querySelectorAll('.slider-list img').forEach(function (el) {
      return el.setAttribute('draggable', 'false');
    });
  }, []);
  var slidesToScroll = props.animation === 'fade' ? props.slidesToShow : props.slidesToScroll;
  var dragThreshold = (carouselWidth.current || 0) / props.slidesToShow / 2;
  var carouselRef = props.innerRef || carouselEl;
  var getNextIndex = useCallback(function (to) {
    var index = to !== null && to !== void 0 ? to : currentSlide;

    if (index < 0) {
      return index + count;
    }

    if (index === count) {
      return 0;
    }

    return index;
  }, [count, currentSlide]);

  var moveSlide = function moveSlide(to) {
    var _getIndexes = getIndexes(currentSlide, currentSlide - slidesToScroll, count),
        _getIndexes2 = _slicedToArray(_getIndexes, 1),
        slide = _getIndexes2[0];

    var nextIndex = getNextIndex(to);
    typeof to === 'number' && props.beforeSlide(slide, nextIndex);
    !props.disableAnimation && setAnimation(true);
    setCurrentSlide(to !== null && to !== void 0 ? to : currentSlide);
    setTimeout(function () {
      if (!isMounted.current) return;
      typeof to === 'number' && props.afterSlide(nextIndex);
      !props.disableAnimation && setAnimation(false);
    }, !props.disableAnimation ? props.speed || 500 : 40); // if animation is disabled decrease the speed to 40
  };

  var nextSlide = function nextSlide() {
    if (props.wrapAround || currentSlide < count - props.slidesToScroll) {
      var nextPosition = getNextMoveIndex(props.scrollMode, props.wrapAround, currentSlide, count, props.slidesToScroll, props.slidesToShow);
      moveSlide(nextPosition);
    } else {
      moveSlide();
    }
  };

  var prevSlide = function prevSlide() {
    // boundary
    if (props.wrapAround || currentSlide > 0) {
      var prevPosition = getPrevMoveIndex(props.scrollMode, props.wrapAround, currentSlide, props.slidesToScroll);
      moveSlide(prevPosition);
    } else {
      moveSlide();
    }
  };

  useEffect(function () {
    if (typeof props.slideIndex === 'number' && !props.autoplayReverse) {
      moveSlide(props.slideIndex);
    }
  }, [props.slideIndex]);
  useEffect(function () {
    if (props.autoplay && !animation && props.wrapAround) {
      if (currentSlide > count) {
        setCurrentSlide(currentSlide - count);

        if (timer !== null && timer !== void 0 && timer.current) {
          clearTimeout(timer.current);
        }
      } else if (currentSlide < 0) {
        setCurrentSlide(count - -currentSlide);

        if (timer !== null && timer !== void 0 && timer.current) {
          clearTimeout(timer.current);
        }
      }
    }
  }, [animation, currentSlide]);
  useEffect(function () {
    if (props.autoplay && !pause) {
      timer.current = setTimeout(function () {
        if (props.autoplayReverse) {
          if (!props.wrapAround && currentSlide > 0) {
            prevSlide();
          } else if (props.wrapAround) {
            prevSlide();
          }
        } else if (!props.wrapAround && currentSlide < count - props.slidesToShow) {
          nextSlide();
        } else if (props.wrapAround) {
          nextSlide();
        }
      }, props.autoplayInterval);
    } // Clear the timeout if user hover on carousel


    if (props.autoplay && pause && timer !== null && timer !== void 0 && timer.current) {
      clearTimeout(timer.current);
    }

    return function () {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [currentSlide, pause]);
  useEffect(function () {
    // makes the loop infinity
    if (props.wrapAround && !props.autoplay) {
      // if animation is disabled decrease the speed to 0
      var speed = !props.disableAnimation ? props.speed || 500 : 0;

      if (currentSlide <= -props.slidesToShow) {
        // prev
        setTimeout(function () {
          if (!isMounted.current) return;
          setCurrentSlide(count - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= count) {
        // next
        setTimeout(function () {
          if (!isMounted.current) return;
          setCurrentSlide(currentSlide - count);
        }, speed + 10);
      }
    }
  }, [currentSlide]);
  useEffect(function () {
    if (props.enableKeyboardControls && keyboardMove && focus.current) {
      switch (keyboardMove) {
        case 'nextSlide':
          nextSlide();
          break;

        case 'previousSlide':
          prevSlide();
          break;

        case 'firstSlide':
          setCurrentSlide(0);
          break;

        case 'lastSlide':
          setCurrentSlide(count - props.slidesToShow);
          break;

        case 'pause':
          if (pause && props.autoplay) {
            setPause(false);
            break;
          } else if (props.autoplay) {
            setPause(true);
            break;
          }

          break;
      }

      setKeyboardMove(null);
    }
  }, [keyboardMove]);

  var onKeyPress = function onKeyPress(e) {
    if (props.enableKeyboardControls && focus.current && e.keyCode) {
      var keyConfig = props.keyCodeConfig;

      for (var func in keyConfig) {
        var _keyConfig;

        if ((_keyConfig = keyConfig[func]) !== null && _keyConfig !== void 0 && _keyConfig.includes(e.keyCode)) {
          setKeyboardMove(func);
        }
      }
    }
  };

  useEffect(function () {
    if (carouselEl && carouselEl.current) {
      carouselWidth.current = carouselEl.current.offsetWidth;
    } else if (props.innerRef) {
      carouselWidth.current = props.innerRef.current.offsetWidth;
    }

    if (props.enableKeyboardControls) {
      addEvent(document, 'keydown', onKeyPress);
    }

    return function () {
      removeEvent(document, 'keydown', onKeyPress);
    };
  }, []);

  var handleDragEnd = function handleDragEnd(e) {
    if (!props.dragging || !dragging) return;
    setDragging(false);
    props.onDragEnd(e);

    if (Math.abs(move) <= dragThreshold) {
      moveSlide();
      setMove(0);
      prevMove.current = 0;
      return;
    }

    if (move > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setMove(0);
    prevMove.current = 0;
  };

  var onTouchStart = function onTouchStart(e) {
    if (!props.swiping) {
      return;
    }

    setDragging(true);
    props.onDragStart(e);
  };

  var handlePointerMove = function handlePointerMove(m) {
    if (!props.dragging || !dragging) return;
    var moveValue = m * 0.75; // Friction

    var moveState = move + (moveValue - prevMove.current); // Exit drag early if passed threshold

    if (Math.abs(move) > dragThreshold) {
      handleDragEnd();
      return;
    }

    if (!props.wrapAround && props.disableEdgeSwiping && (currentSlide <= 0 && moveState <= 0 || moveState > 0 && currentSlide >= count - props.slidesToShow)) {
      prevMove.current = moveValue;
      return;
    }

    if (prevMove.current !== 0) {
      setMove(moveState);
    }

    prevMove.current = moveValue;
  };

  var onTouchMove = function onTouchMove(e) {
    if (!props.dragging || !dragging) return;
    props.onDragStart(e);
    var moveValue = ((carouselWidth === null || carouselWidth === void 0 ? void 0 : carouselWidth.current) || 0) - e.touches[0].pageX;
    handlePointerMove(moveValue);
  };

  var onMouseDown = function onMouseDown(e) {
    var _carouselRef$current;

    if (!props.dragging) return;
    carouselRef === null || carouselRef === void 0 ? void 0 : (_carouselRef$current = carouselRef.current) === null || _carouselRef$current === void 0 ? void 0 : _carouselRef$current.focus();
    setDragging(true);
    props.onDragStart(e);
  };

  var onMouseMove = function onMouseMove(e) {
    var _carouselRef$current2;

    if (!props.dragging || !dragging) return;
    props.onDrag(e);
    var offsetX = e.clientX - (((_carouselRef$current2 = carouselRef.current) === null || _carouselRef$current2 === void 0 ? void 0 : _carouselRef$current2.getBoundingClientRect().left) || 0);
    var moveValue = ((carouselWidth === null || carouselWidth === void 0 ? void 0 : carouselWidth.current) || 0) - offsetX;
    handlePointerMove(moveValue);
  };

  var onMouseUp = function onMouseUp(e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    handleDragEnd(e);
  };

  var onMouseEnter = function onMouseEnter() {
    if (props.pauseOnHover) {
      setPause(true);
    }
  };

  var onMouseLeave = function onMouseLeave() {
    if (props.pauseOnHover) {
      setPause(false);
    }
  };

  var renderSlides = function renderSlides(typeOfSlide) {
    var slides = React.Children.map(props.children, function (child, index) {
      var isCurrentSlide = props.wrapAround ? currentSlide === index || currentSlide === index + count || currentSlide === index - count : currentSlide === index;
      return /*#__PURE__*/React.createElement(Slide, {
        key: "".concat(typeOfSlide, "-").concat(index),
        count: count,
        currentSlide: currentSlide,
        index: index,
        isCurrentSlide: isCurrentSlide,
        typeOfSlide: typeOfSlide,
        wrapAround: props.wrapAround,
        cellSpacing: props.cellSpacing,
        animation: props.animation,
        slidesToShow: props.slidesToShow,
        speed: props.speed,
        zoomScale: props.zoomScale,
        cellAlign: props.cellAlign,
        setFrameHeight: setFrameHeight,
        frameHeight: frameHeight,
        visibleHeights: visibleHeights,
        adaptiveHeight: props.adaptiveHeight
      }, child);
    });
    return slides;
  };

  var _getIndexes3 = getIndexes(currentSlide, currentSlide - slidesToScroll, count),
      _getIndexes4 = _slicedToArray(_getIndexes3, 1),
      slide = _getIndexes4[0];

  return /*#__PURE__*/React.createElement("div", {
    className: 'slider-container',
    style: {
      position: 'relative'
    },
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement(AnnounceSlide, {
    ariaLive: props.autoplay && !pause ? 'off' : 'polite',
    message: props.renderAnnounceSlideMessage({
      currentSlide: slide,
      count: count
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: ['slider-frame', props.className || ''].join(' ').trim(),
    style: _objectSpread({
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      outline: 'none',
      height: props.adaptiveHeight ? "".concat(frameHeight, "px") : 'auto'
    }, props.style),
    "aria-label": props.frameAriaLabel,
    role: "region",
    tabIndex: 0,
    onFocus: function onFocus() {
      return focus.current = true;
    },
    onBlur: function onBlur() {
      return focus.current = false;
    },
    ref: props.innerRef || carouselEl,
    onMouseUp: onMouseUp,
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseUp,
    onTouchStart: onTouchStart,
    onTouchEnd: handleDragEnd,
    onTouchMove: onTouchMove
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider-list",
    style: getSliderListStyles(props.children, currentSlide, animation, props.slidesToShow, props.cellAlign, props.wrapAround, props.speed, move, props.animation)
  }, props.wrapAround ? renderSlides('prev-cloned') : null, renderSlides(), props.wrapAround ? renderSlides('next-cloned') : null)), renderControls(props, count, currentSlide, moveSlide, nextSlide, prevSlide, slidesToScroll));
};
Carousel.defaultProps = defaultProps;
export default Carousel;