import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './outline.less';

const Outline = memo(({ children }: IReactProps) => <div className='Outline'>{children}</div>);
export default Outline;
