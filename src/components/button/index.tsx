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
  onClick?: () => void;
};

const Button = ({ children, className, style, clickOnce, onClick }: TRegularProps) => {
  const id = useId();
  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      onClick?.();
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
        'Button',
        isPress && 'Button-active',
        'cursor-pointer **:pointer-events-none',
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
