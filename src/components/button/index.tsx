import { IReactProps } from '@/settings/type';
import Regular from './regular';
import { twMerge } from 'tailwind-merge';
import { useEffect, useId } from 'react';
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

  useEffect(() => {
    Click.add(`#${id}`, () => {
      onClick?.();
      if (clickOnce) Click.remove(`#${id}`);
    });
    Click.addPreventExcept(`#${id}`);
    return () => Click.remove(`#${id}`);
  }, []);

  return (
    <div
      id={id}
      className={twMerge(className, 'Button', '**:pointer-events-none', 'cursor-pointer')}
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
