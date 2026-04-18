import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useCallback, useContext, useState } from 'react';
import { JourneyContext, JourneySceneType, JourneyState, JourneyStepType } from './config';
import './index.less';
import Scene from './scene';
import UserData from './userData';
import Nav from '@/components/nav';

const Journey = memo(() => {
  const [context, setContext] = useContext(Context);
  const journey = context[ActionType.UserData]?.journey;
  const sounds = context[ActionType.Sounds]!;

  const [state, setState] = useState({
    ...JourneyState,
    scene: journey
      ? Object.entries(JourneySceneType).filter(([key]) => key === journey)[0][1]
      : JourneyState.scene,
  });

  const onLooped = useCallback((_: number) => {
    const forceChangeScene = Math.random() < 0.5;
    const body = forceChangeScene ? (
      <>是否探索一條新的路線?</>
    ) : (
      <>
        你太厲害了！
        <br />
        你已經探索完整趟旅程
        <br />
        成功解鎖許願新路線的權限
      </>
    );

    const label: [string, (string | undefined)?] = forceChangeScene
      ? ['好的', '暫時不要']
      : ['許願新路線'];

    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body,
        label,
        onConfirm: (label) => {
          if (label === '好的' || label === '許願新路線') {
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

  const onItemSelected = useCallback((item: string) => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: (
          <>
            你選擇了 {item}！
            <br />
            這是一個神秘的物品，裡面藏著許多故事
            <br />
            <br />
            「工程師來不及做裡面的內容
            <br />
            就隨便寫了一些話
            <br />
            請你自己發揮想像力吧！」
          </>
        ),
        label: ['繼續探索'],
        onConfirm: () => {
          setState((S) => ({ ...S, step: JourneyStepType.resume }));
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
          sounds.track?.stop('bgm');
        }}
      >
        <div className='Journey'>
          <Scene onLooped={onLooped} onItemSelected={onItemSelected} />
          <UserData />
          {state.nav.enabled && <Nav />}
        </div>
      </OnloadProvider>
    </JourneyContext.Provider>
  );
});
export default Journey;
