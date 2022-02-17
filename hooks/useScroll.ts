import {useEffect} from 'react';

export var yScrollPosition = 0
export var isScrollDown = true

export function useScrollDirection() {
    return isScrollDown
}

export default function useScroll() {
  
  const handleNavigation = (e: any) => {
    const window = e.currentTarget;
    if (yScrollPosition > window.scrollY) {
      isScrollDown = false;
    } else if (yScrollPosition < window.scrollY) {
      isScrollDown = true;
    }
    yScrollPosition = window.scrollY
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return () => {
      window.removeEventListener("scroll", () => {});
    }
  }, []);
}