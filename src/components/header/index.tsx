import { memo, useEffect } from 'react';
import './index.less';

const Header = memo(() => {
  useEffect(() => {}, []);
  return <div className='Header'>Header</div>;
});
export default Header;
