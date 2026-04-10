import { IReactProps } from '@/settings/type';
import Regular from './regular';
import { twMerge } from 'tailwind-merge';
import { useEffect, useId, useState } from 'react';
import Click from 'lesca-click';
import NavBar from './navBar';
import Outline from './outline';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  clickOnce?: boolean;
  onClick?: (dataset?: Record<string, string>) => void;
  active?: boolean;
  dataset?: Record<string, string>;
  disabled?: boolean;
};

const Button = (props: TRegularProps) => {
  const { children, className, style, clickOnce, onClick, active, dataset, disabled } = props;

  const id = useId();
  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      onClick?.(dataset);
      if (clickOnce) Click.remove(`#${id}`);
      setIsPress(true);
    });

    const handleTouchEnd = () => {
      setIsPress(false);
    };

    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      Click.remove(`#${id}`);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      id={id}
      className={twMerge(
        className,
        active ? 'button-active' : 'button-hover',
        'Button',
        isPress && 'Button-active',
        'cursor-pointer **:pointer-events-none',
        (disabled || (clickOnce && isPress)) && 'pointer-events-none **:grayscale-50',
      )}
      style={style}
    >
      {children}
    </div>
  );
};

Button.Regular = Regular;
Button.NavBar = NavBar;
Button.Outline = Outline;

export default Button;
