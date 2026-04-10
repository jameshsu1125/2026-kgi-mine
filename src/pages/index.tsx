import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import { Context, DatasetState, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useContext, useEffect, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';
import { PAGE } from '@/settings/config';

Click.install('#immersive_experience_section');

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.JSON,
});

const rootAppElement = document.getElementById('immersive_experience_section');
const rooAppDataset = Object.fromEntries(Object.entries(rootAppElement?.dataset || {}));

const App = ({ dataset }: { dataset: typeof rooAppDataset }) => {
  const [context] = useContext(Context);
  const page = context[ActionType.Page]!;

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

  const currentPage = useMemo(() => {
    switch (page) {
      default:
      case PAGE.home:
        return <Home />;

      case PAGE.character:
        return <div>character</div>;
    }
  }, [page]);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Container>{currentPage}</Container>
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
