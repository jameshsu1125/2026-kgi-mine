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
  scene: JourneySceneType.黃金稻浪,
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
  [JourneySceneType.花海平原]: [],
  [JourneySceneType.蔚藍海岸]: [],
  [JourneySceneType.月夜雪地]: [],
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
      top: 5,
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
  [JourneySceneType.花海平原]: [],
  [JourneySceneType.蔚藍海岸]: [],
  [JourneySceneType.月夜雪地]: [],
  [JourneySceneType.翁鬱森林]: [],
};

export const JourneySceneDebug: { offset: number; count: number | 'max' } = {
  // offset: 3200,
  offset: 0,
  count: 'max',
};
