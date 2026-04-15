import { IReactProps } from '@/settings/type';
import { memo, useEffect } from 'react';
import './marker.less';

const Marker = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='Marker'>{children}</div>;
});
export default Marker;
