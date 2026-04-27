import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading = () => {};

const H1 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h1 className={twMerge(`font-noto-sans-tc text-3xl font-bold tracking-wide`, className)}>
      {children}
    </h1>
  );
});

const H2 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h1 className={twMerge(`font-noto-sans-tc text-2xl font-black tracking-wide`, className)}>
      {children}
    </h1>
  );
});

const H3 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h3
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-xl font-medium tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h3>
    );
  },
);

const D3 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h2
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-xl font-light tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h2>
    );
  },
);

const D4 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h2
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-lg font-light tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h2>
    );
  },
);

Heading.H1 = H1;
Heading.H2 = H2;
Heading.H3 = H3;
Heading.D3 = D3;
Heading.D4 = D4;

export default Heading;
