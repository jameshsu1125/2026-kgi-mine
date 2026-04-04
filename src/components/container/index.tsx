import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';
import Div100vh from 'react-div-100vh';

const Container = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return (
    <Div100vh className='Container'>
      <div className='bg' />
      <div>{children}</div>
    </Div100vh>
  );
});
export default Container;
