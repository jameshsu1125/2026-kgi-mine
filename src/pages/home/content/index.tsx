import Button from '@/components/button';
import Heading from '@/components/heading';
import Miner from '@/components/miner';
import Paragraph from '@/components/paragraph';
import { memo } from 'react';

const Content = memo(() => {
  return (
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center overflow-hidden'>
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
      <Miner height='30vh' className='my-5' autoplay />
      <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
        <Button>
          <Button.Regular>開始探索</Button.Regular>
        </Button>
        <Button>
          <Button.Outline>登入／註冊會員</Button.Outline>
        </Button>
      </div>
    </div>
  );
});
export default Content;
