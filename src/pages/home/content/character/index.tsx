import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { memo, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import Heading from '@/components/heading';
import Carousel from './slider';
import useURI from '@/hooks/useURI';

const 選擇你的Miner角色 = memo(({ data }: { data?: ResponseType['result']['minerList'] }) => {
  const [state] = useContext(HomeContext);
  const [, setURI] = useURI();

  useEffect(() => {
    data &&
      data.forEach((item) => {
        setURI({ path: item.image, name: item.name });
      });
  }, [data]);

  return (
    <>
      <div className='flex w-full flex-col gap-2 text-center'>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn
          options={{ duration: 600, delay: 0 }}
          shouldFadeOut={state.step === HomeStepType.whichJourneyFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 600 }}
        >
          <Heading.H2>選擇你的Miner角色</Heading.H2>
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn
          options={{ duration: 600, delay: 50 }}
          shouldFadeOut={state.step === HomeStepType.whichJourneyFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 600 }}
        >
          <Heading.H2>開啟一段專屬旅程！</Heading.H2>
        </TweenerProvider>
      </div>
      <div className='h-[40vh] w-full'>
        <Carousel data={data} />
      </div>
    </>
  );
});

export default 選擇你的Miner角色;
