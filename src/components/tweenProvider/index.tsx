import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { CSSProperties, memo, useEffect, useRef } from 'react';

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
  fadeOutStyle?: CSS;
  options?: Options;
  optionsFadeOut?: Options;
  shouldFadeIn: boolean;
  shouldFadeOut?: boolean;
};

const TweenerProvider = memo((props: TTweenerProvider) => {
  const ref = useRef<HTMLDivElement>(null);

  const { children, initialStyle, tweenTo, options, shouldFadeIn } = props;
  const { fadeOutStyle, optionsFadeOut, shouldFadeOut } = props;

  const [style, setStyle, destroy] = useTween(initialStyle);

  useEffect(() => {
    if (shouldFadeIn) {
      setStyle(tweenTo, { ...options });
    }
    return () => destroy();
  }, [shouldFadeIn, tweenTo]);

  useEffect(() => {
    if (shouldFadeOut && fadeOutStyle) setStyle(fadeOutStyle, optionsFadeOut);
  }, [fadeOutStyle, shouldFadeOut]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
});
export default TweenerProvider;
