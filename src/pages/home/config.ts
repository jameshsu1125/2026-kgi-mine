import { ResponseType } from '@/hooks/useQuestion';
import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset = 0,
  landingFadeIn = 1,
  landingFadeOut = 2,
  nextDecadeFadeOut = 3,
  whichJourneyFadeOut = 4,
}

export enum HomePageType {
  landing = 'landing',
  decade = 'decade',
  journey = 'journey',
  character = 'character',
}

export type THomeState = {
  step: HomeStepType;
  page: HomePageType;
  result?: ResponseType['result'];
  decadeData?: Record<string, string>[];
  journeyData?: Record<string, string>[];
  characterData?: Record<string, string>;
};
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = { step: HomeStepType.unset, page: HomePageType.character };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
