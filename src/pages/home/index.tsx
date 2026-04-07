import useMiner from '@/hooks/useMiner';
import { printCSSAnimation } from '@/utils';
import { memo, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';

printCSSAnimation(30, false);

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);
  const [res, getMiner] = useMiner();

  return (
    <HomeContext.Provider value={[state, setState]}>
      <div className='Home'>
        <Background />
      </div>
    </HomeContext.Provider>
  );
});

export default Home;
