import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useContext, useEffect, useState } from 'react';

const useURI = ({ path, name }: { path: string; name: string }) => {
  const [state, setState] = useState<string>();

  const [context] = useContext(Context);
  const { baseUri } = context[ActionType.Dataset]!.dataset;

  const fetch = () => {
    const fullPath = `${baseUri}${path}`;
    document.documentElement.style.setProperty(`--${name}`, `url("${path}")`);
    setState(fullPath);
  };

  useEffect(() => {
    fetch();
  }, []);

  return [state] as const;
};
export default useURI;
