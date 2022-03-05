import s from "./history.module.sass";
import HistoryTable from "./HistoryTable";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

const History = (props: Props) => {
  const { profile } = props;

  return (
    <div className={s.history}>
      <h1 className="text-center">HISTORY</h1>
      <HistoryTable profile={profile} />
    </div>
  );
};

export default History;
