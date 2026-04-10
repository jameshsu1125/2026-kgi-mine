import { memo, useContext, useMemo } from 'react';
import { HomeContext, HomePageType } from '../config';
import Landing from './landing';
import NextDecade from './nextDecade';
import useQuestion from '@/hooks/useQuestion';
import WhichJourney from './whichJourney';

const Content = memo(() => {
  const [state] = useContext(HomeContext);
  const [questionResponse] = useQuestion({ auto: true, backgroundAppProcess: true });

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
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center overflow-hidden'>
      {page}
    </div>
  );
});
export default Content;
