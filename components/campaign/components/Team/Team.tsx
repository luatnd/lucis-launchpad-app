import React, { useEffect, useRef, useState } from "react";
import { Avatar, Col, Row } from "antd";
import s from "../../../../pages/campaign/detail.module.sass";
interface ITeam {
  game: any;
}

const Team = (props: ITeam) => {
  const { game } = props;
  const iframeEle = useRef(null);
  const [height, setHeight] = useState("0px");

  const onLoad = () => {
    //   console.log(iframeEle.current.contentWindow.document.body.scrollHeight + "px");
    //   if (iframeEle) {
    //     setHeight(iframeEle.current.contentWindow.document.body.scrollHeight + "px");
    //   }
    // setTimeout(() => {
    //   console.log(iframeEle.current.contentWindow.document.body.scrollHeight);
    // }, 5000);
  };

  //   useEffect(() => {
  //     const frame = document.getElementById("myFrame");

  //     setTimeout(() => {
  //       console.log("height", frame.contentWindow.document.body.scrollHeight + "px");
  //     }, 100);
  //   }, []);

  return (
    <div>
      {game.desc_team && game?.desc_team.substring(0, 8) !== "https://" ? (
        <iframe
          ref={iframeEle}
          onLoad={onLoad}
          id="myFrame"
          srcDoc={game?.desc_team}
          width="100%"
          height="200px"
        ></iframe>
      ) : (
        <iframe
          id="myFrame"
          ref={iframeEle}
          src={game?.desc_team}
          width="100%"
          height="1500px"
        ></iframe>
      )}
      {/*<Row gutter={[24, 16]} className='mt-10 justify-center'>*/}
      {/*    {listTeam.map((e, index) => (*/}
      {/*        <Col xl={6} lg={8} md={12} key={index}>*/}
      {/*            <div className='flex justify-center'>*/}
      {/*                <Avatar size={240} src={e.avatar}/>*/}
      {/*            </div>*/}
      {/*            <div className='flex flex-col mt-[37px]'>*/}
      {/*                <span className='uppercase text-center text-white font-bold text-36px'>{e.name}</span>*/}
      {/*                <span className='text-center font-bold text-16px text-[#0BEBD6]'>{e.position}</span>*/}
      {/*                <span className='m-auto w-[70%] text-center text-white text-base text-18px'>{e.description}</span>*/}
      {/*            </div>*/}

      {/*        </Col>*/}
      {/*    ))}*/}
      {/*</Row>*/}
    </div>
  );
};

export default Team;
