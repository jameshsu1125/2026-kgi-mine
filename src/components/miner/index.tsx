import './index.less';

import { forwardRef, useImperativeHandle } from 'react';

const Miner = forwardRef((_, ref) => {
  useImperativeHandle(ref, () => ({
    foo() {
      return 'value';
    },
  }));
  return (
    <div className='Miner'>
      <div className='sprite sprite-MINER-WALK_00000' />
    </div>
  );
});
export default Miner;
