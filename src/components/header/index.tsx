import useURI from '@/hooks/useURI';
import { memo } from 'react';
import Contain from '../contain';

const Header = memo(() => {
  useURI({ filePath: 'img/header-logo.svg', variableName: 'header-logo' });

  return (
    <div className='Header'>
      <Contain className='flex flex-row items-start justify-between'>
        <div className='header-logo' />
      </Contain>
    </div>
  );
});
export default Header;
