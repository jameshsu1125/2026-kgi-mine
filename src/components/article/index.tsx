import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';

const Article = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return (
    <article className='Article'>
      <div>{children}</div>
    </article>
  );
});
export default Article;
