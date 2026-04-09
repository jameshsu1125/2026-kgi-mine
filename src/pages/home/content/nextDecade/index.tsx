import Button from '@/components/button';
import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';

const NextDecade = memo(({ data }: { data?: ResponseType['result']['quizList'] }) => {
  const [, setContext] = useContext(Context);

  useEffect(() => {
    if (data) setContext({ type: ActionType.LoadingProcess, state: { enabled: data.length <= 0 } });
  }, [data]);

  return (
    <>
      <TweenerProvider
        initialStyle={{ y: 50, opacity: -0.1 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn
        options={{ duration: 600, delay: 800 }}
      >
        <Heading.H2>你想要的下一個十年是?</Heading.H2>
      </TweenerProvider>
      <TweenerProvider
        initialStyle={{ y: 50, opacity: -0.1 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn
        options={{ duration: 600, delay: 850 }}
      >
        <Heading.D4>(請選擇3個)</Heading.D4>
      </TweenerProvider>

      <div className='w-full px-10 pt-16 md:px-44'>
        <div className='grid w-full grid-cols-2 gap-5 md:gap-8'>
          {data?.map((data, index) => {
            return (
              <TweenerProvider
                key={JSON.stringify(data)}
                initialStyle={{ opacity: -0.1, y: 80 }}
                tweenTo={{ opacity: 1, y: 0 }}
                options={{ duration: 600, delay: 1000 + index * 50 }}
                shouldFadeIn
              >
                <div className='flex w-full justify-center'>
                  <Button className='w-full'>
                    <Button.Outline size='full'>{data.name}</Button.Outline>
                  </Button>
                </div>
              </TweenerProvider>
            );
          })}
        </div>
      </div>
    </>
  );
});
export default NextDecade;
