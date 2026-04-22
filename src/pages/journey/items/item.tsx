import Button from '@/components/button';
import useURI from '@/hooks/useURI';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { checkElementCenterOfScreenWithOffset, checkElementInViewport } from '@/utils';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { JourneyContext, JourneySceneSetting } from '../config';

type TItemProps = {
  item: { name: string; top: number; left: number };
  y: number;
  x: number;
  left: string;
  onCenter?: () => void;
  onInView?: () => void;
};

const Item = memo(({ item, y, x, left, onCenter, onInView }: TItemProps) => {
  const [, setState] = useContext(JourneyContext);
  const [, setURI] = useURI();

  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState({ isCenter: false, isInView: false });

  const randomPattern = useRef(
    PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name,
  );

  useEffect(() => {
    if (ref.current && !left.includes('NaN')) {
      const inCenter = checkElementCenterOfScreenWithOffset(
        ref.current,
        JourneySceneSetting.itemsCenterThreshold,
      );

      const inView = checkElementInViewport(ref.current);
      if (inCenter && !status.isCenter) {
        onCenter?.();
        setStatus((S) => ({ ...S, isCenter: true }));
      }
      if (inView && !status.isInView) {
        onInView?.();
        setStatus((S) => ({ ...S, isInView: true }));
      }
    }
  }, [left, status]);

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
            setState((S) => ({ ...S, nav: { enabled: true } }));
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
