import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import { PAGE } from '@/settings/config';
import { Context, DatasetState, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useEffect, useMemo, useReducer, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';
import Journey from './journey';
import Modal from '@/components/modal';
import EnterFrame from 'lesca-enterframe';
import { MINER_SPRITE_FPS } from '@/components/miner/config';

Click.install('#immersive_experience_section');

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.JSON,
});

if (import.meta.env.VITE_MOCKING === 'true') {
  import('@/mocks/browser').then((e) => {
    e.worker.start({ serviceWorker: { url: './mockServiceWorker.js' } });
  });
}

const rootAppElement = document.getElementById('immersive_experience_section');
const rooAppDataset = Object.fromEntries(Object.entries(rootAppElement?.dataset || {}));

const App = ({ dataset }: { dataset: typeof rooAppDataset }) => {
  const [context, setContext] = useReducer(Reducer, {
    ...InitialState,
    [ActionType.Dataset]: { dataset: { ...DatasetState.dataset, ...dataset } },
  });

  const value: TContext = useMemo(() => [context, setContext], [context]);
  const page = context[ActionType.Page] || PAGE.home;

  useEffect(() => {
    const baseUri = `${context[ActionType.Dataset]?.dataset.baseUri || location.origin}`.replace(
      /\/?$/,
      '/',
    );
    window.KGI_MINE_BASE_URI = baseUri;
    document.documentElement.style.setProperty('--base-uri', baseUri);
    EnterFrame.setFPS(MINER_SPRITE_FPS);
  }, []);

  const currentPage = useMemo(() => {
    switch (page) {
      default:
      case PAGE.home:
        return <Home />;

      case PAGE.journey:
        return <Journey />;
    }
  }, [page]);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Container>{currentPage}</Container>
        {context[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
        {context[ActionType.Modal]?.enabled && <Modal />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('immersive_experience_section')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('immersive_experience_section')!).render(
    <App dataset={rooAppDataset} />,
  );
}
