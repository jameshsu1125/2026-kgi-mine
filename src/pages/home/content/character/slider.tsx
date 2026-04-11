import { ResponseType } from '@/hooks/useQuestion';
import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import './slider.less';
import Article from '@/components/article';

const Carousel = memo(({ data }: { data?: ResponseType['result']['minerList'] }) => {
  return (
    <Article className='w-full px-20 lg:max-w-5xl xl:max-w-7xl'>
      <div className='slider-container'>
        <Swiper
          loop
          spaceBetween={0}
          slidesPerView={5}
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
    </Article>
  );
});
export default Carousel;
