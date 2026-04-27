import { memo, useEffect } from 'react';
import './index.less';
import Blockquote from '../article';
import useURI from '@/hooks/useURI';
import { CardDemoData, URI } from './config';
import Heading from '../heading';
import Button from '../button';
import { twMerge } from 'tailwind-merge';

const Card = memo(() => {
  const [, setURI] = useURI();

  useEffect(() => {
    URI.forEach((uri) => setURI(uri));
  }, []);

  return (
    <div className='Card'>
      <Blockquote className='max-w-md' scroll>
        <div className='inner'>
          <div className='round'>
            <div className='head'>
              <Heading.H1>{CardDemoData.headline}</Heading.H1>
              <div className='navBar'>
                <Button className='h-6 w-6'>
                  <Button.Card type='Card' />
                </Button>
                <Button className='h-6 w-6'>
                  <Button.Card type='Bookmark' />
                </Button>
              </div>
            </div>
            <div className='sub'>
              <Heading.H3>導航員</Heading.H3>
              <div className='hr' />
              <Heading.H3>{CardDemoData.navigator}</Heading.H3>
            </div>
            <div className='card'>
              <img src='/card-demo.jpg' alt='Card Demo' />
              <div className='gradient-top' />
              <div className='gradient-bottom' />
              <div className='ctx'>
                <div className='head'>
                  <Heading.D3 icon={CardDemoData.icon}>豐盛未來式</Heading.D3>
                  <div className='navBar'>
                    {CardDemoData.mines.map((mine) => (
                      <div
                        key={mine.type}
                        className={twMerge(mine.type, `after:content-[attr(data-count)]`)}
                        data-count={mine.count}
                      />
                    ))}
                  </div>
                </div>
                <div className='foot'>
                  <Button className='w-fit'>
                    <Button.Soft>點我觀看</Button.Soft>
                  </Button>
                  <Button className='w-fit'>
                    <Button.Soft>收藏內容</Button.Soft>
                  </Button>
                  <Button className='w-fit'>
                    <Button.Soft>繼續旅程</Button.Soft>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Blockquote>
    </div>
  );
});
export default Card;
