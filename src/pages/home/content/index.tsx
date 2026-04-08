import { memo, useContext, useMemo } from 'react';
import { HomeContext, HomePageType } from '../config';
import Landing from './landing';

const Content = memo(() => {
  const [state] = useContext(HomeContext);

  const page = useMemo(() => {
    switch (state.page) {
      default:
      case HomePageType.landing:
        return <Landing />;

      case HomePageType.nextDecade:
        return <div>nextDecade</div>;

      case HomePageType.whichJourney:
        return <div>whichJourney</div>;
    }
  }, [state.page]);

  return (
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center overflow-hidden'>
      {page}
    </div>
  );
});
export default Content;
