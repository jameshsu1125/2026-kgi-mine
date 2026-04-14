import useURI from '@/hooks/useURI';
import { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { JourneyContext, JourneyDepth, JourneyItemsList, JourneySceneSize } from '../config';
import './index.less';

const Items = memo(({ offset, depth }: { offset: number; depth: 'front' | 'back' }) => {
  const [state] = useContext(JourneyContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [, setURI] = useURI();

  useEffect(() => {
    const { scene } = state;
    const items = JourneyItemsList[scene];
    items.forEach((item) => {
      setURI({ path: item.path, name: item.name });
    });
  }, [state.scene]);

  const items = useMemo(() => {
    const { scene } = state;
    const items = JourneyItemsList[scene];
    return items
      .filter((item) => (depth === 'back' ? item.top < -5.5 : item.top >= -5.5))
      .map((item) => {
        setURI({ path: item.path, name: item.name });
        return { name: item.name, top: item.top, left: item.left };
      });
  }, [state.scene]);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && contentRef.current && boxRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const ratio = JourneySceneSize.width / JourneySceneSize.height;
        const currentWidth = width / height < ratio ? height * ratio : width;
        const currentHeight = width / height < ratio ? height : width / ratio;
        contentRef.current.style.width = `${currentWidth - width}px`;
        contentRef.current.style.height = `${currentHeight}px`;
        contentRef.current.style.visibility = 'visible';
        boxRef.current.style.width = `${currentWidth}px`;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} className='Items'>
      <div ref={contentRef}>
        <div className='content' style={{ left: `-${offset * JourneyDepth.middle}%` }}>
          <div ref={boxRef}>
            {items.map((item) => {
              const y = item.top + 5.5;
              const x = (item.left / 3840) * 100 + 0.5;
              return (
                <div
                  key={item.name}
                  className={item.name}
                  style={{
                    transform: `translateY(${y}vh)`,
                    left: `${x}%`,
                  }}
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
