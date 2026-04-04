import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import { Context, DatasetState, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useEffect, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';

Click.install();

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.string,
});

const rootAppElement = document.getElementById('immersive_experience_section');
const rooAppDataset = Object.fromEntries(Object.entries(rootAppElement?.dataset || {}));

const App = ({ dataset }: { dataset: typeof rooAppDataset }) => {
  const [state, setState] = useReducer(Reducer, {
    ...InitialState,
    [ActionType.Dataset]: { dataset: { ...DatasetState.dataset, ...dataset } },
  });
  const value: TContext = useMemo(() => [state, setState], [state]);

  useEffect(() => {
    const baseUri = `${state[ActionType.Dataset]?.dataset.baseUri || location.origin}`.replace(
      /\/?$/,
      '/',
    );

    document.documentElement.style.setProperty('--base-uri', baseUri);
  }, []);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Container>
          <Home />
        </Container>
        {state[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('immersive_experience_section')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('immersive_experience_section')!).render(
    <App dataset={rooAppDataset} />,
  );
}
