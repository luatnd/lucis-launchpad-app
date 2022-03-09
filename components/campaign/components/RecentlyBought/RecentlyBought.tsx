import React from "react";
import s from "./RecentlyBought.module.sass";
import { Table, Tag, Space } from "antd";

const RecentlyBought = () => {
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (src: string) => <img src={src} alt="img" className={s.image} />,
    },
    {
      title: "Box name",
      dataIndex: "boxname",
      key: "boxname",
      render: (name: string) => {
        return (
          <div className={s.boxName}>
            <p>{name}</p>
            <div className="flex items-center">
              <img src="/assets/Recently/image126.png" alt="image" />
              <span>Oasis Emerald</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => {
        return (
          <div className={s.amount}>
            <p>{amount}</p>
            <div className="flex items-center">
              <span>2022-02-09 18:00:05</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost: number) => {
        return <p>{cost} BUSD</p>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        return (
          <div className={s.status}>
            <p className={s.icon}></p>
            <span>{status}</span>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      boxname: "Common Box",
      amount: 1,
      cost: 999.799,
      item: "/assets/Box/image107.png",
      status: "0x7791f0...94af0",
    },
    {
      key: "2",
      boxname: "Legendary Box",
      cost: 999.799,
      amount: 1,
      status: "0x7791f0...94af0",
      item: "/assets/Box/image107.png",
    },
    {
      key: "3",
      boxname: "Common Box",
      cost: 999.799,
      amount: 1,
      item: "/assets/Box/image107.png",
      status: "0x7791f0...94af0",
    },
  ];
  return (
    <div className="lucis-container mt-[116px] mb-[200px]">
      <h2 className="flex justify-center text-white text-center text-48px font-bold">
        RECENTLY BOUGHT
      </h2>
      <Table
        className={`mt-[37px] ${s.table}`}
        columns={columns}
        dataSource={data}
        scroll={{ y: 300 }}
      />
    </div>
  );
};

export default RecentlyBought;
