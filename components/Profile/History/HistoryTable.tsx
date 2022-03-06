import { Table } from "antd";
import moment from "moment";
import s from "./history.module.sass";
import { trim_middle } from "utils/String";
import { useQueryBoxHistories } from "../Hooks/useQueryBoxHistories";

const HistoryTable = (profile: any) => {
  const { data, loading, error } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });
  const address = profile.profile.me.address ?? "";
  console.log(profile.profile.me);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    console.log(error);

    return <>Error ...</>;
  }

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
      // @ts-ignore
      render: (_, item: any) => {
        // console.log(item);
        return (
          <>
            <p className="descText">
              {item.box_price.boxType?.name ? item.box_price.boxType.name : "Common box"}
            </p>
            <p className="descSubText">
              <img src={item.box_price.chain_icon} />
              {item.box_price.chain_symbol.toUpperCase()}
            </p>
            <p className="descSubText" style={{ whiteSpace: "nowrap" }}>
              {item.box.game.name} | {item.box.name ? item.box.name : "Box campaign name"}
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
      // @ts-ignore
      render: (_, item) => {
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
    },
    {
      title: "Cost",
      dataIndex: "box",
      key: "box",
      // @ts-ignore
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
        console.log(item);

        return (
          <>
            {item === "PENDING" ? (
              <>
                <div className={`${s.pending} ${s.status}`}></div>
                <p className={`${s.pendingText} descSubText`}>{trim_middle(address, 5, 3)}</p>
              </>
            ) : item === "CONFIRMING" ? (
              <>
                <div className={`${s.confirming} ${s.status}`}></div>
                <p className={`${s.confirmingText} descSubText`}>{trim_middle(address, 5, 3)}</p>
              </>
            ) : item === "SUCCEED" ? (
              <>
                <div className={`${s.succeed} ${s.status}`}></div>
                <p className={`${s.succeedText} descSubText`}>{trim_middle(address, 5, 3)}</p>
              </>
            ) : (
              ""
            )}
          </>
        );

        //   <div
        //   className={`${
        //     item === "PENDING"
        //       ? `${s.pending}`
        //       : item === "CONFIRMING"
        //       ? s.confirm
        //       : item === "SUCCEED"
        //       ? s.succeed
        //       : ""
        //   } ${s.status}`}
        // ></div>
      },
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div
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
      />
    </div>
  );
};

export default HistoryTable;
