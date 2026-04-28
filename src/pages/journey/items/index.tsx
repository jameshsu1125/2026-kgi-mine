import ParallaxView from '@/components/parallaxView';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { JourneyContext, JourneyItemsList, JourneyStepType } from '../config';
import './index.less';
import Item from './item';

type TJourneyItemsProps = {
  offset: number;
  items: { name: string; top: number; left: number; clicked: boolean }[];
  onCenter?: (item: string) => void;
  onItemSelected?: (item: string) => void;
  loop?: boolean;
};

const Items = memo(({ offset, items, onCenter, onItemSelected, loop }: TJourneyItemsProps) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(JourneyContext);
  const [currentItems, setCurrentItems] = useState(items);
  const [left, setLeft] = useState('');
  const [, setURI] = useURI();

  useEffect(() => {
    const { scene } = state;
    const items = JourneyItemsList[scene];
    items.forEach((item) => setURI({ path: item.path, name: item.name }));
  }, [state.scene]);

  const onSelected = useCallback(
    (item: string) => {
      setCurrentItems((items) => items.map((i) => (i.name === item ? { ...i, clicked: true } : i)));
      setContext({ type: ActionType.Card, state: { enabled: true } });
      setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
      onItemSelected?.(item);
    },
    [setState, setContext],
  );

  return (
    <ParallaxView className='Item' offset={offset} loop={loop} onLeftChange={setLeft}>
      {currentItems.map((item) => {
        const y = item.top + 5.5;
        const x = (item.left / 3840) * 100;
        return (
          <Item
            key={item.name}
            item={item}
            y={y}
            x={x}
            left={left}
            onCenter={() => onCenter?.(item.name)}
            onItemSelected={() => onSelected?.(item.name)}
          />
        );
      })}
    </ParallaxView>
  );
});
export default Items;
