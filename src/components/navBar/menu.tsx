import { memo } from 'react';
import Button from '../button';
import './menu.less';

const Menu = memo(() => (
  <div className='menu'>
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
));
export default Menu;
