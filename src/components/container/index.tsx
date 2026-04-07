import useURI from '@/hooks/useURI';
import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import Div100vh from 'react-div-100vh';
import NavBar from '../navBar';
import './index.less';

const Container = memo(({ children }: IReactProps) => {
  useURI({ path: 'img/scene-bg.jpg', name: 'scene-bg' });

  return (
    <Div100vh className='Container'>
      <div className='bg' />
      <div className='ctx'>
        <div>
          <NavBar />
          <div className='content'>{children}</div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
