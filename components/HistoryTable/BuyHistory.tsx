import HistoryTable from "./HistoryTable";
import { useQueryBoxHistories } from "../../components/Profile/Hooks/useQueryBoxHistories";

type Props = {
  id?: string;
  title: string;
};

const BuyHistory = ({ id, title }: Props) => {
  const { data, loading, error } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });

  // console.log(id);

  let tableProps = {
    data: data?.boxCampaignBuyHistories,
    title: title,
  };

  if (id) {
    tableProps = {
      ...tableProps,
      data: data?.boxCampaignBuyHistories.filter((box: any) => box.box_campaign_uid === id),
    };
  }

  return <HistoryTable {...tableProps} />;
};

export default BuyHistory;
