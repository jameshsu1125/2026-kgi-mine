import { Debug } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useCallback, useContext, useState } from 'react';
import { JourneyContext, JourneySceneType, JourneyState, JourneyStepType } from './config';
import './index.less';
import Scene from './scene';

const Journey = memo(() => {
  const [context, setContext] = useContext(Context);
  const journey = context[ActionType.UserData]?.journey;

  const [state, setState] = useState({
    ...JourneyState,
    scene: Debug.randomScene
      ? journey
        ? Object.entries(JourneySceneType).filter(([key]) => key === journey)[0][1]
        : JourneyState.scene
      : JourneyState.scene,
  });

  const onLooped = useCallback((_: number) => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: (
          <>
            你太厲害了！
            <br />
            你已經探索完整趟旅程
            <br />
            成功解鎖許願新路線的權限
          </>
        ),
        label: ['許願新路線'],
        onConfirm: (label) => {
          if (label === '許願新路線') {
            setState((S) => {
              const scenes = Object.values(JourneySceneType).filter((scene) => scene !== S.scene);
              return {
                ...S,
                loop: 0,
                scene: scenes[Math.floor(Math.random() * scenes.length)],
              };
            });
          }
        },
      },
    });
  }, []);

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
          <Scene onLooped={onLooped} />
        </div>
      </OnloadProvider>
    </JourneyContext.Provider>
  );
});
export default Journey;
