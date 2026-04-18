import Miner from '@/components/miner';
import { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { JourneyContext, JourneySceneDebug, JourneyStepType } from '../config';

type MinerWalkerProps = {
  onShowDown?: (frame: CharacterFrame) => void;
};

const MinerWalker = memo(({ onShowDown }: MinerWalkerProps) => {
  const ref = useRef<{
    play: () => void;
    stop: () => void;
    slowDown: () => any;
    getFrame: () => CharacterFrame | null;
    getTargetWidth: () => number;
  }>(null);

  const [style, setStyle] = useTween({
    x: JourneySceneDebug.offset === 0 ? -window.innerWidth * 0.5 - 75 : 0,
  });
  const [state] = useContext(JourneyContext);

  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      if (JourneySceneDebug.offset) return;
      setStyle(
        { x: 0 },
        { duration: 10000, easing: Bezier.easeIn, onStart: () => ref.current?.play() },
      );
    } else if (state.step === JourneyStepType.fadeOut) {
      ref.current?.slowDown();
    }
  }, [state.step]);

  return (
    <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center'>
      <div style={style}>
        <Miner ref={ref} height='20vh' className='mt-[25vh]' onShowDown={onShowDown} autoplay />
      </div>
    </div>
  );
});
export default MinerWalker;
