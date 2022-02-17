import { scrollBy, scrollEventThrottle, scrollToSection, setBodyScroll } from "../utils/DOM";
import { debounce, throttle } from "@github/mini-throttle";

const isClient = typeof window !== 'undefined';


type FlexSnapConfig = {
  disableScrollPanels?: string[],
  enableScrollPanels?: string[],
}

const Data: Record<string, any> = {
  observers: [], // IntersectionObserver[]
  scroller_unsub: null,
  touchmove_unsub: null,
  wheel_unsub: null,
  scroll_lock: true,
}

let isScrollDown = false;


enum ScrollDirection {
  Down = 'D',
  Up = 'U',
}

export function destroy() {
  for (let i = 0, c = Data.observers.length; i < c; i++) {
    const item: IntersectionObserver = Data.observers[i];
    item.disconnect()
  }

  Data.scroller_unsub && Data.scroller_unsub();
  Data.touchmove_unsub && Data.touchmove_unsub();
  Data.wheel_unsub && Data.wheel_unsub();
}

/*
Run on client only
 */
export function init(config: FlexSnapConfig) {
  if (!isClient) {
    return;
  }

  destroy();

  // Stop body scroll for banner
  _setScrollLock(Data.scroll_lock)


  const observerOptions = {};

  const enableScrollPanels = config?.enableScrollPanels ?? [];
  for (let i = 0, c = enableScrollPanels.length; i < c; i++) {
    const sectionSelector = enableScrollPanels[i];
    const el = document.querySelector(sectionSelector);

    if (!el) {
      console.warn('el not exist: ', sectionSelector)
      continue;
    }

    const observer = new IntersectionObserver(_intersectionCallback, observerOptions);
    observer.observe(el);
    Data.observers.push(observer);
  }


  Data.scroller_unsub = scrollEventThrottle((offset, prev_offset) => {
    isScrollDown = offset > prev_offset;
  })


  const _scrollToNextScreenWithDebounce = debounce(
    () => {
      _scrollToNextScreen();
    },
    1000,
    {start: true, once: true}
  );

  const onTouchMove = function (e: any) {
    console.log('{onTouchMove.onTouchMove} e: ', e);

    isScrollDown = true; // TODO:

    if (isScrollDown) {
      _scrollToNextScreenWithDebounce();
    }
  }
  const onWheel = function (e: any) {
    // console.log('{onWheel.onWheel} e: ', e.deltaY);
    isScrollDown = e.deltaY > 0;

    if (isScrollDown) {
      _scrollToNextScreenWithDebounce();
    }
  }
  document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('wheel', onWheel)

  Data.touchmove_unsub = () => {
    document.removeEventListener('touchmove', onTouchMove)
  }
  Data.wheel_unsub = () => {
    document.removeEventListener('wheel', onWheel)
  }
}

function _setScrollLock(lock: boolean) {
  Data.scroll_lock = lock;
  setBodyScroll(lock);
}

function _intersectionCallback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    let el = entry.target;
    _onIntersect(entry, el);
  });
}

function _onIntersect(entry: IntersectionObserverEntry, el: Element) {
  // console.log('{_onIntersect} el: ', entry.target);
  const {isIntersecting, intersectionRatio, boundingClientRect, target} = entry;

  if (isIntersecting) {
    _onElementAppear(target, isScrollDown ? ScrollDirection.Down : ScrollDirection.Up)
  } else {
    _onElementDisappear(target, isScrollDown ? ScrollDirection.Down : ScrollDirection.Up)
  }
}

function _onIntersectWithTopBorderOfViewport(entry: IntersectionObserverEntry) {

}

function _toScrollDir(boundingClientRect: DOMRectReadOnly): ScrollDirection {
  console.log('{_toScrollDir._toScrollDir} boundingClientRect: ', boundingClientRect.top, boundingClientRect);
  return (
    boundingClientRect.y > 0
  ) ? ScrollDirection.Down : ScrollDirection.Up;
}

function _onElementAppear(el: Element, direction: ScrollDirection) {
  // console.log('{_onElementAppear} el, direction: ', el, direction);

  if (direction === ScrollDirection.Down) {
    if (el.id === 'RaceIntro') {
      // setBodyScroll(true);
      _setScrollLock(false);
    }
  } else {
    // if (el.id === 'GameMode') {
    //   setBodyScroll(true);
    // }
  }
}

function _onElementDisappear(el: Element, direction: ScrollDirection) {
  // console.log('{_onElementDisappear} el, direction: ', el, direction);

  if (direction === ScrollDirection.Down) {

  } else {
    if (el.id === 'RaceIntro') {
      console.log('{_onElementDisappear._onElementDisappear} StoryBook > Race ==> Lock: ', );
      _setScrollLock(true);
      setTimeout(() => {
        scrollToSection('#StoryBook')
      }, 300)
    }
  }
}


function _scrollToNextScreen() {
  console.log('{_scrollToNextScreen._scrollToNextScreen} : ', );
  scrollBy(window?.visualViewport.height ?? 0)
}
