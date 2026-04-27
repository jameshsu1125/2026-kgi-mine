import { memo, useContext, useEffect } from 'react';
import './index.less';
import useURI from '@/hooks/useURI';
import { URI } from './config';
import Heading from '../heading';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Button from '../button';

const Recent = memo(() => {
  const [context] = useContext(Context);

  const { title, onClick } = context[ActionType.Recent]!;
  const [, setURI] = useURI();
  useEffect(() => {
    URI.forEach((uri) => setURI(uri));
  }, []);

  return (
    <div className='Recent'>
      <div className='ctx'>
        <Heading.H2 className='tracking-widest'>{title}</Heading.H2>
        <div className='dialog animate-fadeInPy'>
          <Button className='w-full' onClick={onClick}>
            <div className='img' />
          </Button>
        </div>
      </div>
    </div>
  );
});
export default Recent;
