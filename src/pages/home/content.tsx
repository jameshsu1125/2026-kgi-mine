import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import { memo, useEffect } from 'react';

const Content = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center'>
      <Heading.H1>歡迎踏上豐盛之旅</Heading.H1>
      <Paragraph className='text-center'>
        你將在旅途中偶遇各種精選內容
        <br />
        你可以用自己的步調
        <br />
        即時瀏覽或收藏再看
        <br />
        準備好展開旅程嗎？
      </Paragraph>
    </div>
  );
});
export default Content;
