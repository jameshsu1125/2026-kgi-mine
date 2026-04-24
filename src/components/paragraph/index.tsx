import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Paragraph = memo(({ className, children }: IReactProps & { className?: string }) => (
  <div className={twMerge(`font-noto-sans-tc py-5 text-base font-light tracking-wide`, className)}>
    {children}
  </div>
));
export default Paragraph;
