import Button from '@/components/button';
import Heading from '@/components/heading';
import Miner from '@/components/miner';
import Paragraph from '@/components/paragraph';
import TweenerProvider from '@/components/tweenProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';

const Landing = memo(() => {
  const [{ step }, setState] = useContext(HomeContext);
  const queryStatus = new URLSearchParams(window.location.search).get('status');

  return (
    <>
      <TweenerProvider
        initialStyle={queryStatus ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{ duration: 600, delay: 0 }}
        shouldFadeOut={step === HomeStepType.landingFadeOut}
        fadeOutStyle={{ opacity: 0 }}
        optionsFadeOut={{ duration: 800 }}
      >
        <Heading.H1>歡迎踏上豐盛之旅</Heading.H1>
      </TweenerProvider>
      <Paragraph className='text-center'>
        <TweenerProvider
          initialStyle={queryStatus ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{ duration: 600, delay: 350 }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你將在旅途中偶遇各種精選內容
        </TweenerProvider>
        <TweenerProvider
          initialStyle={queryStatus ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{ duration: 600, delay: 400 }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你可以用自己的步調
        </TweenerProvider>
        <TweenerProvider
          initialStyle={queryStatus ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{ duration: 600, delay: 450 }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          即時瀏覽或收藏再看
        </TweenerProvider>
        <TweenerProvider
          initialStyle={queryStatus ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{ duration: 600, delay: 500 }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          準備好展開旅程嗎？
        </TweenerProvider>
      </Paragraph>
      <TweenerProvider
        initialStyle={queryStatus ? { x: 0, opacity: 1 } : { x: -400, opacity: 0 }}
        tweenTo={{ x: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{ duration: 5000, delay: 700, easing: Bezier.outBack }}
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
          initialStyle={{ y: 100, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{ duration: 800, delay: queryStatus ? 0 : 2000, easing: Bezier.outQuart }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0, y: 50 }}
          optionsFadeOut={{ duration: 800 }}
        >
          {queryStatus ? (
            <Button
              clickOnce
              onClick={() => {
                setState((S) => ({ ...S, step: HomeStepType.landingFadeOut }));
              }}
            >
              <Button.Regular>開始探索</Button.Regular>
            </Button>
          ) : (
            <Button
              clickOnce
              onClick={() => {
                window.location.search = 'status=1';
              }}
            >
              <Button.Outline>登入／註冊會員</Button.Outline>
            </Button>
          )}
        </TweenerProvider>
        {/* <Button>
          <Button.Outline>登入／註冊會員</Button.Outline>
        </Button> */}
      </div>
    </>
  );
});
export default Landing;
