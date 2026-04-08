import Button from '@/components/button';
import Heading from '@/components/heading';
import Miner from '@/components/miner';
import Paragraph from '@/components/paragraph';
import TweenerProvider from '@/components/tweenProvider';
import { memo, useContext, useRef } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import { Bezier } from 'lesca-use-tween';

const Landing = memo(() => {
  const [{ step }] = useContext(HomeContext);

  return (
    <>
      <TweenerProvider
        initialStyle={{ y: 50, opacity: 0 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldPlay={step === HomeStepType.fadeIn}
        options={{ duration: 600, delay: 0 }}
      >
        <Heading.H1>歡迎踏上豐盛之旅</Heading.H1>
      </TweenerProvider>
      <Paragraph className='text-center'>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldPlay={step === HomeStepType.fadeIn}
          options={{ duration: 600, delay: 500 }}
        >
          你將在旅途中偶遇各種精選內容
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldPlay={step === HomeStepType.fadeIn}
          options={{ duration: 600, delay: 550 }}
        >
          你可以用自己的步調
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldPlay={step === HomeStepType.fadeIn}
          options={{ duration: 600, delay: 600 }}
        >
          即時瀏覽或收藏再看
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldPlay={step === HomeStepType.fadeIn}
          options={{ duration: 600, delay: 650 }}
        >
          準備好展開旅程嗎？
        </TweenerProvider>
      </Paragraph>

      <TweenerProvider
        initialStyle={{ x: -500, opacity: 0 }}
        tweenTo={{ x: 0, opacity: 1 }}
        shouldPlay={step === HomeStepType.fadeIn}
        options={{ duration: 2000, delay: 1000, easing: Bezier.outBack }}
      >
        <Miner height='30vh' className='my-5' autoplay />
      </TweenerProvider>

      <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
        <Button>
          <Button.Regular>開始探索</Button.Regular>
        </Button>
        <Button>
          <Button.Outline>登入／註冊會員</Button.Outline>
        </Button>
      </div>
    </>
  );
});
export default Landing;
