import Sounds from '@/components/sounds';
import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Dataset = 'dataset',
  Sounds = 'sounds',
}

export enum LoadingProcessType {
  Ball = 'balls',
  Bars = 'bars',
  Bubbles = 'bubbles',
  Cubes = 'cubes',
  Cylon = 'cylon',
  Spin = 'spin',
  SpinningBubbles = 'spinningBubbles',
  Spokes = 'spokes',
}

export enum TransitionType {
  Unset = 0,
  FadeIn = 1,
  FadeOut = 2,
  DidFadeIn = 3,
  DidFadeOut = 4,
  Loop = 5,
  Stop = 6,
}

export type TLoadingProcessState = {
  enabled?: boolean;
  type?: LoadingProcessType;
  body?: '';
};

export type TDatasetState = {
  dataset: {
    [key: string]: string | undefined;
  };
};

export type TSounds = {
  track?: Sounds;
};

export interface IState {
  page?: string;
  loadingProcess?: TLoadingProcessState;
  dataset?: TDatasetState;
  sounds?: TSounds;
}

export interface IAction {
  state: IState | TLoadingProcessState | TDatasetState | TSounds | string;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
