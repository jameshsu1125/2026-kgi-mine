import Article from '@/components/article';
import useMiner from '@/hooks/useMiner';
import { memo, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import Content from './content';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);
  const [res, getMiner] = useMiner();

  return (
    <HomeContext.Provider value={[state, setState]}>
      <div className='Home'>
        <Background />
        <Article>
          <Content />
        </Article>
      </div>
    </HomeContext.Provider>
  );
});

export default Home;
