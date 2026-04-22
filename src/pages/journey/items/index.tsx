import useURI from '@/hooks/useURI';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { JourneyContext, JourneyItemsList } from '../config';
import './index.less';
import Item from './item';
import { SceneDepth, SceneSize } from '@/settings/config';

type TJourneyItemsProps = {
  offset: number;
  items: { name: string; top: number; left: number }[];
  onCenter?: (item: string) => void;
};

const Items = memo(({ offset, items, onCenter }: TJourneyItemsProps) => {
  const [state, setState] = useContext(JourneyContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [offsetRef, setOffsetRef] = useState(0);

  const [, setURI] = useURI();

  useEffect(() => {
    const { scene } = state;
    const items = JourneyItemsList[scene];
    items.forEach((item) => {
      setURI({ path: item.path, name: item.name });
    });
  }, [state.scene]);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && contentRef.current && boxRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const ratio = SceneSize.width / SceneSize.height;
        const currentWidth = width / height < ratio ? height * ratio : width;
        const currentHeight = width / height < ratio ? height : width / ratio;
        contentRef.current.style.width = `${currentWidth - width}px`;
        contentRef.current.style.height = `${currentHeight}px`;
        contentRef.current.style.visibility = 'visible';
        boxRef.current.style.width = `${currentWidth}px`;
        boxRef.current.style.left = `${currentWidth}px`;
        setOffsetRef((currentWidth / (currentWidth - width)) * 100);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (offsetRef === 0) return;
    const loop = Math.floor((offset * SceneDepth.middle) / (offsetRef * 2));
    setState((S) => ({ ...S, loop }));
  }, [offset, offsetRef]);

  const left = useMemo(() => {
    if (offsetRef === 0) return '0%';
    return `-${(offset * SceneDepth.middle) % (offsetRef * 2)}%`;
  }, [offset, offsetRef]);

  return (
    <div ref={containerRef} className='Items'>
      <div ref={contentRef}>
        <div className='content' style={{ left }}>
          <div ref={boxRef}>
            {items.map((item) => {
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
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Items;
