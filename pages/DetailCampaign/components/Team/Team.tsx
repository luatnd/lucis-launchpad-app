import React from 'react';
import {Avatar, Col, Row} from "antd";

const Team = () => {

    const listTeam = [
        {
            name: 'Khanh Nguyen',
            avatar: '/assets/Team/image115.png',
            position: 'CEO/Founder - Head of game design',
            description: 'CEO Wolffun Game Former CEO Bikasulution'
        },
        {
            name: 'Tri Pham',
            avatar: '/assets/Team/image116.png',
            position: 'Blockchain advisor',
            description: 'CEO Wolffun Game Former CEO Bikasulution'
        },
        {
            name: 'Viet Tran',
            avatar: '/assets/Team/image117.png',
            position: 'Sulution Architect Advisor',
            description: 'CEO Wolffun Game Former CEO Bikasulution'
        },
        {
            name: 'Khanh Nguyen',
            avatar: '/assets/Team/image118.png',
            position: 'Blockchain advisor',
            description: 'CEO Wolffun Game Former CEO Bikasulution'
        },
    ]
    return (
        <div className='mt-[168px]'>
            <h2 className='flex justify-center text-white text-center text-48px font-bold'>TEAM</h2>
            <Row gutter={[24, 16]} className='mt-10 justify-center'>
                {listTeam.map((e, index) => (
                    <Col xl={6} lg={8} md={12} key={index}>
                        <div className='flex justify-center'>
                            <Avatar size={240} src={e.avatar}/>
                        </div>
                        <div className='flex flex-col mt-[37px]'>
                            <span className='uppercase text-center text-white font-bold text-36px'>{e.name}</span>
                            <span className='text-center font-bold text-16px text-[#0BEBD6]'>{e.position}</span>
                            <span className='m-auto w-[70%] text-center text-white text-base text-18px'>{e.description}</span>
                        </div>

                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Team;
