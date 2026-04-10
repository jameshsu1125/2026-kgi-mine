import Button from '@/components/button';
import Heading from '@/components/heading';
import Miner from '@/components/miner';
import Paragraph from '@/components/paragraph';
import TweenerProvider from '@/components/tweenProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import useStart from '@/hooks/useStart';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const animationSetting = {
  start: 0,
  duration: 1200,
  paragraphStart: 2000,
  gap: 1000,
};

const Landing = memo(() => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;
  const [{ step }, setState] = useContext(HomeContext);
  const [response, getStart] = useStart();
  const [onButtonFadeIn, setOnButtonFadeIn] = useState(false);

  useEffect(() => {
    if (response?.isSuccess)
      requestAnimationFrame(() => {
        sounds.play('bgm');
      });
  }, [response]);

  return (
    <>
      <TweenerProvider
        initialStyle={{ y: 50, opacity: 0 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{
          duration: animationSetting.duration,
          delay: animationSetting.start,
          easing: Bezier.inOutQuart,
        }}
        shouldFadeOut={step === HomeStepType.landingFadeOut}
        fadeOutStyle={{ opacity: 0 }}
        optionsFadeOut={{ duration: 800 }}
      >
        <Heading.H1>歡迎踏上豐盛之旅</Heading.H1>
      </TweenerProvider>
      <Paragraph className='text-center'>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart,
            easing: Bezier.inOutQuart,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你將在旅途中偶遇各種精選內容
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap,
            easing: Bezier.inOutQuart,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你可以用自己的步調
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap * 2,
            easing: Bezier.inOutQuart,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          即時瀏覽或收藏再看
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap * 3,
            easing: Bezier.inOutQuart,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          準備好展開旅程嗎？
        </TweenerProvider>
      </Paragraph>
      <TweenerProvider
        initialStyle={{ x: -320, opacity: 0 }}
        tweenTo={{ x: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{
          duration: 10000,
          delay: 0,
          easing: Bezier.outBack,
        }}
        shouldFadeOut={step === HomeStepType.landingFadeOut}
        optionsFadeOut={{
          duration: 3000,
          easing: Bezier.inBack,
          onEnd: () => {
            setState((S) => ({ ...S, page: HomePageType.nextDecade }));
          },
        }}
        fadeOutStyle={{ x: 350, opacity: 0 }}
      >
        <Miner height='30vh' className='my-5' autoplay />
      </TweenerProvider>
      <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
        <TweenerProvider
          key={response?.isSuccess}
          initialStyle={{ y: 100, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: response?.isSuccess
              ? 0
              : animationSetting.paragraphStart + animationSetting.gap * 4,
            easing: Bezier.outQuart,
            onEnd: () => setOnButtonFadeIn(true),
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0, y: 50 }}
          optionsFadeOut={{ duration: 800 }}
        >
          {response?.isSuccess ? (
            <Button
              clickOnce
              onClick={() => {
                setState((S) => ({ ...S, step: HomeStepType.landingFadeOut }));
              }}
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
    </>
  );
});
export default Landing;
