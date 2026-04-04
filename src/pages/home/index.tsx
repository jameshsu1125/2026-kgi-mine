import Button from '@/components/button';
import useMiner from '@/hooks/useMiner';
import { memo, useState } from 'react';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import { REST_PATH } from '@/settings/config';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);
  const [res, getMiner] = useMiner();

  return (
    <div className='Home'>
      <HomeContext.Provider value={[state, setState]}>
        <h1 className='text-2xl'>
          API test: {import.meta.env.VITE_API_PATH}
          {REST_PATH.immersion_miner}
        </h1>
        <Button onClick={() => getMiner()}>
          <Button.regular>
            <div>asd</div>Get Miner
          </Button.regular>
        </Button>
        <p className='text-center'>{JSON.stringify(res)}</p>
      </HomeContext.Provider>
    </div>
  );
});

export default Home;
