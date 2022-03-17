import HistoryTable from "./HistoryTable";
import { useQueryBoxHistories } from "../../components/Profile/Hooks/useQueryBoxHistories";

type Props = {
  id: string;
  title: string;
};

const BuyHistory = ({ id, title }: Props) => {
  // const { data, loading, error } = useQueryBoxHistories({
  //   include: { boxTypes: true, game: true },
  // });

  const tableProps = {
    // data: id
    //   ? data?.boxCampaignBuyHistories.filter((box: any) => box.box_campaign_uid === id)
    //   : data?.boxCampaignBuyHistories,
    id: id,
    title: title,
  };

  // if (id) {
  //   tableProps = {
  //     ...tableProps,
  //     data: data?.boxCampaignBuyHistories.filter((box: any) => box.box_campaign_uid === id),
  //   };
  // }

  return <HistoryTable {...tableProps} />;
};

export default BuyHistory;
