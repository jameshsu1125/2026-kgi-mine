import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';
import { twMerge } from 'tailwind-merge';

const Article = memo(({ children, className }: IReactProps & { className?: string }) => {
  useEffect(() => {}, []);
  return (
    <article className='Article'>
      <div className={twMerge(className ? className : 'max-w-3xl')}>{children}</div>
    </article>
  );
});
export default Article;
