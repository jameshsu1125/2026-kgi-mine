import { ResponseType } from '@/hooks/useQuestion';
import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import './slider.less';

const Carousel = memo(({ data }: { data?: ResponseType['result']['minerList'] }) => {
  return (
    <div className='slider-container'>
      <Swiper
        className=''
        spaceBetween={0}
        slidesPerView={3}
        loop
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.minerId}>
            <div className='character' style={{ backgroundImage: `var(--${item.name})` }}></div>
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </div>
  );
});
export default Carousel;
