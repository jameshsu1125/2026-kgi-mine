import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading = () => {};

const H1 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h1 className={twMerge(`font-noto-sans-tc text-2xl font-medium tracking-wide`, className)}>
      {children}
    </h1>
  );
});

Heading.H1 = H1;

export default Heading;
