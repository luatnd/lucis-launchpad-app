import { AutoComplete, Input } from "antd";

const { Search } = Input;

const InputSearch = () => {
  return (
    <div className="lucis-container">
      <div className="flex justify-end">
        <AutoComplete style={{ width: "400px" }}>
          <Search />
        </AutoComplete>
      </div>
    </div>
  );
};

export default InputSearch;
