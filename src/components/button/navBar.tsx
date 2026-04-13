import useURI from '@/hooks/useURI';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import './navbar.less';

type TNavBarProps = {
  type?: 'burger' | 'user' | 'eyes' | 'navigate' | 'search';
};

const NavBar = memo(({ type }: TNavBarProps) => {
  useURI({ path: `/navbar-icon-${type}.svg`, name: `navbar-icon-${type}` });
  return (
    <div className={twMerge(type)}>
      <div />
      <div />
      <div />
    </div>
  );
});
export default NavBar;
