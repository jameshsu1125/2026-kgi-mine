import Button from '@/components/button';
import TweenerProvider from '@/components/tweenProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useState } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const Buttons = memo(({ type, getStart }: { type: 'login' | 'entry'; getStart: () => void }) => {
  const [{ step }, setState] = useContext(HomeContext);
  const [onButtonFadeIn, setOnButtonFadeIn] = useState(false);

  return (
    <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
      <TweenerProvider
        key={type}
        initialStyle={{ y: 50, opacity: 0 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{
          duration: 1200,
          delay: type === 'entry' ? 0 : 0,
          easing: Bezier.outQuart,
          onEnd: () => setOnButtonFadeIn(true),
        }}
        shouldFadeOut={step === HomeStepType.landingFadeOut}
        fadeOutStyle={{ opacity: 0, y: 50 }}
        optionsFadeOut={{ duration: 800 }}
      >
        {type === 'entry' ? (
          <Button
            clickOnce
            onClick={() => {
              setState((S) => ({ ...S, step: HomeStepType.landingFadeOut }));
            }}
            disabled={step === HomeStepType.landingFadeOut}
          >
            <Button.Regular>開始探索</Button.Regular>
          </Button>
        ) : (
          <Button clickOnce onClick={() => getStart()} disabled={!onButtonFadeIn}>
            <Button.Outline>登入／註冊會員</Button.Outline>
          </Button>
        )}
      </TweenerProvider>
    </div>
  );
});
export default Buttons;
