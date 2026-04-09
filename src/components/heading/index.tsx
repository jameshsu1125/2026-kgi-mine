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

const H2 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h1 className={twMerge(`font-noto-sans-tc text-xl font-medium tracking-wide`, className)}>
      {children}
    </h1>
  );
});

const D4 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h2 className={twMerge(`font-noto-sans-tc text-lg font-light tracking-wide`, className)}>
      {children}
    </h2>
  );
});

Heading.H1 = H1;
Heading.H2 = H2;
Heading.D4 = D4;

export default Heading;
