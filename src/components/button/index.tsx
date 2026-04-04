import { IReactProps } from '@/settings/type';
import Regular from './regular';
import { twMerge } from 'tailwind-merge';

type TRegularProps = IReactProps & {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button = ({ id, children, className, style, onClick }: TRegularProps) => {
  return (
    <button
      id={id}
      className={twMerge(className, '**:pointer-events-none')}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.regular = Regular;

export default Button;
