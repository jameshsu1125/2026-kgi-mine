import { QuestionnaireOptions } from '@/settings/config';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Button from '../button';
import { useDebounce } from 'use-debounce';

const Questionnaire = memo(() => {
  const [, setContext] = useContext(Context);
  const [index, setIndex] = useState(0);
  const [debouncedIndex] = useDebounce(index, 300);
  const question = useMemo(() => QuestionnaireOptions[debouncedIndex], [debouncedIndex]);
  const [active, setActive] = useState<boolean[]>([]);

  useEffect(() => {
    setActive(question.options?.map(() => false) || []);
  }, [debouncedIndex]);

  useEffect(() => {
    if (question.type === 'Modal') {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: (
            <div className='flex w-full flex-col gap-8'>
              <div className='w-full'>{question.headline}</div>
              <div className='flex w-full flex-col gap-3'>
                {question.options?.map((option, optionIndex) => (
                  <Button
                    key={option.label}
                    className='w-full'
                    active={active[optionIndex]}
                    onClick={() => {
                      setActive((S) => S.map((val, i) => (i === optionIndex ? !val : val)));
                    }}
                  >
                    <Button.Outline className='font-bold'>{option.label}</Button.Outline>
                  </Button>
                ))}
              </div>
              <div className='w-full'>
                <Button
                  onClick={() => {
                    setContext({ type: ActionType.Modal, state: { enabled: false } });
                    if (index < QuestionnaireOptions.length - 1) {
                      setIndex((S) => S + 1);
                    }
                  }}
                >
                  <Button.Regular>{question.confirmLabel}</Button.Regular>
                </Button>
              </div>
            </div>
          ),
        },
      });
    } else {
      setContext({ type: ActionType.Modal, state: { enabled: false } });
      setContext({
        type: ActionType.Recent,
        state: {
          enabled: true,
          title: question.headline,
          onClick: () => {
            setContext({ type: ActionType.Recent, state: { enabled: false } });
            if (index < QuestionnaireOptions.length - 1) {
              setIndex((S) => S + 1);
            }
          },
        },
      });
    }
  }, [question, active]);

  return <></>;
});
export default Questionnaire;
