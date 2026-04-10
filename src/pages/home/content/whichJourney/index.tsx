import Heading from '@/components/heading';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { Context } from '@/settings/constant';
import { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import Button from '@/components/button';
import { ActionType } from '@/settings/type';
import { PAGE } from '@/settings/config';

const WhichJourney = memo(({ data }: { data?: ResponseType['result']['tripList'] }) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(HomeContext);

  useEffect(() => {
    if (state.whichJourneyData && state.whichJourneyData?.length >= 1) {
      setState((S) => ({ ...S, step: HomeStepType.whichJourneyFadeOut }));
    }
  }, [state.whichJourneyData]);

  const onClick = useCallback(
    (dataset?: Record<string, string>) => {
      setState((S) => {
        const clone = { ...S };
        const isDatasetExist = clone.whichJourneyData?.find((d) => d.name === dataset?.name);
        const whichJourneyData = isDatasetExist
          ? clone.whichJourneyData?.filter((d) => d.name !== dataset?.name)
          : [...(clone.whichJourneyData || []), dataset || {}];
        if (whichJourneyData && whichJourneyData.length > 1) return S;
        clone.whichJourneyData = whichJourneyData;
        return clone;
      });
    },
    [setState],
  );

  const currentData = useMemo(() => {
    return data?.map((dat) => {
      const isActive = state.whichJourneyData?.find((d) => d.name === dat.name);
      return { ...dat, active: String(!!isActive) };
    });
  }, [data, state.whichJourneyData]);

  return (
    <>
      <TweenerProvider
        initialStyle={{ y: 50, opacity: -0.1 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn
        options={{ duration: 600, delay: 0 }}
        shouldFadeOut={state.step === HomeStepType.whichJourneyFadeOut}
        fadeOutStyle={{ opacity: 0 }}
        optionsFadeOut={{ duration: 600 }}
      >
        <Heading.H2>你想要的下一個十年是?</Heading.H2>
      </TweenerProvider>
      <div className='w-full px-10 pt-16 md:px-44'>
        <div className='grid w-full grid-cols-1 gap-5 md:gap-8'>
          {currentData?.map((dat, index) => (
            <TweenerProvider
              key={JSON.stringify(index)}
              initialStyle={{ opacity: -0.1, y: 80 }}
              tweenTo={{ opacity: 1, y: 0 }}
              options={{ duration: 600, delay: 100 + index * 50 }}
              shouldFadeIn
              shouldFadeOut={state.step === HomeStepType.whichJourneyFadeOut}
              fadeOutStyle={{ opacity: 0 }}
              optionsFadeOut={{
                duration: 600,
                delay: 100 + index * 20,
                onEnd: () => {
                  setContext({ type: ActionType.Page, state: PAGE.character });
                },
              }}
            >
              <div className='flex w-full justify-center'>
                <Button
                  className='w-full'
                  onClick={onClick}
                  dataset={dat}
                  active={dat.active === 'true'}
                  disabled={state.step === HomeStepType.whichJourneyFadeOut}
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
export default WhichJourney;
