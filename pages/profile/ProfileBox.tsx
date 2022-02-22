import s from './index.module.sass'
import Modal from 'antd/lib/modal/Modal'
import { useState } from 'react'


const userProfile = {
    fullName: "Nguyen Thi Kieu Oanh",
    id: "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
    balance: 135,
    affilateId: "01234567989svfdv",
    phone: "0912345678",
    email: "anhcbt@lucis.network",
    facebook: "Lucis network",
    twitter: "Lucis network",
    discord: "Lucis channel",
    tele: "Lucis9999",
    verify: false
  }


const Box = () => {
    const [openVerifyModal, setOpenVerifyModal] = useState(false)

    const handleOpenVerifyModal = () => {
        setOpenVerifyModal(true)
        console.log(":Hello");
        
    }

    const handleCloseVerifyModal = () => {
        setOpenVerifyModal(false)
    }
    return (
        <>
        <div className={s.box}> 
            <div className={s.wrapper}>
                <div className={s.contact}>
                    <div className={s.title}>
                        <img src="/assets/MyProfile/phone.svg" alt="" />
                        <span>Phone</span>
                    </div>
                    <p>{userProfile.phone}</p>
                </div>

                <div className={s.contact}>
                    <div className={s.title}>
                        <img src="/assets/MyProfile/mail.svg" alt="" />
                        <span>Email</span>
                    </div>
                    <p>
                        {userProfile.email} 
                        {!userProfile.verify && <button className={`${s.verifyBtn} bg-gradient-1`} onClick={handleOpenVerifyModal}>Verify</button>} 
                    </p>
                </div>

                <div className={s.contact}>
                    <div className={s.title}>
                        <img src="/assets/MyProfile/social.svg" alt="" />
                        <span>Social</span>
                    </div>
                    <div className={s.social}>
                        <a href="#"><img src="/assets/MyProfile/fb.svg" alt="" />{userProfile.facebook}</a>
                        <a href="#"><img src="/assets/MyProfile/tw.svg" alt="" />{userProfile.twitter}</a>
                        <a href="#"><img src="/assets/MyProfile/dis.svg" alt="" />{userProfile.discord}</a>
                        <a href="#"><img src="/assets/MyProfile/tele.svg" alt="" />{userProfile.tele}</a>
                    </div>
                </div>
            </div>
        </div>
        </>
       
    )
}

export default Box