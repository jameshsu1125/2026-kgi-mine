import useURI from '@/hooks/useURI';
import { memo } from 'react';
import './logo.less';

const NavbarLogo = memo(() => {
  useURI({ path: 'img/navbar-logo.svg', name: 'navbar-logo' });
  return <div className='navbar-logo' />;
});
export default NavbarLogo;
