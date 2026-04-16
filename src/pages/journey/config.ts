import { createContext, Dispatch, SetStateAction } from 'react';

export enum JourneySceneType {
  黃金稻浪 = 'goldenRiceField',
  花海平原 = 'flowerSeaPlain',
  蔚藍海岸 = 'azureCoast',
  月夜雪地 = 'moonlitSnowfield',
  翁鬱森林 = 'lushForest',
}

export enum JourneyStepType {
  unset,
  fadeIn,
  loop,
  fadeOut,
  resume,
}

export type TJourneyState = { step: JourneyStepType; scene: JourneySceneType; loop: number };
export type TJourneyContext = [TJourneyState, Dispatch<SetStateAction<TJourneyState>>];

export const JourneyState = {
  step: JourneyStepType.unset,
  scene: JourneySceneType.月夜雪地,
  loop: 0,
};
export const JourneyContext = createContext<TJourneyContext>([JourneyState, () => {}]);

export const JourneyDepth = {
  back: 0.01,
  middle: 0.1,
  front: 0.9,
};

export const JourneySceneSize = {
  width: 3840,
  height: 1080,
};

export const JourneySceneList = {
  [JourneySceneType.黃金稻浪]: [
    { path: 'goldenRiceField-backView.jpg', name: 'scene-backView' },
    { path: 'goldenRiceField-middleView.png', name: 'scene-middleView' },
    { path: 'goldenRiceField-frontView.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.花海平原]: [
    { path: 'flowerSeaPlain-backView.jpg', name: 'scene-backView' },
    { path: 'flowerSeaPlain-middleView.png', name: 'scene-middleView' },
    { path: 'flowerSeaPlain-frontView.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.蔚藍海岸]: [
    { path: 'azureCoast-backView.jpg', name: 'scene-backView' },
    { path: 'azureCoast-middleView.png', name: 'scene-middleView' },
    { path: 'azureCoast-frontView.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.月夜雪地]: [
    { path: 'moonlitSnowfield-backView.jpg', name: 'scene-backView' },
    { path: 'moonlitSnowfield-middleView.png', name: 'scene-middleView' },
    { path: 'moonlitSnowfield-frontView.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.翁鬱森林]: [],
};

export const JourneyItemsList = {
  [JourneySceneType.黃金稻浪]: [
    {
      name: 'goldenRiceField-item-1',
      path: 'goldenRiceField-item-1.png',
      top: -20.7,
      left: 2739,
    },
    {
      name: 'goldenRiceField-item-2',
      path: 'goldenRiceField-item-2.png',
      top: -18.4,
      left: 1320,
    },
    {
      name: 'goldenRiceField-item-3',
      path: 'goldenRiceField-item-3.png',
      top: -7,
      left: 1900,
    },
    {
      name: 'goldenRiceField-item-4',
      path: 'goldenRiceField-item-4.png',
      top: 1,
      left: 235,
    },
    {
      name: 'goldenRiceField-item-5',
      path: 'goldenRiceField-item-5.png',
      top: 10,
      left: 535,
    },
    {
      name: 'goldenRiceField-item-6',
      path: 'goldenRiceField-item-6.png',
      top: -6,
      left: 835,
    },
    {
      name: 'goldenRiceField-item-7',
      path: 'goldenRiceField-item-7.png',
      top: -19.5,
      left: 1685,
    },
    {
      name: 'goldenRiceField-item-8',
      path: 'goldenRiceField-item-8.png',
      top: -5.6,
      left: 3050,
    },
  ],
  [JourneySceneType.花海平原]: [
    {
      name: 'flowerSeaPlain-item-1',
      path: 'flowerSeaPlain-item-1.png',
      top: -15.7,
      left: 1750,
    },
    {
      name: 'flowerSeaPlain-item-2',
      path: 'flowerSeaPlain-item-2.png',
      top: -10.3,
      left: 2990,
    },
    {
      name: 'flowerSeaPlain-item-3',
      path: 'flowerSeaPlain-item-3.png',
      top: -14,
      left: 670,
    },
    {
      name: 'flowerSeaPlain-item-4',
      path: 'flowerSeaPlain-item-4.png',
      top: -19.3,
      left: 2780,
    },
    {
      name: 'flowerSeaPlain-item-5',
      path: 'flowerSeaPlain-item-5.png',
      top: -11.9,
      left: 1180,
    },
    {
      name: 'flowerSeaPlain-item-6',
      path: 'flowerSeaPlain-item-6.png',
      top: -3,
      left: 2035,
    },
    {
      name: 'flowerSeaPlain-item-7',
      path: 'flowerSeaPlain-item-7.png',
      top: -17.2,
      left: 2630,
    },
    {
      name: 'flowerSeaPlain-item-8',
      path: 'flowerSeaPlain-item-8.png',
      top: -22.7,
      left: 1495,
    },
  ],
  [JourneySceneType.蔚藍海岸]: [
    {
      name: 'azureCoast-item-1',
      path: 'azureCoast-item-1.png',
      top: 10,
      left: 2680,
    },
    {
      name: 'azureCoast-item-2',
      path: 'azureCoast-item-2.png',
      top: -31.5,
      left: 1040,
    },
    {
      name: 'azureCoast-item-3',
      path: 'azureCoast-item-3.png',
      top: -5,
      left: 2140,
    },
    {
      name: 'azureCoast-item-4',
      path: 'azureCoast-item-4.png',
      top: -28.1,
      left: 2000,
    },
    {
      name: 'azureCoast-item-5',
      path: 'azureCoast-item-5.png',
      top: -29.6,
      left: 3000,
    },
    {
      name: 'azureCoast-item-6',
      path: 'azureCoast-item-6.png',
      top: -31.6,
      left: 550,
    },
    {
      name: 'azureCoast-item-7',
      path: 'azureCoast-item-7.png',
      top: -31,
      left: 60,
    },
    {
      name: 'azureCoast-item-8',
      path: 'azureCoast-item-8.png',
      top: 4,
      left: 550,
    },
  ],
  [JourneySceneType.月夜雪地]: [
    {
      name: 'moonlitSnowfield-item-1',
      path: 'moonlitSnowfield-item-1.png',
      top: -40,
      left: 1930,
    },
    {
      name: 'moonlitSnowfield-item-2',
      path: 'moonlitSnowfield-item-2.png',
      top: -18,
      left: 1290,
    },
    {
      name: 'moonlitSnowfield-item-3',
      path: 'moonlitSnowfield-item-3.png',
      top: -28,
      left: 690,
    },
    {
      name: 'moonlitSnowfield-item-4',
      path: 'moonlitSnowfield-item-4.png',
      top: -27,
      left: 2220,
    },
    {
      name: 'moonlitSnowfield-item-5',
      path: 'moonlitSnowfield-item-5.png',
      top: -6.8,
      left: 2116,
    },

    {
      name: 'moonlitSnowfield-item-6',
      path: 'moonlitSnowfield-item-6.png',
      top: -18,
      left: 2816,
    },
    {
      name: 'moonlitSnowfield-item-7',
      path: 'moonlitSnowfield-item-7.png',
      top: -8,
      left: 326,
    },
    {
      name: 'moonlitSnowfield-item-8',
      path: 'moonlitSnowfield-item-8.png',
      top: -1,
      left: 2656,
    },
  ],
  [JourneySceneType.翁鬱森林]: [],
};

export const JourneySceneDebug: { offset: number; count: number | 'max' } = {
  // offset: 1500,
  offset: 0,
  count: 'max',
};
