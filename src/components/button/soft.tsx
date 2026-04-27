import { memo, useEffect } from 'react';
import './soft.less';
import { IReactProps } from '@/settings/type';

const Soft = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='soft'>{children}</div>;
});
export default Soft;
