import { Bezier } from 'lesca-use-tween';

const isMobile = window.innerWidth < 768;

export const HOME_BACKGROUND_TWEEN_PROPERTIES = [
  {
    initialStyle: { opacity: 0, scale: 5, x: isMobile ? -170 : -500, y: isMobile ? 120 : 150 },
    options: { duration: 600, delay: 100, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? 150 : 380, y: isMobile ? 100 : 0 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? -250 : -630, y: isMobile ? 120 : -150 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? 210 : 600, y: isMobile ? 240 : -380 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? 181 : 550, y: isMobile ? -100 : -200 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? 160 : 470, y: isMobile ? -300 : -400 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
  {
    initialStyle: { opacity: 0, scale: 3, x: isMobile ? -190 : -470, y: isMobile ? -340 : -500 },
    options: { duration: 600, delay: 200, easing: Bezier.outBack },
  },
];
