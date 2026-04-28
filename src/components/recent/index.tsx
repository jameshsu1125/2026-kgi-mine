import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import useURI from '@/hooks/useURI';
import { URI } from './config';
import Heading from '../heading';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import Button from '../button';
import EnterFrame from 'lesca-enterframe';
import OnloadProvider from 'lesca-react-onload';
import TweenerProvider from '../tweenProvider';

const Recent = memo(() => {
  const [context, setContext] = useContext(Context);
  const { title, onClick } = context[ActionType.Recent]!;
  const [transition, setTransition] = useState(TransitionType.Unset);

  const [, setURI] = useURI();
  useEffect(() => {
    URI.forEach((uri) => setURI(uri));
  }, []);

  useEffect(() => {
    EnterFrame.stop();
    return () => EnterFrame.play();
  }, []);

  return (
    <OnloadProvider
      onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
      onload={() => {
        setTransition(TransitionType.FadeOut);
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div className='Recent'>
        <div className='ctx'>
          <TweenerProvider
            initialStyle={{ opacity: 0, y: 50 }}
            tweenTo={{ opacity: 1, y: 0 }}
            shouldFadeIn={transition === TransitionType.FadeOut}
            options={{ duration: 300 }}
          >
            <Heading.H2 className='tracking-widest'>{title}</Heading.H2>
          </TweenerProvider>
          <div className='dialog animate-fadeInPy delay-200'>
            <Button className='w-full' onClick={onClick}>
              <div className='img' />
            </Button>
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Recent;
