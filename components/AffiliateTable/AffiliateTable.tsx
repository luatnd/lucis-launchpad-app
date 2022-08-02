import { Button, Table } from "antd";
import { useQueryAffiliate } from "hooks/profile/useQueryAffiliate";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { UserGql } from "src/generated/graphql";
import { trim_middle } from "utils/String";
import s from "./AffiliateTable.module.sass";

type Props = {};

const AffiliateTable = (props: Props) => {
  const { dataAffiliate, loading, refetchDataAffiliate } = useQueryAffiliate();
  const [dataAffConvert, setDataAffConvert] = useState<any[]>([]);
  useEffect(() => {
    let data: any[] = [];
    if (dataAffiliate && dataAffiliate?.users) {
      dataAffiliate?.users.forEach((item: UserGql) => {
        item?.box_campaigns?.forEach((itemBoxCampaign) => {
          let checked = { ...item, box_campaigns: itemBoxCampaign, rowspan: item?.box_campaigns?.length};
          data.push(checked);
        });
      });
    }
    console.log("data", data);
    setDataAffConvert(data);
  }, [dataAffiliate]);
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: any, data: any, index: number) => {
        return <div className={s.prizeWrap}>{index + 1}</div>;
      },
    },
    {
      title: "Invited",
      dataIndex: "invited",
      key: "invited",
      render: (_: any, data: any) => {
        return (
          <div className={s.prizeWrap}>
            {trim_middle(data?.address ?? "", 7, 8)}
          </div>
        );
      },
    },
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
      render: (_: any, data: any) => {
        return <div className={s.prizeWrap}>{data?.box_campaigns?.name}</div>;
      },
    },
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (_: any, data: any, index: any) => {
    //     const obj = {
    //       children: (
    //         <>
    //           <div className={s.prizeWrap}>{data?.code}</div>
    //         </>
    //       ),
    //       props: {
    //         rowSpan: 1,
    //       },
    //     };
    //     if (data?.rowspan === 1) {
    //       obj.props.rowSpan = 2;
    //     } else if (index === 2) {
    //       obj.props.rowSpan = 0;
    //     }
    //     return obj;
    //   },
    // },
    {
      title: "Status",
      dataIndex: ["status"],
      key: "status",
      render: (_: any, data: any) => {
        return (
          <div className={s.prizeWrap}>
            {data?.box_campaigns?.affiliate_status}
          </div>
        );
      },
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      render: (_: any, data: any) => {
        return (
          <div className={s.prizeWrap}>
            {data?.box_campaigns?.paid[0]?.amount}{" "}
            {data?.box_campaigns?.paid[0]?.currency.toUpperCase()}
          </div>
        );
      },
    },
    {
      title: `Commission`,
      dataIndex: "commission",
      key: "commission",
      render: (_: any, data: any) => {
        return <div className={s.prizeWrap}>{data?.box_campaigns?.paid[0]?.commission}{" "}
        {data?.box_campaigns?.paid[0]?.currency.toUpperCase()}</div>;
      },
    },
    // {
    //   title: "Claim",
    //   dataIndex: ["claim"],
    //   key: "claim",
    //   render: (_: any, data: any) => {
    //     return (
    //       <div className={s.btnClaim}>
    //         <Button>Claim</Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className={s.wrapper}>
      <h1>Refer history</h1>
      <Table
        dataSource={dataAffConvert}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: `You haven't invited anyone yet`,
        }}
      />
    </div>
  );
};

export default observer(AffiliateTable);
