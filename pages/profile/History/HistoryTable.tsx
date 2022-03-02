import { Table } from "antd";
import moment from "antd/node_modules/moment";
import { useQueryBoxs, useQueryBoxHistories } from "hooks/home/useQueryBoxs";
import s from "./history.module.sass";

const HistoryTable = () => {
  const { data, loading, error } = useQueryBoxHistories({ boxTypes: true });
  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    console.log(error);

    return <>Error ...</>;
  }
  console.log(data.boxCampaignBuyHistories);

  const columns = [
    {
      title: "Item",
      dataIndex: "box",
      key: "box",
      render: (item: any) => {
        return <img src={item.cover_img} />;
      },
    },
    {
      title: "Box name",
      dataIndex: "box",
      key: "box",
      render: (item: any) => {
        return <>1</>;
      },
    },
    {
      title: "Amount",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item: any) => {
        return (
          <>
            <p>
              <strong>{item.quantity}</strong>
            </p>
            <p>{moment(item.created_at).format("YYYY MM DD hh:mm:ss")}</p>
          </>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "box",
      key: "box",
      render: (item: any) => {
        return <>1</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: any) => {
        if (item) {
          if (item === "pending") {
            return <div className={s.statusPending}></div>;
          } else if (item === "confirming") {
            return <div className={s.statusConfirming}></div>;
          } else {
            return <div className={s.confirmed}></div>;
          }
        }
        return <>Waiting</>;
      },
    },
  ];

  return <Table columns={columns} dataSource={data.boxCampaignBuyHistories} pagination={false} />;
};

export default HistoryTable;
