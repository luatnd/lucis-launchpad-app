import { Table } from "antd";
import moment from "moment";
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
  // console.log(data.boxCampaignBuyHistories);

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
        return <p className="descText">1</p>;
      },
    },
    {
      title: "Amount",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item: any) => {
        return (
          <>
            <p className="descText">{item.quantity}</p>
            <p className="descSubText">{moment(item.created_at).format("YYYY MM DD hh:mm:ss")}</p>
          </>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "box",
      key: "box",
      render: (item: any) => {
        return <p className="descText">1</p>;
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

  return (
    <div style={{ position: "relative" }}>
      <div
        // className={s.layoutContainer}
        style={{
          borderRadius: "25px",
          position: "absolute",
          inset: 0,
          background: `linear-gradient(126.08deg, rgba(255, 255, 255, 0.3) 13.84%, rgba(255, 255, 255, 0.1) 74.14%) `,
        }}
      ></div>
      <Table
        columns={columns}
        dataSource={data.boxCampaignBuyHistories}
        pagination={false}
        // className={s.tableContainer}
      />
    </div>
  );
};

export default HistoryTable;
