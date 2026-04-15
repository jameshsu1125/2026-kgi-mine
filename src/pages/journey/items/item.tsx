import Button from '@/components/button';
import useURI from '@/hooks/useURI';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { checkElementCenterOfScreenWithOffset, checkElementInViewport } from '@/utils';
import EnterFrame from 'lesca-enterframe';
import { memo, useContext, useEffect, useRef } from 'react';
import { JourneyContext, JourneyStepType } from '../config';

type TItemProps = {
  item: { name: string; top: number; left: number };
  y: number;
  x: number;
  left: string;
};

const Item = memo(({ item, y, x, left }: TItemProps) => {
  const [, setState] = useContext(JourneyContext);
  const ref = useRef<HTMLDivElement>(null);

  const randomPattern = useRef(
    PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name,
  );

  useEffect(() => {
    if (ref.current && !left.includes('NaN')) {
      const inCenter = checkElementCenterOfScreenWithOffset(ref.current, 50);
      const inView = checkElementInViewport(ref.current);
    }
  }, [left]);

  const [, setURI] = useURI();
  useEffect(() => {
    PATTERN_URI_PROPERTIES.forEach((item) => setURI(item));
  }, []);

  return (
    <div
      ref={ref}
      key={item.name}
      className={item.name}
      style={{
        transform: `translateY(${y}vh)`,
        left: `${x}%`,
      }}
    >
      <div className='marker'>
        <Button
          onClick={() => {
            setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
          }}
        >
          <Button.Marker>
            <div className={`box ${randomPattern.current}`}></div>
          </Button.Marker>
        </Button>
      </div>
    </div>
  );
});
export default Item;
