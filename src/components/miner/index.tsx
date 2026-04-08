import useTween from 'lesca-use-tween';
import { MINER_SIZE, MINER_SPRITE_FRAME_COUNT } from './config';
import './index.less';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import EnterFrame from 'lesca-enterframe';

type MinerProps = {
  height?: string;
  className?: string;
  autoplay?: boolean;
};

const Miner = forwardRef(({ height, className, autoplay }: MinerProps, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [spriteName, setSpriteName] = useState(0);

  useImperativeHandle(ref, () => ({
    play() {
      EnterFrame.play();
    },
  }));

  useEffect(() => {
    if (containerRef.current) {
      const resize = () => {
        const { height } = containerRef.current!.getBoundingClientRect();
        const ratio = MINER_SIZE.width / MINER_SIZE.height;
        const currentWidth = height * ratio;
        const scale = currentWidth / MINER_SIZE.width;
        setScale(scale);
      };
      resize();
      window.addEventListener('resize', resize);

      EnterFrame.add(() => {
        setSpriteName((prev) => (prev + 1) % MINER_SPRITE_FRAME_COUNT);
      });

      if (autoplay) {
        EnterFrame.play();
      }
      return () => {
        EnterFrame.destroy();
        window.removeEventListener('resize', resize);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={`Miner ${className}`} style={{ height }}>
      <div
        className={`sprite sprite-MINER-WALK_${String(spriteName).padStart(5, '0')}`}
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
});
export default Miner;
