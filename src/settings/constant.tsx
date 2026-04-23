import { createContext } from 'react';
import { PAGE } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TContext,
  TDatasetState,
  TLoadingProcessState,
  TModalState,
  TSceneImageSizeState,
  TUserDataState,
} from './type';

export const LoadingProcessState: TLoadingProcessState = {
  enabled: false,
  type: LoadingProcessType.SpinningBubbles,
  body: '',
};

export const DatasetState: TDatasetState = {
  dataset: {
    baseUri: window.location.origin,
  },
};

export const ModalState: TModalState = {
  enabled: false,
  title: '',
  body: (
    <>
      請開啟聲音鍵和調大音量
      <br />
      並且關掉省電模式
      <br />
      才能獲得最佳體驗喔！
    </>
  ),
  label: ['好的'],
  onClose: () => {},
};

export const UserDataState: TUserDataState = {
  journey: '月夜雪地',
  character: undefined,
};

export const SceneImageSizeState: TSceneImageSizeState = {
  height: undefined,
  width: undefined,
};

export const InitialState: IState = {
  [ActionType.Page]: PAGE.journey,
  [ActionType.LoadingProcess]: LoadingProcessState,
  [ActionType.Dataset]: DatasetState,
  [ActionType.Sounds]: { track: undefined },
  [ActionType.Modal]: ModalState,
  [ActionType.UserData]: UserDataState,
  [ActionType.SceneImageSize]: SceneImageSizeState,
};

export const Context = createContext<TContext>([InitialState, () => {}]);
export const Reducer = (state: IState, action: IAction): IState => {
  if (action.state instanceof Object) {
    let stateStorage: { [key: string]: any } = {};
    Object.entries(action.state)
      .filter((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0 || action.type) return true;
        return false;
      })
      .map((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0) return actionState;
        return [action.type, Object.fromEntries([actionState])];
      })
      .forEach((actionState) => {
        if (actionState) {
          const [key, value] = actionState;
          const stringKey = String(key);
          const cloneVale = Object.fromEntries(
            Object.entries(state).filter((stateValue) => stateValue[0] === stringKey),
          )[action.type];
          if (Object.prototype.hasOwnProperty.call(stateStorage, stringKey)) {
            stateStorage = {
              [stringKey]: { ...stateStorage[stringKey], ...value },
            };
          } else stateStorage = { [stringKey]: { ...cloneVale, ...value } };
        }
      });
    return { ...state, ...stateStorage };
  }

  if (action.type) return { ...state, [action.type]: action.state };
  return state;
};
