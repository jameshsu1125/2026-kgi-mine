import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './outline.less';

type TButtonOutline = IReactProps & {
  size?: 'full' | 'lg';
};

const Outline = memo(({ children, size = 'lg' }: TButtonOutline) => (
  <div className={`Outline Outline-${size}`}>{children}</div>
));
export default Outline;
