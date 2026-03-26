import LoadingProcess from '@/components/loadingProcess';
import { Context, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';

Click.install();

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.string,
});

const App = () => {
  const [state, setState] = useReducer(Reducer, InitialState);
  const value: TContext = useMemo(() => [state, setState], [state]);
  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Home />
        {state[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('immersive_experience_section')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('immersive_experience_section')!).render(<App />);
}
