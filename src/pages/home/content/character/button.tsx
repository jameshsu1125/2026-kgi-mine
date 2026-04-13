import Button from '@/components/button';
import TweenerProvider from '@/components/tweenProvider';
import { memo, useContext } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const SelectButton = memo(({ onClick }: { onClick: () => void }) => {
  const [state] = useContext(HomeContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, y: 50 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{ duration: 600, delay: 1500 }}
      shouldFadeIn={state.step === HomeStepType.characterFadeIn}
      shouldFadeOut={state.step === HomeStepType.characterFadeOut}
      fadeOutStyle={{ opacity: 0 }}
      optionsFadeOut={{ duration: 600 }}
    >
      <div className='flex w-full justify-center'>
        <Button onClick={onClick}>
          <Button.Regular>選擇角色</Button.Regular>
        </Button>
      </div>
    </TweenerProvider>
  );
});

export default SelectButton;
