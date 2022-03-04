import s from "./history.module.sass";
import HistoryTable from "./HistoryTable";

const History = () => {
  return (
    <div className={s.history}>
      <h1 className="text-center">HISTORY</h1>
      <HistoryTable />
    </div>
  );
};

export default History;
