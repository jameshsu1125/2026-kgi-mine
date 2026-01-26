import Button from '@/components/button';
import useSigIn from '@/hooks/useSigIn';
import { IReactProps } from '@/settings/type';
import { memo, useState } from 'react';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import { faker } from '@faker-js/faker';

const Home = memo(({ children }: IReactProps) => {
  const [state, setState] = useState<THomeState>(HomeState);
  const [todos, getUseSigIn] = useSigIn();

  return (
    <div className='Home'>
      <HomeContext.Provider value={[state, setState]}>
        <h1 className='text-2xl'>{children}</h1>
        <Button
          onClick={() =>
            getUseSigIn({
              credential: faker.finance.creditCardNumber(),
              email: faker.internet.email(),
            })
          }
        >
          <Button.regular>Fetch</Button.regular>
        </Button>
        <p className='text-center'>{JSON.stringify(todos)}</p>
      </HomeContext.Provider>
    </div>
  );
});

export default Home;
