import useURI from '@/hooks/useURI';
import { SceneSize } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { memo, useContext, useEffect, useRef } from 'react';
import Div100vh from 'react-div-100vh';
import NavBar from '../navBar';
import './index.less';
import Menu from '../menu';

const Container = memo(({ children }: IReactProps) => {
  const [context, setContext] = useContext(Context);
  const sceneImageSize = context[ActionType.SceneViewSize];
  const ref = useRef<HTMLDivElement>(null);
  useURI({ path: 'scene-bg.jpg', name: 'scene-bg' });
  useURI({ path: 'scene-bg-m.jpg', name: 'scene-bg-m' });

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        const { height } = ref.current.getBoundingClientRect();
        const width = (height * SceneSize.width) / SceneSize.height;
        setContext({ type: ActionType.SceneViewSize, state: { height, width } });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Div100vh className='Container'>
      <div className='bg' />
      <div className='ctx'>
        <div>
          <NavBar />
          <div ref={ref} className='content'>
            {sceneImageSize && sceneImageSize.width && children}
            <Menu />
          </div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
