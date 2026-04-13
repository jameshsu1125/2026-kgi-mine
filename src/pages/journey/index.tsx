import { memo, useEffect } from 'react';
import './index.less';
import Scene from './scene';

const Journey = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Journey'>
      <Scene />
    </div>
  );
});
export default Journey;
