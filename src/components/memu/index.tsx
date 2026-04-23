import { memo, useContext, useEffect, useState } from 'react';
import Article from '../article';
import './index.less';
import Contain from '../contain';
import Button from '../button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const Menu = memo(() => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const [muteActive, setMuteActive] = useState(false);

  useEffect(() => {
    if (muteActive) {
      sounds?.track?.mute();
    } else {
      sounds?.track?.unmute();
    }
  }, [muteActive]);

  return (
    <div className='Menu'>
      <Article className='flex max-w-7xl flex-row items-center justify-end'>
        <Contain>
          <div className='pointer-events-auto flex flex-row items-center justify-center gap-1 p-5'>
            <Button>
              <Button.Menu type='share' />
            </Button>
            <Button
              onClick={() => {
                setMuteActive((S) => !S);
              }}
            >
              <Button.Menu type='mute' menu={muteActive} />
            </Button>
          </div>
        </Contain>
      </Article>
    </div>
  );
});
export default Menu;
