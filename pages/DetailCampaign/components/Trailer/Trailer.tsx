import React from 'react';

const Trailer = () => {
    return (
        <div>
            <h2 className='flex justify-center text-white text-center text-48px font-bold'>TRAILER</h2>
            <div className='w-[80%] m-auto'>
                <iframe src="https://www.youtube.com/watch?v=Yw9Ra2UiVLw" width="420" height="345" ></iframe>
                <div className='flex justify-between mt-20'>
                    <a href="https://www.tiktok.com/@lucistvv" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/tiktok.svg" alt="" />
                    </a>
                    <a href="https://www.facebook.com/lucistv.news" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/fb.svg" alt="" />
                    </a>
                    <a href="https://www.youtube.com/c/LucisTVGaming" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/ytb.svg" alt="" />
                    </a>
                    <a href="https://t.me/sankeonft" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/tele.svg" alt="" />
                    </a>
                    <a href="https://twitter.com/Lucis_TV" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/tw.svg" alt="" />
                    </a>
                    <a href="https://discord.com/channels/911921072830574603/926398655093702666" target='_blank' rel="noopener noreferrer">
                        <img src="/assets/footer/dis.svg" alt="" />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Trailer;
