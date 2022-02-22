import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import s from './index.module.sass';

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

const Info = ()=> {

    return (
        <div className={s.info}>
            <div className={s.avatar}>
                <img src="/assets/MyProfile/defaultAvatar.png" alt="" />
            </div>

            <div>
                <div className={s.fullName}>
                    <h1>{userProfile.fullName}</h1>
                    <p>{userProfile.id}</p>
                </div>
                <p className={s.balance}>Balance: {userProfile.balance} BNB</p>
                <div className={s.affilate}>
                    <p>Affilate ID: {userProfile.affilateId}</p>  
                    <button>
                        <img src="/assets/MyProfile/copy.svg" alt="" />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Info