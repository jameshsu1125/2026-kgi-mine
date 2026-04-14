import useURI from '@/hooks/useURI';
import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { JourneyContext, JourneyDepth, JourneyStepType } from '../config';
import Items from '../items';
import MinerWalker from '../miner';
import './index.less';

const View = memo(({ offset, depth, image }: { offset: number; depth: number; image: string }) => {
  const currentOffset = offset * depth;
  return (
    <div className={twMerge('view', image)} style={{ backgroundPositionX: `${currentOffset}%` }} />
  );
});

const Scene = memo(() => {
  const [state, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();
  const [, setStyle] = useTween({ top: 0 });
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (state && state.scene) {
      setURI({ path: `${state.scene}-backView.jpg`, name: 'scene-backView' });
      setURI({ path: `${state.scene}-middleView.png`, name: 'scene-middleView' });
      setURI({ path: `${state.scene}-frontView.png`, name: 'scene-frontView' });
    }
  }, [state.scene]);

  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      return;
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
    }
  }, [state.step]);

  useEffect(() => {
    if (state.step === JourneyStepType.loop) {
      EnterFrame.add(() => {
        setOffset((S) => S + 1);
      });
    }
  }, [state.step]);

  return (
    <div className='Scene'>
      <View offset={offset} depth={JourneyDepth.back} image='back' />
      <View offset={offset} depth={JourneyDepth.middle} image='middle' />
      <View offset={offset} depth={JourneyDepth.front} image='front' />
      <Items offset={offset} depth='back' />
      <MinerWalker />
      <Items offset={offset} depth='front' />
    </div>
  );
});
export default Scene;
