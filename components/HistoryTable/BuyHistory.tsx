import HistoryTable from "./HistoryTable";
import HistoryStore from "./HistoryStore";
import { useQueryBoxHistories } from "hooks/profile/useQueryBoxHistories";
import { observer } from "mobx-react-lite";
import AuthStore from "../Auth/AuthStore";
import HistoryService from "./HistoryService";

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

  // const historyService = new HistoryService();
  // const r = historyService.getData();
  // r.then((res) => {
  //   console.log(res);
  // });

  return <HistoryTable {...tableProps} />;
};

export default observer(BuyHistory);
