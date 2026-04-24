import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './outline.less';

type ButtonOutline = IReactProps & {
  size?: 'w-xs' | 'w-sm' | 'w-md' | 'w-lg' | 'w-full';
  className?: string;
};

const Outline = memo(({ children, className, size = 'w-xs' }: ButtonOutline) => (
  <div className={twMerge('Outline', className, size)}>{children}</div>
));
export default Outline;
