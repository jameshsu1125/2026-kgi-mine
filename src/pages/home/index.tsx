import Sounds from '@/components/sounds';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import Content from './content';
import './index.less';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);
  const [preloadState, setPreloadState] = useState({ doms: false, sounds: false });

  useEffect(() => {
    const sounds = new Sounds({
      onload: () => setPreloadState((S) => ({ ...S, sounds: true })),
    });

    setContext({ type: ActionType.Sounds, state: { track: sounds } });
  }, []);

  useEffect(() => {
    if (preloadState.doms && preloadState.sounds) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState((S) => ({ ...S, step: HomeStepType.landingFadeIn }));
    }
  }, [preloadState]);

  useEffect(() => {
    const { journeyData } = state;
    if (journeyData) {
      const [{ name }] = journeyData;
      setContext({
        type: ActionType.UserData,
        state: {
          journey:
            (name as '金黃稻浪' | '花海平原' | '蔚藍海岸' | '月夜雪地' | '晴光森林' | undefined) ||
            '晴光森林',
        },
      });
    }
  }, [state.journeyData]);

  if (!preloadState.sounds) return null;

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
        onload={() => {
          setPreloadState((S) => ({ ...S, doms: true }));
        }}
      >
        <div className='Home'>
          <Background />
          <Content />
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
