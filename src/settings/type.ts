import Sounds from '@/components/sounds';
import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Dataset = 'dataset',
  Sounds = 'sounds',
  Modal = 'modal',
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

export type TModalState = {
  enabled?: boolean;
  title?: string;
  body?: ReactNode;
  label?: [string, string?];
  onConfirm?: (label: string) => void;
};

export interface IState {
  [ActionType.Page]?: string;
  [ActionType.LoadingProcess]?: TLoadingProcessState;
  [ActionType.Dataset]?: TDatasetState;
  [ActionType.Sounds]?: TSounds;
  [ActionType.Modal]?: TModalState;
}

export interface IAction {
  state:
    | IState
    | IState[ActionType.Page]
    | IState[ActionType.Dataset]
    | IState[ActionType.Sounds]
    | IState[ActionType.Modal]
    | string;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
