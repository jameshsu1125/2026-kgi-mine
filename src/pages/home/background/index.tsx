import TweenerProvider from '@/components/tweenProvider';
import useURI from '@/hooks/useURI';
import { memo, useContext, useMemo } from 'react';
import { HomeContext, HomeStepType } from '../config';
import { HOME_BACKGROUND_TWEEN_PROPERTIES } from './config';
import './index.less';
import { Bezier } from 'lesca-use-tween';

const Background = memo(() => {
  const [state] = useContext(HomeContext);
  const { page } = state;

  useURI({ path: 'img/pattern-icon-career.png', name: 'pattern-icon-career' });
  useURI({ path: 'img/pattern-icon-finance.png', name: 'pattern-icon-finance' });
  useURI({ path: 'img/pattern-icon-health.png', name: 'pattern-icon-health' });
  useURI({ path: 'img/pattern-icon-relations.png', name: 'pattern-icon-relations' });
  useURI({ path: 'img/pattern-icon-society.png', name: 'pattern-icon-society' });

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
              options={options}
              shouldFadeIn={shouldFadeIn}
              fadeOutStyle={initialStyle}
              shouldFadeOut={shouldFadeOut}
              optionsFadeOut={{
                duration: 2000,
                delay: index * 50,
                easing: Bezier.inOutQuart,
              }}
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
