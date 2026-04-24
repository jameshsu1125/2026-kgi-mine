import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

const Article = memo(({ children, className }: IReactProps & { className?: string }) => (
  <article className='Article'>
    <div className={twMerge(className ? className : 'max-w-3xl')}>{children}</div>
  </article>
));
export default Article;
