import useURI from '@/hooks/useURI';
import { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { JourneyContext, JourneyItemsList, JourneySceneSize } from '../config';
import './index.less';

const Items = memo(() => {
  const [state] = useContext(JourneyContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

    return items.map((item) => {
      setURI({ path: item.path, name: item.name });
      return { name: item.name, offset: item.offset, position: item.position };
    });
  }, [state.scene]);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && contentRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const ratio = JourneySceneSize.width / JourneySceneSize.height;
        const currentWidth = width / height < ratio ? height * ratio : width;
        const currentHeight = width / height < ratio ? height : width / ratio;
        contentRef.current!.style.width = `${currentWidth}px`;
        contentRef.current!.style.height = `${currentHeight}px`;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} className='Items'>
      <div ref={contentRef}>
        <div>
          {items.map((item) => (
            <div
              key={item.name}
              className={item.name}
              style={{ transform: `translateY(${item.offset}vh)`, left: `${item.position}%` }}
            >
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default Items;
