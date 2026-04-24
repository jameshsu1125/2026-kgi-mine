import useURI from '@/hooks/useURI';
import { memo } from 'react';

const Moon = memo(() => {
  useURI({ path: 'scene-moonlitSnowfield-moon.png', name: 'scene-moonlitSnowfield-moon' });
  return <div className='moon' />;
});
export default Moon;
