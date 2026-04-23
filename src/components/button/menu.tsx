import useURI from '@/hooks/useURI';
import { memo } from 'react';
import './menu.less';
import { twMerge } from 'tailwind-merge';

const Menu = memo(({ type, menu }: { type: 'share' | 'mute'; menu?: boolean }) => {
  useURI({ path: `/menu-icon-${type}.svg`, name: `menu-icon-${type}` });
  return <div className={twMerge(type, menu && 'menu')} />;
});
export default Menu;
