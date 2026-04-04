import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Contain = memo(({ children, className }: IReactProps & { className?: string }) => (
  <div className={twMerge('px-3.5', className)}>{children}</div>
));
export default Contain;
