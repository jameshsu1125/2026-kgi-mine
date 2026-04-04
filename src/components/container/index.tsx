import { memo, useEffect } from 'react';
import './index.less';

const Container = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Container'>
      <div className='bg' />
    </div>
  );
});
export default Container;
