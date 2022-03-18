import HistoryTable from "./HistoryTable";
import { useQueryBoxHistories } from "../../components/Profile/Hooks/useQueryBoxHistories";

type Props = {
  id?: string;
  title: string;
};

const BuyHistory = ({ id, title }: Props) => {
  const tableProps = {
    id: id,
    title: title,
  };

  return <HistoryTable {...tableProps} />;
};

export default BuyHistory;
