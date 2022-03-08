import { Table } from "antd";
import moment from "moment";
import s from "./History.module.sass";
import { trim_middle } from "utils/String";

type Props = {
  data: any;
  title: string;
};

const HistoryTable = (props: Props) => {
  const { data, title } = props;
  // console.log(data);

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
        return (
          <>
            <p className="descText">
              {item.box_price.boxType?.name ? item.box_price.boxType.name : "Common box"}
            </p>
            <p className="descSubText">
              <img src={item.box_price.chain_icon} />
              <span>{item.box_price.chain_name}</span>
            </p>
            <p className="descSubText pt-3" style={{ whiteSpace: "nowrap" }}>
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
      // @ts-ignore
      render: (_, item: any) => {
        const statusClass =
          item.status === "PENDING"
            ? s.pending
            : item.status === "CONFIRMING"
            ? s.confirming
            : item.status === "FAILED"
            ? s.failed
            : item.status === "PROCESSING"
            ? s.processing
            : item.status === "SUCCEED"
            ? s.succeed
            : "";

        return (
          <>
            <div className={`${statusClass} ${s.status}`}></div>
            {item.box_price.chain_symbol === "BSC" && (
              <a href={`https://testnet.bscscan.com/tx/${item.tx_hash}`}>
                {item?.tx_hash ? trim_middle(item.tx_hash, 4, 3) : ""}
              </a>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      {data.length > 0 ? (
        <div className={s.history}>
          <h1 className="text-center">{title.toUpperCase()}</h1>

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
              dataSource={data}
              pagination={false}
              footer={() => <></>}
              scroll={{ y: 1000 }}
              rowKey="id"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HistoryTable;
