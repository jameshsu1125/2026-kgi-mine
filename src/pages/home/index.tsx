import Article from '@/components/article';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import Content from './content';
import './index.less';

const Home = memo(() => {
  const [, setContext] = useContext(Context);

  const [state, setState] = useState<THomeState>(HomeState);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setState((S) => ({ ...S, step: HomeStepType.landingFadeIn }));
        }}
      >
        <div className='Home'>
          <Background />
          <Article>
            <Content />
          </Article>
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
