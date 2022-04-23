import { useQueryBoxHistories } from "hooks/profile/useQueryBoxHistories";
import { observer } from "mobx-react-lite";
import s from "./History.module.sass";
import { Table, Tooltip } from "antd";
import moment from "moment";
import { trim_middle } from "utils/String";
import { useEffect } from "react";

type Props = {
  id?: string;
  title: string;
  token: string | undefined;
};

const BuyHistory = ({ id, title, token }: Props) => {
  // const tableProps = {
  //   id: id,
  //   title: title,
  // };

  const { data, refetch } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });

  const dataHistory = id
    ? data?.boxCampaignBuyHistories.filter(
        (box: any) => box.box_campaign_uid === id
      )
    : data?.boxCampaignBuyHistories;

  // console.log(token);
  useEffect(() => {
    refetch();
    console.log(data);
  }, [token]);

  const columns = [
    {
      title: "Item",
      dataIndex: "box",
      key: "box",
      // @ts-ignore
      render: (_, item: GBoxCampaignBuyHistory) => {
        return <img src={item.box_price?.boxType?.thumb_img ?? ""} alt="" />;
      },
      width: "15%",
    },
    {
      title: "Box name",
      dataIndex: "box",
      key: "box",
      // @ts-ignore
      render: (_, item: GBoxCampaignBuyHistory) => {
        // console.log(item.box.game.logo);

        return (
          <>
            <p className="descText">
              {item.box_price?.boxType?.name
                ? item.box_price?.boxType.name
                : "Common box"}
            </p>
            <p className="descSubText">
              <img
                className={s.chainIcon}
                src={item.box_price?.chain_icon ?? ""}
                alt=""
              />
              {item.box_price?.chain_symbol}
            </p>
            <p className="descGameText pt-3" style={{ whiteSpace: "nowrap" }}>
              <img
                className={s.logoGame}
                src={item.box?.game.logo ?? ""}
                alt=""
              />
              {item.box.game.name} |{" "}
              {item.box.name ? item.box.name : "Box campaign name"}
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
      render: (_, item: GBoxCampaignBuyHistory) => {
        return (
          <>
            <p className="descText">{item.quantity}</p>
            <p className="descSubText" style={{ whiteSpace: "nowrap" }}>
              {moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
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
      render: (_, item: GBoxCampaignBuyHistory) => {
        return (
          <>
            <p className="descText">
              {`${
                item.quantity &&
                item.box_price &&
                item.quantity * item.box_price.price
              } ${
                item.box_price && item.box_price?.currency_name?.toUpperCase()
              }`}
            </p>

            <a
              className="hidden md:block"
              target="_blank"
              href={
                item.box_price?.chain_symbol === "BSC"
                  ? `https://testnet.bscscan.com/tx/${item.tx_hash}`
                  : `https://rinkeby.etherscan.io/tx/${item.tx_hash}`
              }
              style={{ whiteSpace: "nowrap" }}
              rel="noopener noreferrer"
            >
              {item?.tx_hash ? trim_middle(item.tx_hash, 6, 6) : ""}
            </a>
          </>
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
            <Tooltip placement="topRight" title={item.status}>
              <div className={`${statusClass} ${s.status}`}></div>
            </Tooltip>
            {item?.tx_hash && item.box_price.chain_symbol === "BSC" && (
              <a
                className="block md:hidden"
                href={`https://testnet.bscscan.com/tx/${item.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  style={{ width: "15px", margin: "5px 0 0 0" }}
                  src={"/assets/MyProfile/link.svg"}
                  alt=""
                />
              </a>
            )}
          </>
        );
      },
    },
  ];

  // return <HistoryTable {...tableProps} />;
  return (
    <>
      {dataHistory && dataHistory.length > 0 ? (
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
              dataSource={[...dataHistory].reverse()}
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

export default observer(BuyHistory);
