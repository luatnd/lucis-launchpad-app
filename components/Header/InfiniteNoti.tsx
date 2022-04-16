import { List } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Notification } from "src/generated/graphql";
import s from "./Header.module.sass";

type Props = {
  notificationData: Notification[];
  getNotification: any;
  notificationSubscription: any;
};

const InfiniteList = ({
  notificationData,
  getNotification,
  notificationSubscription,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Notification[]>([]);

  useEffect(() => {
    notificationData ? setData([...notificationData].reverse()) : setData([]);
  }, [notificationData]);

  return (
    <div className={s.infinite}>
      <div className={s.infiniteContainer} id="list">
        <List
          dataSource={data}
          renderItem={(item: Notification, idx: number) => {
            return (
              <List.Item key={item.id}>
                <div className={s.notificationItem}>
                  <img
                    // className="w-[30px] h-[30px]"
                    src={item.box.cover_img ?? ""}
                    alt=""
                  />
                  <div>
                    <p className="font-[600] m-0">{item.notification}</p>
                    <p>{item.box.desc}</p>
                  </div>
                  <p className={s.notificationTime}>
                    {moment(item.created_at).fromNow()}
                  </p>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default InfiniteList;
