import Button from '@/components/button';
import Heading from '@/components/heading';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType } from '../../config';

const NextDecade = memo(({ data }: { data?: ResponseType['result']['quizList'] }) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(HomeContext);

  useEffect(() => {
    if (data) setContext({ type: ActionType.LoadingProcess, state: { enabled: data.length <= 0 } });
  }, [data]);

  const onClick = useCallback(
    (dataset?: Record<string, string>) => {
      setState((S) => {
        const cloneS = { ...S };
        const isDatasetExist = cloneS.nextDecadeData?.find((d) => d.name === dataset?.name);
        const nextDecadeData = isDatasetExist
          ? cloneS.nextDecadeData?.filter((d) => d.name !== dataset?.name)
          : [...(cloneS.nextDecadeData || []), dataset || {}];
        if (nextDecadeData && nextDecadeData.length > 3) return S;
        cloneS.nextDecadeData = nextDecadeData;
        return cloneS;
      });
    },
    [setState],
  );

  useEffect(() => {
    if (state.nextDecadeData && state.nextDecadeData?.length >= 3) {
      setState((S) => ({ ...S, page: HomePageType.whichJourney }));
    }
  }, [state.nextDecadeData]);

  const currentData = useMemo(() => {
    return data?.map((dat) => {
      const isActive = state.nextDecadeData?.find((d) => d.name === dat.name);
      return { ...dat, active: String(!!isActive) };
    });
  }, [data, state.nextDecadeData]);

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
          {currentData?.map((dat, index) => (
            <TweenerProvider
              key={JSON.stringify(index)}
              initialStyle={{ opacity: -0.1, y: 80 }}
              tweenTo={{ opacity: 1, y: 0 }}
              options={{ duration: 600, delay: 1000 + index * 50 }}
              shouldFadeIn
            >
              <div className='flex w-full justify-center'>
                <Button
                  className='w-full'
                  onClick={onClick}
                  dataset={dat}
                  active={dat.active === 'true'}
                >
                  <Button.Outline size='full'>{dat.name}</Button.Outline>
                </Button>
              </div>
            </TweenerProvider>
          ))}
        </div>
      </div>
    </>
  );
});
export default NextDecade;
