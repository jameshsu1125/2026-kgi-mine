import Article from '@/components/article';
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

    setContext({ type: ActionType.Sounds, state: sounds });
  }, []);

  useEffect(() => {
    if (preloadState.doms && preloadState.sounds) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState((S) => ({ ...S, step: HomeStepType.landingFadeIn }));
    }
  }, [preloadState]);

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
