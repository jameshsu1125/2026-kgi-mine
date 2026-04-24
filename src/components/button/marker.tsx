import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './marker.less';

const Marker = memo(({ children }: IReactProps) => <div className='Marker'>{children}</div>);
export default Marker;
