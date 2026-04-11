import Miner from '@/components/miner';
import TweenerProvider from '@/components/tweenProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';

const Character = memo(({ shouldStop }: { shouldStop?: boolean }) => {
  const ref = useRef<{ play: () => void; stop: () => void; slowDown: () => void }>(null);
  const [{ step }, setState] = useContext(HomeContext);

  useEffect(() => {
    if (shouldStop === true) {
      ref.current?.slowDown();
    }
  }, [shouldStop]);

  return (
    <TweenerProvider
      initialStyle={{ x: -320, opacity: 0 }}
      tweenTo={{ x: 0, opacity: 1 }}
      shouldFadeIn={step === HomeStepType.landingFadeIn}
      options={{
        duration: 3000,
        delay: 0,
        easing: Bezier.outBack,
      }}
      shouldFadeOut={step === HomeStepType.landingFadeOut}
      optionsFadeOut={{
        duration: 3000,
        easing: Bezier.inBack,
        onStart: () => {
          ref.current?.play();
        },
        onEnd: () => {
          setState((S) => ({ ...S, page: HomePageType.decade }));
        },
      }}
      fadeOutStyle={{ x: 350, opacity: 0 }}
    >
      <Miner ref={ref} height='30vh' className='my-5' autoplay />
    </TweenerProvider>
  );
});
export default Character;
