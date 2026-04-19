import { memo, useContext, useEffect, useId } from 'react';
import Article from '../article';
import './index.less';
import Click from 'lesca-click';
import { JourneyContext } from '@/pages/journey/config';
import EnterFrame from 'lesca-enterframe';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import OnloadProvider from 'lesca-react-onload';
import { ActionType } from '@/settings/type';

const BG = memo(() => {
  const [, setState] = useContext(JourneyContext);
  const id = useId();

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setState((S) => ({ ...S, nav: { enabled: false } }));
    });
    return () => {
      Click.remove(`#${id}`);
    };
  }, [id]);

  return <div id={id} className='bg' />;
});

const Nav = memo(() => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(JourneyContext);
  const id = useId();
  const id2 = useId();

  useURI({ path: 'tmp.png', name: 'tmp' });

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
    EnterFrame.stop();

    return () => {
      EnterFrame.play();
    };
  }, []);

  useEffect(() => {
    Click.add(`#${id2}`, () => {
      setState((S) => ({ ...S, nav: { enabled: false } }));
    });
    return () => {
      Click.remove(`#${id2}`);
    };
  }, [id2]);

  return (
    <OnloadProvider
      onStart={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
      }}
      onload={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <nav className='Nav'>
        <BG />
        <div id={id} className='ctx'>
          <Article className='max-w-md'>
            <div className='flex min-h-full w-full items-center justify-center pb-[13vh]'>
              <div id={id2} className='tmp animate-fadeInWithY' />
            </div>
          </Article>
        </div>
      </nav>
    </OnloadProvider>
  );
});
export default Nav;
