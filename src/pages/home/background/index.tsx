import useURI from '@/hooks/useURI';
import { memo } from 'react';
import './index.less';

const Background = memo(() => {
  useURI({ path: 'img/pattern-icon-career.png', name: 'pattern-icon-career' });
  useURI({ path: 'img/pattern-icon-finance.png', name: 'pattern-icon-finance' });
  useURI({ path: 'img/pattern-icon-health.png', name: 'pattern-icon-health' });
  useURI({ path: 'img/pattern-icon-relations.png', name: 'pattern-icon-relations' });
  useURI({ path: 'img/pattern-icon-society.png', name: 'pattern-icon-society' });
  return (
    <div className='background'>
      <div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
});
export default Background;
