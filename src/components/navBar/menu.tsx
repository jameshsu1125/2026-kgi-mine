import { memo, useEffect } from 'react';
import './menu.less';
import Button from '../button';

const Menu = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Menu'>
      <Button>
        <Button.NavBar type='burger' />
      </Button>
      <Button>
        <Button.NavBar type='user' />
      </Button>
      <Button>
        <Button.NavBar type='eyes' />
      </Button>
      <Button>
        <Button.NavBar type='navigate' />
      </Button>
      <Button>
        <Button.NavBar type='search' />
      </Button>
    </div>
  );
});
export default Menu;
