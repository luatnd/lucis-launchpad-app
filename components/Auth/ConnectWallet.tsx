import {useCallback, useEffect, useState} from "react";

import GradientButton from '../Button/GradientButton';


type Props = {
  small?: boolean,
};
export default function Header(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <GradientButton
      onClick={showModal} type={1}
      small={!!props.small}
      className={`text-white text-24px leading-28px px-16px py-15px ${props.small ? '' : 'ml-15px'}`}
      style={{whiteSpace: 'nowrap', fontWeight: '600'}}
    >
      Connect wallet
    </GradientButton>
  );
}
