import React, { Component } from "react";
import Slider from "react-slick";
import ItemSliderBanner from "components/Slider/SilderBanner"

const listBanner = [
  {
    setStatusGame: 'Upcoming',
    setTimeGame: '2d 05h 30m 25s',
    setLogoGame: '/assets/Banner/LogoTheTan.png',
    setTextGame: 'Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills',
    setSrcMore: 'https://lucis-lp.koolab.io/',
    setSrcApply: 'https://lucis-lp.koolab.io/',  
  },
  {
    setStatusGame: 'Upcoming',
    setTimeGame: '2d 05h 30m 25s',
    setLogoGame: '/assets/Banner/LogoTheTan.png',
    setTextGame: 'Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills',
    setSrcMore: 'https://lucis-lp.koolab.io/',
    setSrcApply: 'https://lucis-lp.koolab.io/',  
  },
  {
    setStatusGame: 'Upcoming',
    setTimeGame: '2d 05h 30m 25s',
    setLogoGame: '/assets/Banner/LogoTheTan.png',
    setTextGame: 'Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills',
    setSrcMore: 'https://lucis-lp.koolab.io/',
    setSrcApply: 'https://lucis-lp.koolab.io/',  
  }
]

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          {
            listBanner.map((e,i) => (
              <ItemSliderBanner key="i" setStatusGame={e.setStatusGame} setTimeGame={e.setTimeGame} setLogoGame={e.setLogoGame}  setTextGame={e.setTextGame} setSrcMore={e.setSrcMore} setSrcApply={e.setSrcApply} />
            ))
          }
        </Slider>
      </div>
    );
  }
}