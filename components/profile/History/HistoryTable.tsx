import { Table } from "antd";
import moment from "moment";
import { useQueryBoxs, useQueryBoxHistories } from "hooks/home/useQueryBoxs";
import s from "./history.module.sass";

const { Column, ColumnGroup } = Table;

const HistoryTable = () => {
  const { data, loading, error } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });
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
      width: "10%",
    },
    {
      title: "Box name",
      dataIndex: "box",
      key: "box",
      render: (_, item: any) => {
        console.log(item);

        return (
          <>
            <p className="descText">{item.box.name ? item.box.name : "Common box"}</p>
            <p className="descSubText">{item.box_price.chain_symbol.toUpperCase()}</p>
            <p className="descSubText" style={{ whiteSpace: "nowrap" }}>
              {item.box.game.name}
            </p>
          </>
        );
      },
      width: "20%",
    },
    {
      title: <p style={{ textAlign: "left" }}>Amount</p>,
      dataIndex: "quantity",
      key: "quantity",
      // colSpan: 2,
      // @ts-ignore
      render: (_, item, index) => {
        console.log(item.box.game.name);
        return (
          <>
            <p className="descText">{item.quantity}</p>
            <p className="descSubText" style={{ whiteSpace: "nowrap" }}>
              {moment(item.created_at).format("YYYY-MM-DD hh:mm:ss")}
            </p>
          </>
        );
      },
      width: "20%",
      // onCell: () => ({ colSpan: 2 }),
    },
    {
      title: "Cost",
      dataIndex: "box",
      key: "box",
      render: (_, item: any) => {
        console.log(item);

        return (
          <p className="descText">{`${
            item.quantity * item.box_price.price
          } ${item.box_price.currency_name.toUpperCase()}`}</p>
        );
      },
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (item: any) => {
        if (item) {
          if (item === "pending") {
            return <div className={`${s.pending} ${s.status}`}></div>;
          } else if (item === "confirming") {
            return <div className={`${s.confirming} ${s.status}`}></div>;
          } else {
            return <div className={`${s.confirmed} ${s.status}`}></div>;
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
          borderRadius: "10px",
          position: "absolute",
          inset: 0,
          background: `linear-gradient(126.08deg, rgba(255, 255, 255, 0.3) 13.84%, rgba(255, 255, 255, 0.1) 74.14%) `,
        }}
      ></div>
      <Table
        columns={columns}
        dataSource={data.boxCampaignBuyHistories}
        pagination={false}
        footer={() => <></>}
        scroll={{ y: 1000 }}
        rowKey="id"
        // className={s.tableContainer}
      />
    </div>
  );
};

export default HistoryTable;
