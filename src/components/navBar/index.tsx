import { memo } from 'react';
import Contain from '../contain';
import './index.less';
import NavbarLogo from './logo';
import Menu from './menu';

const NavBar = memo(() => (
  <div className='Navbar'>
    <Contain className='flex w-full max-w-7xl flex-row items-end justify-between md:items-center'>
      <NavbarLogo />
      <Menu />
    </Contain>
  </div>
));
export default NavBar;
