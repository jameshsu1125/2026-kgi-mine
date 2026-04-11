import { MINER_SPRITE_FRAME_COUNT, MINER_SPRITE_STOP_FRAME } from '@/components/miner/config';
import useTween, { Bezier } from 'lesca-use-tween';
import { useState } from 'react';

const useCharacterSlowDown = () => {
  const [state, setState] = useState<number | null>(null);
  const [, setFrame] = useTween({ top: 0 });

  const fetch = (frame: number) => {
    const maxFrame = MINER_SPRITE_FRAME_COUNT - frame + MINER_SPRITE_STOP_FRAME;
    const stepShouldGo =
      MINER_SPRITE_FRAME_COUNT +
      (frame < MINER_SPRITE_STOP_FRAME ? MINER_SPRITE_STOP_FRAME - frame : maxFrame);

    const duration = (stepShouldGo / MINER_SPRITE_FRAME_COUNT) * 700;

    setFrame(
      { top: frame },
      {
        duration: 1,
        onEnd: () => {
          setFrame(
            { top: frame + stepShouldGo },
            {
              easing: Bezier.outQuad,
              duration,
              onUpdate: ({ top }: { top: number }) => {
                setState(Math.floor(top) % MINER_SPRITE_FRAME_COUNT);
              },
              onEnd: ({ top }: { top: number }) => {
                setState(Math.floor(top) % MINER_SPRITE_FRAME_COUNT);
                requestAnimationFrame(() => {
                  setState(null);
                });
              },
            },
          );
        },
      },
    );
  };

  return [state, fetch] as const;
};
export default useCharacterSlowDown;
