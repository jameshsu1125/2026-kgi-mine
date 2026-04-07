import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Paragraph = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <div className={twMerge(`font-noto-sans-tc py-5 text-2xl font-light`, className)}>
      {children}
    </div>
  );
});
export default Paragraph;
