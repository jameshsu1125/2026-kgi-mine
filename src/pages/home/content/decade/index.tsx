import Article from '@/components/article';
import Button from '@/components/button';
import Heading from '@/components/heading';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';

const 你想要的下一個十年是 = memo(({ data }: { data?: ResponseType['result']['quizList'] }) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(HomeContext);

  useEffect(() => {
    if (data) setContext({ type: ActionType.LoadingProcess, state: { enabled: data.length <= 0 } });
  }, [data]);

  const onClick = useCallback(
    (dataset?: Record<string, string>) => {
      setState((S) => {
        const clone = { ...S };
        const isDatasetExist = clone.decadeData?.find((d) => d.name === dataset?.name);
        const nextDecadeData = isDatasetExist
          ? clone.decadeData?.filter((d) => d.name !== dataset?.name)
          : [...(clone.decadeData || []), dataset || {}];
        if (nextDecadeData && nextDecadeData.length > 3) return S;
        clone.decadeData = nextDecadeData;
        return clone;
      });
    },
    [setState],
  );

  useEffect(() => {
    if (state.decadeData && state.decadeData?.length >= 3) {
      setState((S) => ({ ...S, step: HomeStepType.nextDecadeFadeOut }));
    }
  }, [state.decadeData]);

  const currentData = useMemo(() => {
    return data?.map((dat) => {
      const isActive = state.decadeData?.find((d) => d.name === dat.name);
      return { ...dat, active: String(!!isActive) };
    });
  }, [data, state.decadeData]);

  return (
    <Article>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: -0.1 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn
          options={{ duration: 600, delay: 0 }}
          shouldFadeOut={state.step === HomeStepType.nextDecadeFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 600 }}
        >
          <Heading.H2>你想要的下一個十年是?</Heading.H2>
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: 50, opacity: -0.1 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn
          options={{ duration: 600, delay: 50 }}
          shouldFadeOut={state.step === HomeStepType.nextDecadeFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 600, delay: 50 }}
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
                options={{ duration: 600, delay: 100 + index * 50 }}
                shouldFadeIn
                shouldFadeOut={state.step === HomeStepType.nextDecadeFadeOut}
                fadeOutStyle={{ opacity: 0 }}
                optionsFadeOut={{
                  duration: 600,
                  delay: 100 + index * 20,
                  onEnd: () => {
                    index === currentData.length - 1 &&
                      setState((S) => ({ ...S, page: HomePageType.journey }));
                  },
                }}
              >
                <div className='flex w-full justify-center'>
                  <Button
                    className='w-full'
                    onClick={onClick}
                    dataset={dat}
                    active={dat.active === 'true'}
                    disabled={state.step === HomeStepType.nextDecadeFadeOut}
                  >
                    <Button.Outline size='full'>{dat.name}</Button.Outline>
                  </Button>
                </div>
              </TweenerProvider>
            ))}
          </div>
        </div>
      </div>
    </Article>
  );
});
export default 你想要的下一個十年是;
