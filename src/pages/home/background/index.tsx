import TweenerProvider from '@/components/tweenProvider';
import useURI from '@/hooks/useURI';
import { memo, useContext } from 'react';
import { HomeContext, HomeStepType } from '../config';
import './index.less';
import { Bezier } from 'lesca-use-tween';
import { HOME_BACKGROUND_TWEEN_PROPERTIES } from './config';

const Background = memo(() => {
  const [state] = useContext(HomeContext);

  useURI({ path: 'img/pattern-icon-career.png', name: 'pattern-icon-career' });
  useURI({ path: 'img/pattern-icon-finance.png', name: 'pattern-icon-finance' });
  useURI({ path: 'img/pattern-icon-health.png', name: 'pattern-icon-health' });
  useURI({ path: 'img/pattern-icon-relations.png', name: 'pattern-icon-relations' });
  useURI({ path: 'img/pattern-icon-society.png', name: 'pattern-icon-society' });

  return (
    <div className='background'>
      <div>
        {[...new Array(7).keys()].map((index) => {
          const { initialStyle, options } = HOME_BACKGROUND_TWEEN_PROPERTIES[index];
          return (
            <TweenerProvider
              key={index}
              initialStyle={initialStyle}
              tweenTo={{ opacity: 1, scale: 1 }}
              options={options}
              shouldPlay={state.step === HomeStepType.fadeIn}
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
