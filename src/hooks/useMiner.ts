import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import { REST_PATH } from '../settings/config';
import { Context } from '../settings/constant';

export type TResult = any | undefined;

const useMiner = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<TResult>();
  const fetcher = async () => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let respond: TResult;
    try {
      respond = await Fetcher.get(REST_PATH.immersion_miner);
    } catch (error) {
      respond = error;
    }
    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };
  return [state, fetcher] as const;
};
export default useMiner;
