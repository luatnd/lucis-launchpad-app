import React, { createRef, useEffect, useRef } from 'react'
import Swiper from 'swiper';
import s from './SiteMap.module.sass';
const ListCard = [
  {
    title: 'Upcoming',
    time: '08:00, Feb 18',
    description: 'Stay tuned and prepare to APPLY WHITELIST.'
  },
  {
    title: 'Register whitelist',
    time: '08:00, Feb 18',
    description: 'Click the [APPLY WHITELIST] button to register for Register whitelist.'
  },
  {
    title: 'Whitelist phase',
    time: '08:00, Feb 18',
    description: 'Whitelist registrants will be given favorable dealings to buy Mystery Boxes in phase 1, on a FCFS basis.'
  },
  {
    title: 'Buy phase',
    time: '08:00, Feb 18',
    description: 'The Buy phase will be started right after whitelist phase ends. Remaining boxes left in whitelist phase will be transferred to Buy phase'
  },
  {
    title: 'Close',
    time: '08:00, Feb 18',
    description: 'Thank you.'
  }
];

const SiteMap = () => {
  const SwiperRef = useRef<Swiper>()
  useEffect(()=> {
    SwiperRef.current = new Swiper('.swiper-container', {
      slidesPerView: 4,
      navigation: {
        'prevEl': 'prev-slide',
        'nextEl': 'next-slide'
      }      
    })
    console.log(SwiperRef.current.activeIndex)
  },[])

  return (
    <div className='lucis-container'>
      {/* <button className="prev-slide">Prev</button> */}
      {/* <button className="next-slide">Next</button> */}
      <div className="swiper-container overflow-hidden">
      <div className="swiper-wrapper">
        {ListCard.map((item, key) => {
          return (
            <div className="swiper-slide" key={key}>
              <div className={`flex flex-col justify-center select-none`}>
                <div className='h-[150px] flex flex-col justify-end'>
                  <div className='text-white font-bold'>{item.title}</div>
                  <div className='text-white pb-2 mb-5'>{item.time}</div>
                </div>
                <div className={`${s.SiteMapLine} ${key === ListCard.length - 1 ? s.lastchild : ''}`}>
                  <div className={s.SiteMapLineCircle}></div>
                </div>
                <div className='text-white mt-6 mr-6'>{item.description}</div>
              </div>
            </div>
          )
        } )}
      </div>
      </div>
    </div>
  )
}

export default SiteMap