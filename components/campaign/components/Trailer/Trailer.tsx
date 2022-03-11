import React from "react";
import s from "../../../../pages/campaign/detail.module.sass";

interface ITrailer {
  game: any
}

const Trailer = (props: ITrailer) => {
  const {game} = props
  return (
    <div className='lucis-container'>
      <h2 className='flex justify-center text-white text-center text-48px font-bold py-6 uppercase'>{game?.name}</h2>
      {game.desc && game?.desc.substring(0, 8) !== "https://" ?
        (<iframe srcDoc={game?.desc} width='100%'></iframe>) :
        (<iframe src={game?.desc} width='100%'></iframe>)
      }
      {/*<div*/}
      {/*    dangerouslySetInnerHTML={{__html: game?.desc}}*/}
      {/*    className={`${s.textSize} text-white mt-10 text-justify indent-8`}*/}
      {/*></div>*/}
      {/*<div className='w-[80%] m-auto'>*/}
      {/*  {game.trailer_video && <iframe src={game?.trailer_video} width='100%' height='556px'></iframe>}*/}
      {/*  <div className='flex justify-between mt-20'>*/}
      {/*    {game.tiktok &&*/}
      {/*      <a href={game.tiktok} target='_blank' rel='noopener noreferrer'>*/}
      {/*        <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/tiktok.svg' alt=''/>*/}
      {/*      </a>}*/}
      {/*    {game.facebook &&*/}
      {/*      <a href={game.facebook} target='_blank' rel='noopener noreferrer'>*/}
      {/*        <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/fb.svg' alt=''/>*/}
      {/*      </a>}*/}
      {/*    {game.youtube &&*/}
      {/*      <a href={game.youtube} target='_blank' rel='noopener noreferrer'>*/}
      {/*        <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/ytb.svg' alt=''/>*/}
      {/*      </a>}*/}
      {/*    {game.telegram &&*/}
      {/*      <a href={game.telegram} target='_blank' rel='noopener noreferrer'>*/}
      {/*        <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/tele.svg' alt=''/>*/}
      {/*      </a>}*/}
      {/*    {game.twitter &&*/}
      {/*      <a href={game.twitter} target='_blank' rel='noopener noreferrer'>*/}
      {/*        <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/tw.svg' alt=''/>*/}
      {/*      </a>}*/}
      {/*    {game.discord &&*/}
      {/*    <a*/}
      {/*        href={game.discord}*/}
      {/*        target='_blank'*/}
      {/*        rel='noopener noreferrer'*/}
      {/*    >*/}
      {/*      <img className='sm:w-[50px] lg:w-[100%] w-[30px]' src='/assets/footer/dis.svg' alt=''/>*/}
      {/*    </a>}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Trailer;
