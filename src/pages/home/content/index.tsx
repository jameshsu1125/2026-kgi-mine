import { memo, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../config';
import Landing from './landing';
import NextDecade from './nextDecade';
import useQuestion from '@/hooks/useQuestion';
import WhichJourney from './whichJourney';

const Content = memo(() => {
  const [state] = useContext(HomeContext);
  const [questionResponse, getQuestions] = useQuestion({ auto: false, backgroundAppProcess: true });

  useEffect(() => {
    if (state.step === HomeStepType.landingFadeIn) {
      getQuestions();
    }
  }, [state.step]);

  const page = useMemo(() => {
    switch (state.page) {
      default:
      case HomePageType.landing:
        return <Landing />;

      case HomePageType.nextDecade:
        return <NextDecade data={questionResponse?.result.quizList} />;

      case HomePageType.whichJourney:
        return <WhichJourney data={questionResponse?.result.tripList} />;
    }
  }, [state.page, questionResponse]);

  return (
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center overflow-hidden select-none'>
      {page}
    </div>
  );
});
export default Content;
