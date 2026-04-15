import TweenerProvider from '@/components/tweenProvider';
import useURI from '@/hooks/useURI';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomeStepType } from '../config';
import { HOME_BACKGROUND_TWEEN_PROPERTIES } from './config';
import './index.less';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';

const Background = memo(() => {
  const [state] = useContext(HomeContext);
  const { page } = state;
  const [, setURI] = useURI();

  useEffect(() => {
    PATTERN_URI_PROPERTIES.forEach((item) => setURI(item));
  }, []);

  const shouldFadeIn = useMemo(() => {
    return [
      HomeStepType.landingFadeIn,
      HomeStepType.decadeFadeIn,
      HomeStepType.journeyFadeIn,
      HomeStepType.characterFadeIn,
    ].includes(state.step);
  }, [state.step]);

  const shouldFadeOut = useMemo(() => {
    return [
      HomeStepType.landingFadeOut,
      HomeStepType.decadeFadeOut,
      HomeStepType.journeyFadeOut,
      HomeStepType.characterFadeOut,
    ].includes(state.step);
  }, [state.step]);

  return (
    <div className='background'>
      <div className={page}>
        {[...new Array(7).keys()].map((index) => {
          const { initialStyle, options } = HOME_BACKGROUND_TWEEN_PROPERTIES[index];
          return (
            <TweenerProvider
              key={index}
              initialStyle={initialStyle}
              tweenTo={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              options={
                state.step === HomeStepType.landingFadeIn
                  ? options
                  : Object.fromEntries(
                      Object.entries(options).map(([key, value]) => [
                        key,
                        key === 'delay' || key === 'duration' ? Number(value) * 0.5 : value,
                      ]),
                    )
              }
              shouldFadeIn={shouldFadeIn}
              fadeOutStyle={
                state.step === HomeStepType.landingFadeOut
                  ? initialStyle
                  : { y: -window.innerHeight * 2 }
              }
              shouldFadeOut={shouldFadeOut}
              optionsFadeOut={{
                duration: 2000,
                delay: index * 50,
                easing: Bezier.inQuart,
              }}
              cssAfterFadeOut={{ y: window.innerHeight * 2, opacity: 1, scale: 1, x: 0 }}
              needSetCSSAfterFadeOut={shouldFadeOut}
            >
              <div />
            </TweenerProvider>
          );
        })}
      </div>
    </div>
  );
});
export default Background;
