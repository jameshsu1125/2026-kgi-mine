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
  landing,
}

export type TJourneyState = { step: JourneyStepType; scene: JourneySceneType; offset: number };
export type TJourneyContext = [TJourneyState, Dispatch<SetStateAction<TJourneyState>>];

export const JourneyState = {
  step: JourneyStepType.unset,
  scene: JourneySceneType.黃金稻浪,
  offset: 0,
};
export const JourneyContext = createContext<TJourneyContext>([JourneyState, () => {}]);
