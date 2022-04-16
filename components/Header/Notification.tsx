import { Badge, Popover } from "antd";
import AuthStore from "../Auth/AuthStore";
import InfiniteList from "./InfiniteNoti";
import { observer } from "mobx-react";
import useNotification from "hooks/useNotification";
import { useCallback, useEffect, useMemo, useState } from "react";
import s from "./Header.module.sass";
import { useWindowSize } from "hooks/useWindowSize";

const Notification = () => {
  const [width] = useWindowSize();
  const { token, id } = AuthStore;

  const {
    notificationSubscription,
    countUnreadNotifications,
    getNotificationData,
    getNotification,
  } = useNotification({ user_id: Number(id) });

  const [isSeen, setIsSeen] = useState(false);

  const notificationList = {
    notificationData: getNotificationData,
    notificationSubscription,
    getNotification,
  };

  const handleClick = () => {
    getNotification().catch((err) => console.log(err));
    setIsSeen(true);
  };

  return (
    <>
      <Popover
        placement="bottom"
        content={<InfiniteList {...notificationList} />}
        // trigger={width < 1024 ? "click" : "hover"}
        trigger="click"
      >
        <Badge count={isSeen ? 0 : countUnreadNotifications} size="small">
          <img
            className={s.notificationIcon}
            src="/assets/notification-icon.svg"
            alt=""
            onClick={handleClick}
          />
        </Badge>
      </Popover>
    </>
  );
};

export default observer(Notification);
