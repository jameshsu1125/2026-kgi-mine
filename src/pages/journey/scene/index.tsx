import { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useURI from '@/hooks/useURI';
import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  JourneyContext,
  JourneyDepth,
  JourneySceneDebug,
  JourneySceneList,
  JourneySceneType,
  JourneyStepType,
} from '../config';
import Items from '../items';
import MinerWalker from '../miner';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { PreloadType } from '@/components/sounds';
import { SoundName } from '@/components/sounds/type';

const View = memo(({ offset, depth, image }: { offset: number; depth: number; image: string }) => {
  const currentOffset = offset * depth;
  return (
    <div className={twMerge('view', image)} style={{ backgroundPositionX: `${currentOffset}%` }} />
  );
});

let leftRef = 1;
const Scene = memo(() => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds];

  const [state, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();
  const [, setStyle] = useTween({ top: 0 });
  const [offset, setOffset] = useState(JourneySceneDebug.offset);

  useEffect(() => {
    leftRef = offset;
    // console.log(offset);
  }, [offset]);

  useEffect(() => {
    if (state && state.scene) {
      JourneySceneList[state.scene].forEach((item) => setURI(item));
    }
  }, [state.scene]);

  useEffect(() => {
    if (sounds && sounds.track) {
      if (sounds?.track) {
        let type: PreloadType = 'onAzureCoast';
        let name: SoundName = 'azureCoast';

        switch (state.scene) {
          case JourneySceneType.黃金稻浪:
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
          case JourneySceneType.翁鬱森林:
            type = 'onLushForest';
            name = 'lushForest';
            break;
        }
        sounds.track?.preload(type, () => {
          sounds.track?.play(name);
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
      EnterFrame.add(() => {
        setOffset((S) => S + 1);
      });
    }
  }, [state.step]);

  useEffect(() => {
    if (state.loop) {
      // EnterFrame.stop();
      console.log(state.loop);
    }
  }, [state.loop]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        //  EnterFrame.stop();
        console.log(leftRef);
      }
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
          },
        },
      );
    }
  };

  return (
    <div className='Scene'>
      <View offset={offset} depth={JourneyDepth.back} image='back' />
      <View offset={offset} depth={JourneyDepth.middle} image='middle' />
      <Items offset={offset} depth='back' />
      <MinerWalker onShowDown={onShowDown} />
      <Items offset={offset} depth='front' />
      <View offset={offset} depth={JourneyDepth.front} image='front' />
    </div>
  );
});
export default Scene;
