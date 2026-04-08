import Article from '@/components/article';
import useMiner from '@/hooks/useMiner';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useState } from 'react';
import Content from './content';
import Background from './background';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';

const Home = memo(() => {
  const [, setContext] = useContext(Context);

  const [state, setState] = useState<THomeState>(HomeState);
  const [res, getMiner] = useMiner();

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
        onload={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: false } })}
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
