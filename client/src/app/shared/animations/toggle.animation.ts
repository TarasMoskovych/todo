import { trigger, transition, style, animate } from '@angular/animations';

const ANIMATION_DURATION = 250;
const EXPANDED = {
  opacity: 1,
  height: '*',
  transform: 'scale(1)',
};
const COLLAPSED = {
  opacity: 0,
  height: 0,
  transform: 'scale(0.5)',
};

export const toggleAnimation = trigger('toggle', [
  transition(':leave', [
    style(EXPANDED),
    animate(ANIMATION_DURATION, style(COLLAPSED)),
  ]),
  transition(':enter', [
    style(COLLAPSED),
    animate(ANIMATION_DURATION, style(EXPANDED)),
  ]),
]);
