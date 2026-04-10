import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset = 0,
  landingFadeIn = 1,
  landingFadeOut = 2,
  nextDecadeFadeOut = 3,
}

export enum HomePageType {
  landing = 'landing',
  nextDecade = 'nextDecade',
  whichJourney = 'whichJourney',
}

export type THomeState = {
  step: HomeStepType;
  page: HomePageType;
  nextDecadeData?: Record<string, string>[];
};
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, page: HomePageType.landing };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
