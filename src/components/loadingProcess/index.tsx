import { Context } from '@/settings/constant';
import { ActionType, IReactProps, LoadingProcessType } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import useURI from '@/hooks/useURI';
import { LoadingProcessIconList } from './config';

const Background = () => (
  <div className='bg-bg-gray-light absolute top-0 h-full w-full opacity-90' />
);

const Text = ({ children }: IReactProps) => (
  <span className='text-textColor relative'>{children}</span>
);

const LoadingSvg = ({ className, type }: { className: string; type?: string }) => {
  return (
    <div
      className={twMerge(
        className,
        'mask-contain mask-center',
        'h-16 w-16',
        'bg-primary-blue',
        type || LoadingProcessType.Spin,
      )}
    />
  );
};

const LoadingProcess = memo(() => {
  const [context] = useContext(Context);
  const data = context[ActionType.LoadingProcess];

  useURI({
    path: LoadingProcessIconList[data?.type || LoadingProcessType.SpinningBubbles],
    name: 'loading-icon',
  });

  return (
    <div className='LoadingProcess fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center space-y-3'>
      <Background />
      <LoadingSvg className='relative' type={data?.type} />
      {data?.body && <Text>{data.body}</Text>}
    </div>
  );
});
export default LoadingProcess;
