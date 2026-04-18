import { PreloadType } from '@/components/sounds';
import { SoundName } from '@/components/sounds/type';
import { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  JourneyContext,
  JourneyDepth,
  JourneyItemsList,
  JourneySceneDebug,
  JourneySceneList,
  JourneySceneType,
  JourneyStepType,
} from '../config';
import Items from '../items';
import MinerWalker from '../miner';
import './index.less';

const View = memo(({ offset, depth, image }: { offset: number; depth: number; image: string }) => {
  const currentOffset = offset * depth;
  return (
    <div className={twMerge('view', image)} style={{ backgroundPositionX: `${currentOffset}%` }} />
  );
});

let leftRef = 1;
type TJourneySceneProps = {
  onLooped?: (index: number) => void;
  onItemSelected?: (item: string) => void;
};

const Scene = memo(({ onLooped, onItemSelected }: TJourneySceneProps) => {
  const [context, setContext] = useContext(Context);
  const sounds = context[ActionType.Sounds];

  const [state, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();
  const [, setStyle] = useTween({ top: 0 });
  const [offset, setOffset] = useState(JourneySceneDebug.offset);

  useEffect(() => {
    leftRef = offset;
  }, [offset]);

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
    const items = currentList.sort(() => Math.random() - 0.5).slice(0, pickCount);

    const backOfMinerItems = items
      .filter((item) => item.top < 5.5)
      .map((item) => {
        setURI({ path: item.path, name: item.name });
        return { name: item.name, top: item.top, left: item.left };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const frontOfMinerItems = items
      .filter((item) => item.top >= 5.5)
      .map((item) => {
        setURI({ path: item.path, name: item.name });
        return { name: item.name, top: item.top, left: item.left };
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
          sounds.track?.play(name);
          sounds.track?.fadeOut('bgm', 500);
        });
      }
    }
  }, [state.scene, sounds]);

  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      if (JourneySceneDebug.offset) {
        EnterFrame.stop();
        return;
      }
      setStyle(
        { top: 300 },
        {
          duration: 10000,
          easing: Bezier.easeIn,
          onUpdate: (value: { top: number }) => {
            setOffset(value.top);
          },
          onEnd: (value: { top: number }) => {
            setOffset(value.top);
            setState((S) => ({ ...S, step: JourneyStepType.loop }));
          },
        },
      );
    } else if (state.step === JourneyStepType.fadeOut) {
      setStyle({ top: offset }, 1);
    } else if (state.step === JourneyStepType.resume) {
      EnterFrame.play();
    }
  }, [state.step]);

  useEffect(() => {
    if (state.step === JourneyStepType.loop) {
      EnterFrame.destroy();
      EnterFrame.add(() => {
        setOffset((S) => S + 1);
      });
      EnterFrame.play();
    }
  }, [state.step]);

  useEffect(() => {
    if (state.loop) {
      onLooped?.(state.loop);
    }
  }, [state.loop]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '1') console.log(leftRef);
    });
  }, []);

  const onShowDown = (frame: CharacterFrame) => {
    if (frame) {
      setStyle(
        { top: offset + frame.stepShouldGo },
        {
          duration: frame.duration,
          easing: Bezier.easeOut,
          onUpdate: (value: { top: number }) => {
            setOffset(value.top);
          },
          onEnd: (value: { top: number }) => {
            setOffset(value.top);
            // onItemSelected?.(state.selectedItem || '');
          },
        },
      );
    }
  };

  const onCenter = (_: string) => {
    setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
  };

  return (
    <div className='Scene'>
      <View offset={offset} depth={JourneyDepth.back} image='back' />
      <View offset={offset} depth={JourneyDepth.middle} image='middle' />
      <Items offset={offset} items={back} onCenter={onCenter} />
      <MinerWalker onShowDown={onShowDown} />
      <Items offset={offset} items={front} onCenter={onCenter} />
      <View offset={offset} depth={JourneyDepth.front} image='front' />
    </div>
  );
});
export default Scene;
