import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset = 0,
  fadeIn = 1,
}

export enum HomePageType {
  landing = 'landing',
  nextDecade = 'nextDecade',
  whichJourney = 'whichJourney',
}

export type THomeState = { step: HomeStepType; page: HomePageType };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, page: HomePageType.landing };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
