import useURI from '@/hooks/useURI';
import { memo } from 'react';
import Contain from '../contain';
import './index.less';
import NavbarLogo from './logo';
import Menu from './menu';

const NavBar = memo(() => {
  useURI({ filePath: 'img/navbar-logo.svg', variableName: 'navbar-logo' });

  return (
    <div className='Navbar'>
      <Contain className='flex flex-row items-end justify-between'>
        <NavbarLogo />
        <Menu />
      </Contain>
    </div>
  );
});
export default NavBar;
