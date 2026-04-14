import Miner from '@/components/miner';
import { memo, useContext, useEffect, useRef } from 'react';
import { JourneyContext, JourneyStepType } from '../config';
import useTween, { Bezier } from 'lesca-use-tween';

const MinerWalker = memo(() => {
  const ref = useRef<{ play: () => void; stop: () => void; slowDown: () => void }>(null);
  const [style, setStyle] = useTween({
    x: 0,
    // x: -window.innerWidth * 0.55
  });
  const [state] = useContext(JourneyContext);
  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      return;
      setStyle(
        { x: 0 },
        {
          duration: 10000,
          onEnd: () => {},
          easing: Bezier.easeIn,
        },
      );
    }
  }, [state.step]);
  return (
    <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center'>
      <div style={style}>
        <Miner ref={ref} height='20vh' className='mt-[15vh]' autoplay />
      </div>
    </div>
  );
});
export default MinerWalker;
