import { getBottomDistanceFromElToViewport, getTopDistanceFromElToViewport, scrollBy, scrollEventThrottle, scrollToSection, setBodyScroll } from "../utils/DOM";
import { debounce, throttle } from "@github/mini-throttle";
// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill';


const isClient = typeof window !== 'undefined';

if (isClient) {
  // kick off the polyfill!
  smoothscroll.polyfill();
}


type FlexSnapConfig = {
  anchors: string[],
  autoSizedAnchors?: string[],
}
type DataType = {
  config: FlexSnapConfig,
  scroll_unsub?: () => void,
  scroll_unsub2?: () => void,
  touchmove_unsub?: () => void,
  touchstart_unsub?: () => void,
  touchend_unsub?: () => void,
  wheel_unsub?: () => void,
  scroll_lock: boolean,

  currentSectionIdx: number,
}

const Data: DataType = {
  // reverse index of anchors:
  config: {
    anchors: [],
  },
  scroll_unsub: undefined,
  scroll_unsub2: undefined,
  touchmove_unsub: undefined,
  touchstart_unsub: undefined,
  touchend_unsub: undefined,
  wheel_unsub: undefined,
  scroll_lock: false,

  currentSectionIdx: 0,
}

if (isClient) {
  // @ts-ignore
  window.tmp__Data = Data;
}

let isScrollDown = false;
let initialized = false;
let scrolling = false;


export function destroy() {
  console.log('{PageFlexSnap.destroy } : ');

  Data.scroll_unsub && Data.scroll_unsub();
  Data.scroll_unsub2 && Data.scroll_unsub2();
  Data.touchmove_unsub && Data.touchmove_unsub();
  Data.touchstart_unsub && Data.touchstart_unsub();
  Data.touchend_unsub && Data.touchend_unsub();
  Data.wheel_unsub && Data.wheel_unsub();

  initialized = false;
}

/*
Run on client only
 */
export function init(config: FlexSnapConfig) {
  if (!isClient) {
    return;
  }
  Data.config = config;

  // destroy();
  console.log('{PageFlexSnap.init} : ');

  // Stop body scroll for banner
  _setScrollLock(true)

  // document.addEventListener('scroll', onScroll)
  // document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('touchstart', onTouchStart)
  document.addEventListener('touchend', onTouchEnd)
  document.addEventListener('wheel', onWheel)

  Data.scroll_unsub = scrollEventThrottle((offset, prev_offset) => {
    isScrollDown = offset > prev_offset;
  })
  // Data.scroll_unsub2 = throttle(() => {
  //   _handleScrollAutoHeight();
  // }, 100, {start: true})

  Data.touchmove_unsub = () => {
    document.removeEventListener('touchmove', onTouchMove)
  }
  Data.touchstart_unsub = () => {
    document.removeEventListener('touchstart', onTouchStart)
  }
  Data.touchend_unsub = () => {
    document.removeEventListener('touchend', onTouchEnd)
  }
  Data.wheel_unsub = () => {
    document.removeEventListener('wheel', onWheel)
  }

  setTimeout(() => {
    initialized = true;
  }, 1000);
}

// export function snapToSection(anchor: string) {
//   scrolling = true;
//   let anchorIndex = Data.config.anchors.indexOf(anchor);
//   if (anchorIndex < 0) {
//     anchorIndex = 0;
//   }
//   _forceScrollToSection(anchorIndex)
//   setTimeout(() => {
//     scrolling = false;
//   }, 500);
// }

export function setActiveIndexBy(anchor: string) {
  let anchorIndex = Data.config.anchors.indexOf(anchor);
  if (anchorIndex < 0) {
    anchorIndex = 0;
  }
  Data.currentSectionIdx = anchorIndex;
}

const _scrollToNextScreenWithDebounce = (down: boolean) => {
  if (scrolling) {
    return;
  }

  scrolling = true;
  _scrollToNextScreenHandle(down);
  setTimeout(() => {
    scrolling = false;
  }, 500);
};


let lastTouchY = 0;
const onTouchMoveWithThrottle = throttle((e: any) => {
  handleTouch(e);
}, 200, {start: true});

const touchBlacklist = {
  'snapBlackList': true,
  'ant-layout-header': true,
  'swiper-wrapper': true,
  'swiper-button-prev': true,
  'swiper-button-next': true,
  'GameDemo': true,
}

const touchBlacklistId = {
  'GameDemo': true,
}

function handleTouch(e: TouchEvent) {
  // console.log('{handleTouch} e: ', e);
  let isBlacklist = false;
  // @ts-ignore
  for (let i = 0, c = e.path.length; i < c; i++) {
    // @ts-ignore
    const el = e.path[i];
    if (el.className in touchBlacklist || el.id in touchBlacklistId) {
      isBlacklist = true;
      break;
    }
  }

  // console.log('{handleTouch.handleTouch} isBlacklist: ', e);
  if (isBlacklist) {
    return;
  }

  const newY = e.changedTouches[0].clientY;
  // ignore for the first time
  if (lastTouchY === 0) {
    lastTouchY = newY;
    return;
  }

  const delta = newY - lastTouchY;
  if (Math.abs(delta) < 5) {
    return;
  }

  isScrollDown = delta > 0;
  // console.log('{onTouchWithThrottle} isScrollDown, lastTouchY, newY: ', isScrollDown, lastTouchY, newY);
  lastTouchY = newY;
  _scrollToNextScreenWithDebounce(isScrollDown);
}

const onTouchMove = function (e: any) {
  // console.log('{onTouchMove} e: ', e);
  onTouchMoveWithThrottle(e);
}
const onTouchStart = function (e: any) {
  // console.log('{onTouchStart} e: ', e);
  handleTouch(e);
}
const onTouchEnd = function (e: any) {
  // console.log('{onTouchEnd} e: ', e);
  handleTouch(e);
}

const onWheel = function (e: any) {
  // console.log('{onWheel.onWheel} e: ', e.deltaY);
  isScrollDown = e.deltaY > 0;
  _scrollToNextScreenWithDebounce(isScrollDown);
}


function _setScrollLock(lock: boolean) {
  if (Data.scroll_lock !== lock) {
    Data.scroll_lock = lock;
    setBodyScroll(!lock);
  }
}

function _scrollToNextScreenHandle(next: boolean = true) {
  const thisAnchorSelector = Data.config.anchors[Data.currentSectionIdx];
  const isAutoHeightSection = Data.config.autoSizedAnchors?.includes(thisAnchorSelector);
  if (isAutoHeightSection) {
    /*
    If auto height section:
    - do not jump to next screen
    - if next section visible > 100px then scroll to next section
     */
    _setScrollLock(false);
    const section = document.querySelector(thisAnchorSelector);
    if (section) {
      // if scrolling down
      if (next) {
        const nextSectionVisibleArea = getBottomDistanceFromElToViewport(section);
        if (nextSectionVisibleArea > 10) {
          // console.log('{_scrollToNextScreenHandle} thisAnchorSelector, next, nextSectionVisibleArea: ', thisAnchorSelector, next, nextSectionVisibleArea, Data.scroll_lock);
          _forceScrollToNextScreen(next)
        }
      }
      // if scrolling up
      else {
        const nextSectionVisibleArea = getTopDistanceFromElToViewport(section);
        if (nextSectionVisibleArea > 66) {
          // console.log('{_scrollToNextScreenHandle} thisAnchorSelector, next, nextSectionVisibleArea: ', thisAnchorSelector, next, nextSectionVisibleArea, Data.scroll_lock);
          _forceScrollToNextScreen(next)
        }
      }
    }
    // // Moved to onScroll handler
  } else {
    _forceScrollToNextScreen(next)
  }
}

function _handleScrollAutoHeight() {
  // Handle for auto-height section only
  // if (Data.scroll_lock) {
  //   return;
  // }
  //
  // const thisAnchorSelector = Data.config.anchors[Data.currentSectionIdx];
  // const isAutoHeightSection = Data.config.autoSizedAnchors?.includes(thisAnchorSelector);
  // const section = document.querySelector(thisAnchorSelector);
  // if (section) {
  //   // if scrolling down
  //   if (next) {
  //     const nextSectionVisibleArea = getBottomDistanceFromElToViewport(section);
  //     if (nextSectionVisibleArea > 123) {
  //       _forceScrollToNextScreen(next)
  //     }
  //   }
  //   // if scrolling up
  //   else {
  //     const nextSectionVisibleArea = getTopDistanceFromElToViewport(section);
  //     if (nextSectionVisibleArea > 0) {
  //       _forceScrollToNextScreen(next)
  //     }
  //   }
  // }
}

function _forceScrollToNextScreen(next: boolean = true) {
  Data.currentSectionIdx = _getNextScreenIdx(next ? 1 : -1);
  const nextAnchorSelector = Data.config.anchors[Data.currentSectionIdx];
  scrollToSection(nextAnchorSelector, next)
  console.log('{_scrollToNextScreen} scrolled to: ', nextAnchorSelector);

  // Set scroll lock for current section
  _resetScrollLockBaseOnSection();
}

function _forceScrollToSection(anchorIndex: number) {
  const currentAnchorIdx = Data.currentSectionIdx;
  const scrollDown = anchorIndex >= currentAnchorIdx;
  Data.currentSectionIdx = anchorIndex;
  const nextAnchorSelector = Data.config.anchors[Data.currentSectionIdx];
  scrollToSection(nextAnchorSelector, scrollDown)

  // Set scroll lock for current section
  _resetScrollLockBaseOnSection();
}

function _getNextScreenIdx(delta = 1) {
  const max_i = Data.config.anchors.length - 1;
  const new_i = Data.currentSectionIdx + delta;

  return Math.min(max_i, Math.max(0, new_i))
}


function _resetScrollLockBaseOnSection() {
  const sel = Data.config.anchors[Data.currentSectionIdx];
  const isAutoHeightSection = Data.config.autoSizedAnchors?.includes(sel);
  _setScrollLock(!isAutoHeightSection);
}
