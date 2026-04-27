import { memo, useEffect } from 'react';
import './index.less';

const Card = memo(() => {
  useEffect(() => {}, []);
  return <div className='Card'>Card</div>;
});
export default Card;
