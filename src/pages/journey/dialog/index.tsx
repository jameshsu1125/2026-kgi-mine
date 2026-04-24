import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './index.less';
import { JourneyContext, JourneyDialogType } from '../config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Button from '@/components/button';

const Wish = memo(() => {
  const [, setState] = useContext(JourneyContext);
  const [, setContext] = useContext(Context);
  useEffect(() => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: (
          <div className='py-5'>
            太厲害了！
            <br />
            成功解鎖許願新路線的權限
          </div>
        ),
        label: ['許願新路線'],
        onConfirm: (label) => {
          if (label === '許願新路線') {
            setState((S) => ({
              ...S,
              dialog: { enabled: true, type: JourneyDialogType.navigator },
            }));
          }
        },
      },
    });
  }, []);
  return <></>;
});

const Navigator = memo(() => {
  const [, setState] = useContext(JourneyContext);
  const [, setContext] = useContext(Context);
  const [btns, setBtns] = useState([
    { name: 'A', isActive: false },
    { name: 'B', isActive: false },
    { name: 'C', isActive: false },
    { name: 'D', isActive: false },
    { name: 'E', isActive: false },
  ]);

  const onClick = useCallback((dataset?: Record<string, string>) => {
    const name = dataset?.name;
    if (!name) return;
    setBtns((btns) =>
      btns.map((btn) => {
        if (btn.name === name) {
          return { ...btn, isActive: !btn.isActive };
        }
        return btn;
      }),
    );
  }, []);

  useEffect(() => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: (
          <div className='flex w-full min-w-58.25 flex-col gap-10 md:min-w-78'>
            <div className='w-full text-center'>
              你最想跟哪一位導航員
              <br />
              共同探索下一段豐盛旅程？（可複選）
            </div>
            <div className='flex w-full flex-col gap-5'>
              {btns.map((btn) => {
                return (
                  <Button
                    key={btn.name}
                    onClick={onClick}
                    dataset={{ name: btn.name }}
                    active={btn.isActive}
                  >
                    <Button.Outline
                      size='w-full'
                      className='tracking-widest'
                    >{`人選 ${btn.name}`}</Button.Outline>
                  </Button>
                );
              })}
            </div>
          </div>
        ),
        label: ['確定'],
        onConfirm: (label) => {
          if (label === '確定') {
            setState((S) => ({
              ...S,
              dialog: { enabled: true, type: JourneyDialogType.subject },
            }));
          }
        },
      },
    });
  }, [btns]);

  return <></>;
});

const Subject = memo(() => {
  const [, setState] = useContext(JourneyContext);
  const [, setContext] = useContext(Context);
  const [btns, setBtns] = useState([
    { name: '解鎖複利魔法', isActive: false },
    { name: '建立高效習慣', isActive: false },
    { name: '穩健的退休規劃 C', isActive: false },
    { name: '培養你的豐盛盟友', isActive: false },
    { name: '提升溝通與關係的質感', isActive: false },
  ]);

  const onClick = useCallback((dataset?: Record<string, string>) => {
    const name = dataset?.name;
    if (!name) return;
    setBtns((btns) =>
      btns.map((btn) => {
        if (btn.name === name) {
          return { ...btn, isActive: !btn.isActive };
        }
        return btn;
      }),
    );
  }, []);

  useEffect(() => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: (
          <div className='flex w-full min-w-58.25 flex-col gap-10 md:min-w-78'>
            <div className='w-full text-center'>
              最想深入挖掘的主題？
              <br />
              （可複選）
            </div>
            <div className='flex w-full flex-col gap-5'>
              {btns.map((btn) => {
                return (
                  <Button
                    key={btn.name}
                    onClick={onClick}
                    dataset={{ name: btn.name }}
                    active={btn.isActive}
                  >
                    <Button.Outline
                      size='w-full'
                      className='tracking-widest'
                    >{`${btn.name}`}</Button.Outline>
                  </Button>
                );
              })}
            </div>
          </div>
        ),
        label: ['確定'],
        onConfirm: (label) => {
          if (label === '確定') {
            setState((S) => ({
              ...S,
              dialog: { enabled: false, type: JourneyDialogType.wish },
            }));
          }
        },
      },
    });
  }, [btns]);
  return <></>;
});

const Dialog = memo(() => {
  const [state] = useContext(JourneyContext);
  const page = useMemo(() => {
    switch (state.dialog.type) {
      default:
      case JourneyDialogType.wish:
        return <Wish />;

      case JourneyDialogType.navigator:
        return <Navigator />;

      case JourneyDialogType.subject:
        return <Subject />;
    }
  }, [state.dialog]);
  return <div className='Dialog'>{page}</div>;
});
export default Dialog;
