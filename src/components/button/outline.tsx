import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './outline.less';

type ButtonOutline = IReactProps & {
  size?: 'w-xs' | 'w-sm' | 'w-md' | 'w-lg' | 'w-full';
};

const Outline = memo(({ children, size = 'w-xs' }: ButtonOutline) => (
  <div className={twMerge('Outline', size)}>{children}</div>
));
export default Outline;
