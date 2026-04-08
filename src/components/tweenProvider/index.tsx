import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { CSSProperties, memo, useEffect } from 'react';

interface CSS extends Omit<CSSProperties, 'rotate'> {
  x?: string | number;
  y?: string | number;
  scale?: string | number;
  rotate?: string | number;
  rotateY?: string | number;
  rotateX?: string | number;
  rotateZ?: string | number;
  skewX?: string | number;
  skewY?: string | number;
}

export type Options = {
  duration?: number;
  easing?: number[];
  delay?: number;
  onStart?: Function;
  onUpdate?: Function;
  onEnd?: Function;
};

type TTweenerProvider = IReactProps & {
  initialStyle: CSS;
  tweenTo: CSS;
  options?: Options;
  shouldPlay: boolean;
};

const TweenerProvider = memo(
  ({ children, initialStyle, tweenTo, options, shouldPlay }: TTweenerProvider) => {
    const [style, setStyle] = useTween(initialStyle);

    useEffect(() => {
      if (shouldPlay) setStyle(tweenTo, options);
    }, [shouldPlay, tweenTo]);

    return <div style={style}>{children}</div>;
  },
);
export default TweenerProvider;
