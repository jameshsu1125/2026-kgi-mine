import { PreloadType } from '@/components/sounds';
import { SoundName } from '@/components/sounds/type';
import { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useURI from '@/hooks/useURI';
import { SceneDepth } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  JourneyContext,
  JourneyItemsList,
  JourneySceneDebug,
  JourneySceneList,
  JourneySceneSetting,
  JourneySceneType,
  JourneyStepType,
} from '../config';
import Items from '../items';
import MinerWalker from '../miner';
import './index.less';
import { getViewPxRatio as getRatio, getViewPxByDirection as getPx } from '@/utils';

type ViewProps = {
  offset: number;
  depth: number;
  image: string;
  isAlpha?: boolean;
};

const View = memo(({ offset, depth, image, isAlpha }: ViewProps) => {
  const [context] = useContext(Context);
  const { width = window.innerWidth } = context[ActionType.SceneImageSize]!;

  const ratio = getRatio({ width });
  const currentOffset = offset * depth * ratio; // 根據深度調整偏移量

  return (
    <div
      className={twMerge('view', isAlpha && 'opacity-50 duration-500', image)}
      style={{ backgroundPositionX: `${currentOffset}%` }}
    />
  );
});

type TJourneySceneProps = {
  onLooped: (index: number) => void;
  onEncounteringRoadSign: () => void;
  onItemSelected?: (item: string) => void;
};

const Moon = memo(() => {
  useURI({ path: 'scene-moonlitSnowfield-moon.png', name: 'scene-moonlitSnowfield-moon' });

  return <div className='moon' />;
});

const Scene = memo(({ onLooped, onEncounteringRoadSign }: TJourneySceneProps) => {
  const [context] = useContext(Context);
  const { width = window.innerWidth } = context[ActionType.SceneImageSize]!;
  const sounds = context[ActionType.Sounds];

  const [state, setState] = useContext(JourneyContext);

  const [, setURI] = useURI();
  const [, setStyle] = useTween({
    left: getPx(JourneySceneSetting.offset, width) - 300,
  });
  const [offset, setOffset] = useState(getPx(JourneySceneSetting.offset, width) - 300);
  const [isAlpha, setIsAlpha] = useState(false);
  const encounteringRoadSignRef = useRef('');

  useEffect(() => {
    if (state && state.scene) {
      JourneySceneList[state.scene].forEach((item) => setURI(item));
      sounds?.track?.stopAll();
    }
  }, [state.scene]);

  const { back, front } = useMemo(() => {
    const { scene } = state;
    const currentList = JourneyItemsList[scene];
    const pickCount = Math.min(
      currentList?.length || 1,
      JourneySceneDebug.count === 'max' ? currentList.length : JourneySceneDebug.count,
    );
    const roadSign = currentList.find((item) => item.name.includes('roadSign'));
    const currentListWithoutRoadSign = currentList.filter(
      (item) => !item.name.includes('roadSign'),
    );
    const items = currentListWithoutRoadSign.sort(() => Math.random() - 0.5).slice(0, pickCount);
    if (roadSign) items.push(roadSign);

    const backOfMinerItems = items
      .filter((item) => item.top < 5.5)
      .map((item) => {
        setURI({ path: item.path, name: item.name });
        return { name: item.name, top: item.top, left: item.left, clicked: false };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const frontOfMinerItems = items
      .filter((item) => item.top >= 5.5)
      .map((item) => {
        setURI({ path: item.path, name: item.name });
        return { name: item.name, top: item.top, left: item.left, clicked: false };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return { back: backOfMinerItems, front: frontOfMinerItems };
  }, [state.scene]);

  useEffect(() => {
    if (sounds && sounds.track) {
      if (sounds?.track) {
        let type: PreloadType = 'onAzureCoast';
        let name: SoundName = 'azureCoast';

        switch (state.scene) {
          case JourneySceneType.金黃稻浪:
            type = 'onGoldenRiceField';
            name = 'goldenRiceField';
            break;
          case JourneySceneType.花海平原:
            type = 'onFlowerSeaPlain';
            name = 'flowerSeaPlain';
            break;
          case JourneySceneType.蔚藍海岸:
            type = 'onAzureCoast';
            name = 'azureCoast';
            break;
          case JourneySceneType.月夜雪地:
            type = 'onMoonlitSnowfield';
            name = 'moonlitSnowfield';
            break;
          case JourneySceneType.晴光森林:
            type = 'onLushForest';
            name = 'lushForest';
            break;
        }
        sounds.track?.preload(type, () => {
          sounds.track?.play(name, 1, false);
          sounds.track?.fadeOut('bgm', 500);
        });
      }
    }
  }, [state.scene, sounds]);

  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      if (JourneySceneDebug.enabled) {
        EnterFrame.stop();
        return;
      }
      setStyle(
        { left: getPx(JourneySceneSetting.offset, width) },
        {
          duration: 12000, // duration: (60 / Debug.fps) * 20000,
          easing: Bezier.easeIn,
          onUpdate: (value: { left: number }) => setOffset(value.left),
          onEnd: (value: { left: number }) => {
            setOffset(value.left);
            setState((S) => ({ ...S, step: JourneyStepType.loop }));
          },
        },
      );
    } else if (state.step === JourneyStepType.fadeOut) {
      setStyle({ left: offset }, 1);
    } else if (state.step === JourneyStepType.resume) {
      EnterFrame.play();
      setIsAlpha(false);
    }
  }, [state.step]);

  useEffect(() => {
    if (state.step === JourneyStepType.loop) {
      EnterFrame.destroy();
      EnterFrame.reset();
      EnterFrame.add(() => setOffset((S) => S + 1));
      EnterFrame.play();
    }
  }, [state.step]);

  useEffect(() => {
    if (state.loop) {
      onLooped?.(state.loop);
    }
  }, [state.loop]);

  const onShowDown = (frame: CharacterFrame) => {
    if (frame) {
      setStyle(
        { left: offset + frame.stepShouldGo },
        {
          duration: frame.duration,
          easing: Bezier.easeOut,
          onUpdate: (value: { left: number }) => {
            setOffset(value.left);
          },
          onEnd: (value: { left: number }) => {
            setOffset(value.left);
            const isRoadSign = encounteringRoadSignRef.current.includes('roadSign');
            if (isRoadSign) onEncounteringRoadSign?.();
            else {
              if (state.scene === JourneySceneType.晴光森林) setIsAlpha(true);
            }
          },
        },
      );
    }
  };

  const onCenter = (name: string) => {
    encounteringRoadSignRef.current = name;
    setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
  };

  useEffect(() => {
    if (!JourneySceneDebug.enabled) return;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        setOffset((S) => S + 20);
        EnterFrame.stop();
      }
      if (e.key === 'ArrowLeft') {
        setOffset((S) => S - 20);
        EnterFrame.stop();
      }
    });
  }, []);

  return (
    <div className='Scene'>
      <View offset={offset} depth={SceneDepth.back} image='back' />
      {state.scene && state.scene === JourneySceneType.月夜雪地 && <Moon />}
      <View offset={offset} depth={SceneDepth.middle} image='middle' />
      <Items offset={offset} items={back} onCenter={onCenter} loop />
      <MinerWalker onShowDown={onShowDown} />
      <Items offset={offset} items={front} onCenter={onCenter} />
      <View offset={offset} depth={SceneDepth.front} image='front' isAlpha={isAlpha} />
    </div>
  );
});
export default Scene;
