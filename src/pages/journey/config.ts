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
}

export type TJourneyState = { step: JourneyStepType; scene: JourneySceneType };
export type TJourneyContext = [TJourneyState, Dispatch<SetStateAction<TJourneyState>>];

export const JourneyState = {
  step: JourneyStepType.unset,
  scene: JourneySceneType.黃金稻浪,
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

export const JourneyItemsList = {
  [JourneySceneType.黃金稻浪]: [
    {
      name: 'goldenRiceField-item-1',
      path: 'goldenRiceField-item-1.png',
      offset: -20,
      position: 20,
    },
  ],
  [JourneySceneType.花海平原]: [],
  [JourneySceneType.蔚藍海岸]: [],
  [JourneySceneType.月夜雪地]: [],
  [JourneySceneType.翁鬱森林]: [],
};
