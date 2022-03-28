import HistoryTable from "./HistoryTable";
import HistoryStore from "./HistoryStore";
import { useQueryBoxHistories } from "hooks/profile/useQueryBoxHistories";

type Props = {
  id?: string;
  title: string;
};

const BuyHistory = ({ id, title }: Props) => {
  const tableProps = {
    id: id,
    title: title,
  };

  const { data } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });

  HistoryStore.addToHistoryList(data);

  return <HistoryTable {...tableProps} />;
};

export default BuyHistory;
