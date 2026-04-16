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
const Scene = memo(() => {
  const [state, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();
  const [, setStyle] = useTween({ top: 0 });
  const [offset, setOffset] = useState(JourneySceneDebug.offset);

  useEffect(() => {
    leftRef = offset;
    // console.log(offset);
  }, [offset]);

  useEffect(() => {
    if (state && state.scene) JourneySceneList[state.scene].forEach((item) => setURI(item));
  }, [state.scene]);

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
