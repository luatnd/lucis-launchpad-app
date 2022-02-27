import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import s from './CountDown.module.sass'

const CountDown = () => {
  const [totalTime, setTotalTime] = useState(20000)
  const [timer, setTimer] = useState<{[name: string]: number}> ({ days: 0, hours: 0, minute: 0, second: 0 })

  const setTimeLeft = () => {
    setTimer((item) => ({
      ...item,
      days: Math.floor(totalTime / (60 * 60 * 24)),
      hours: Math.floor((totalTime / (60 * 60)) % 24),
      minute: Math.floor((totalTime / (60)) % 60),
      second: Math.floor((totalTime % 60))
    }))
  }
  
  useEffect(() => {
    setTimeLeft()
  }, [])

  useEffect(()=> {
    let interval: NodeJS.Timer;
    console.log(totalTime);
    
    interval = setInterval(()=> {
      if(totalTime < 0) {
        clearInterval(interval)
      } else {
        countTime()
      }
    }, 1000)
    return () => clearInterval(interval)
  },[totalTime])

  const countTime = () => {
    if(totalTime > 0 && (timer.days !== 0 || timer.hours !== 0 || timer.minute !== 0 || timer.second !==0 )) {
      setTimer((item) => ({...item, second: item.second - 1}))
      if( timer.minute >= 0 && timer.second - 1 < 0) {
        setTimer((item) => ({...item, second: 59}))
        setTimer((item) => ({...item, minute: item.minute - 1}));
        if(timer.hours >= 0 && timer.minute - 1 < 0) {
          setTimer((item) => ({...item, minute: 59}));
          setTimer((item) => ({...item, hours: item.hours - 1}));
          if(timer.days >= 0 && timer.hours - 1 < 0) {
            setTimer((item) => ({...item, hours: 23}));
            if ( timer.days - 1 > 0) {
              setTimer((item) => ({...item, days: item.days - 1}));
            }
          }
        }
      }
    }
    setTotalTime((totalTime) => totalTime - 1)
  }

  return (
    <div className='lucis-container'>
      <div className='text-white text-center text-36px font-bold'>End to apply for the Whitelist in</div>
      <div className='flex text-white gap-10 justify-center mt-8'>
        {Object.keys(timer).map((item, key) => {
          return (
            <div className='flex' key={key}>
              <div className={s.timeElement}>
              <div className={s.helperBar}></div>
                <div className={s.helperLeft}></div>
                <div className={s.helperRight}></div>
                <div className='top'>{timer[item] < 10 ? `0${timer[item]}` : `${timer[item]}`}</div>
                <div className={s.topBack}>{timer[item] < 10 ? `0${timer[item]}` : `${timer[item]}`}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CountDown