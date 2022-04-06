import { AutoComplete, Input } from "antd";
import s from './InputSearch.module.sass'

const { Search } = Input;
type Props = {
  // onBlur?: () => void
  // onKeyPress: Function
}
const InputSearch = (props: Props) => {
  // const { onBlur, onKeyPress } = props

  // const handleEnter =(e: any) =>{
  //   onKeyPress(e.key)
  // }
  return (
    <div className={`${s.containerSearch}`}>
      <div className="flex justify-end">
        <AutoComplete style={{ width: "350px" }}>
          <Search placeholder="Search" />
        </AutoComplete>
      </div>
    </div>
  );
};

export default InputSearch;
