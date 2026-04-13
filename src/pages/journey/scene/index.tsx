import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import useURI from '@/hooks/useURI';
import { JourneyContext } from '../config';
import OnloadProvider from 'lesca-react-onload';
import { TransitionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';

const BackView = memo(() => {
  const [state] = useContext(JourneyContext);
  console.log(state);

  return <div className='back-view' style={{ backgroundPositionX: `${state.offset}%` }} />;
});

const Scene = memo(() => {
  const [state, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    if (state && state.scene) {
      setURI({ path: `${state.scene}-backView.jpg`, name: 'scene-backView' });
    }
  }, [state.scene]);

  useEffect(() => {
    EnterFrame.add(() => {
      console.log('a');

      setState((S) => {
        console.log(S.offset);
        return { ...S, offset: S.offset + 0.1 };
      });
    });
    EnterFrame.play();

    return () => {
      // EnterFrame.stop();
      // EnterFrame.destroy();
    };
  }, []);

  return (
    <OnloadProvider
      key={state.scene}
      onStart={() => setTransition(TransitionType.Unset)}
      onload={() => setTransition(TransitionType.FadeIn)}
    >
      <div className='Scene'>
        <BackView />
      </div>
    </OnloadProvider>
  );
});
export default Scene;
