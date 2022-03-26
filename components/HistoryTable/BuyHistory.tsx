import HistoryTable from "./HistoryTable";

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
