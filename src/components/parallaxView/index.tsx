import { JourneyContext } from '@/pages/journey/config';
import { SceneDepth, SceneSize } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { getViewPxRatio } from '@/utils';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './index.less';

type ParallaxViewProps = IReactProps & {
  className: string;
  offset: number;
  loop?: boolean;
  onLeftChange?: (left: string) => void;
};

const ParallaxView = memo(
  ({ className, children, offset, loop, onLeftChange }: ParallaxViewProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const [, setState] = useContext(JourneyContext);
    const [context] = useContext(Context);
    const { width = window.innerWidth } = context[ActionType.SceneViewSize]!;
    const ratio = useMemo(() => getViewPxRatio({ width }), [width]);

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [debounceOffsetRef] = useDebounce(innerWidth, 1000);

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
          setInnerWidth((currentWidth / (currentWidth - width)) * 100);
        }
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
      if (innerWidth === 0) return;
      if (innerWidth !== debounceOffsetRef) return;
      const currentLoop = Math.floor((offset * SceneDepth.middle * ratio) / (innerWidth * 2));
      if (loop) {
        setState((S) => ({ ...S, loop: currentLoop }));
      }
    }, [offset, innerWidth, ratio, debounceOffsetRef, width]);

    const left = useMemo(() => {
      if (innerWidth === 0) return '0%';
      return `-${(offset * SceneDepth.middle * ratio) % (innerWidth * 2)}%`;
    }, [offset, innerWidth, ratio]);

    useEffect(() => {
      onLeftChange?.(left);
    }, [left, onLeftChange]);

    return (
      <div className='ParallaxView' ref={containerRef}>
        <div ref={contentRef}>
          <div style={{ left }}>
            <div className={className} ref={boxRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
export default ParallaxView;
