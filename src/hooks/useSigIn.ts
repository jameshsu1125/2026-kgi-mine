import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import { REST_PATH } from '../settings/config';
import { Context } from '../settings/constant';
import { ActionType } from '@/settings/type';

export type TResult = { userID: string; id: number; title: string; completed: boolean } | undefined;

const useSigIn = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<TResult>();
  const fetcher = async ({ credential, email }: { credential: string; email: string }) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const respond = await fetch('https://uatservice.kgifund.com.tw/mine/api/member/sigIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: JSON.stringify({ credential, email }),
    });
    console.log(respond);

    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };
  return [state, fetcher] as const;
};
export default useSigIn;
