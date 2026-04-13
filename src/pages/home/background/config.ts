import { Bezier } from 'lesca-use-tween';

export const HOME_BACKGROUND_TWEEN_PROPERTIES = [
  {
    initialStyle: { opacity: 0, scale: 2, x: 400, y: -540 },
    options: { duration: 5300, delay: 700, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: -880, y: -300 },
    options: { duration: 7000, delay: 100, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: 630, y: -150 },
    options: { duration: 3000, delay: 2500, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: -600, y: -380 },
    options: { duration: 4000, delay: 2000, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: -550, y: -300 },
    options: { duration: 7000, delay: 1000, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: -470, y: 100 },
    options: { duration: 5000, delay: 0, easing: Bezier.outQuart },
  },
  {
    initialStyle: { opacity: 0, scale: 2, x: 470, y: 100 },
    options: { duration: 4000, delay: 1000, easing: Bezier.outQuart },
  },
];
