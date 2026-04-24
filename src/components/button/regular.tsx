import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './regular.less';

type RegularProps = IReactProps & {
  size?: 'w-xs' | 'w-sm' | 'w-md' | 'w-lg' | 'w-full';
};

const Regular = memo(({ children, size }: RegularProps) => (
  <div className={twMerge('regular', size || 'w-xs')}>{children}</div>
));
export default Regular;
