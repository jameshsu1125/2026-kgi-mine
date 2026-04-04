import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useContext, useEffect, useState } from 'react';

const useURI = ({ filePath, variableName }: { filePath: string; variableName: string }) => {
  const [state, setState] = useState<string>();

  const [context] = useContext(Context);
  const { baseUri } = context[ActionType.Dataset]!.dataset;

  const fetch = () => {
    const fullPath = `${baseUri}${filePath}`;
    document.documentElement.style.setProperty(`--${variableName}`, `url("${fullPath}")`);
    setState(fullPath);
  };

  useEffect(() => {
    fetch();
  }, []);

  return [state] as const;
};
export default useURI;
