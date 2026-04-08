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
  onClick?: () => void;
};

const Button = ({ children, className, style, onClick }: TRegularProps) => {
  const id = useId();

  useEffect(() => {
    Click.add(`#${id}`, () => onClick?.());
    return () => Click.remove(`#${id}`);
  }, []);

  return (
    <div
      id={id}
      className={twMerge(className, 'Button', '**:pointer-events-none', 'cursor-pointer')}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Button.Regular = Regular;
Button.NavBar = NavBar;
Button.Outline = Outline;

export default Button;
