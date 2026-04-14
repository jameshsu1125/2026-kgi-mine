import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useState } from 'react';
import { JourneyContext, JourneyState, JourneyStepType } from './config';
import './index.less';
import Scene from './scene';

const Journey = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(JourneyState);

  return (
    <JourneyContext.Provider value={[state, setState]}>
      <OnloadProvider
        key={state.scene}
        onStart={() => {
          setState((S) => ({ ...S, step: JourneyStepType.unset }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
        }}
        onload={() => {
          setState((S) => ({ ...S, step: JourneyStepType.fadeIn }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Journey'>
          <Scene />
        </div>
      </OnloadProvider>
    </JourneyContext.Provider>
  );
});
export default Journey;
