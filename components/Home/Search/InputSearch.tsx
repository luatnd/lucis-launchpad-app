import { debounce } from "@github/mini-throttle";
import { AutoComplete, Input, message } from "antd";
import { useSearchCampaign } from "hooks/home/useSearchCampaign";
import { useWindowSize } from "hooks/useWindowSize";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { slugify } from "utils/String";
import s from "./InputSearch.module.sass";

const { Search } = Input;

const _callFnDebounced = debounce(
  (fn: () => void) => {
    fn();
  },
  400,
  { start: false }
);

const responsiveFontSize = (width: number) => {
  width < 425 ? "16px" : "18px";
  if (width < 425) {
    return "16px";
  } else {
    return "18px";
  }
};

const InputSearch = () => {
  const [options, setOptions] = useState([]);
  const { result, search } = useSearchCampaign();
  const [widthScreen] = useWindowSize();

  const textSize = responsiveFontSize(widthScreen);

  const onSelect = () => {
    console.log("Search");
  };

  const useHandleSearch = (e: string) => {
    _callFnDebounced(search(e));
  };

  useEffect(
    () =>
      setOptions(
        result?.data.searchCampaign.map((item: any, idx: number) => {
          const getCampaignDetailUrl = () => {
            return `/campaign/${item.uid}/${slugify(item.name)}`;
          };
          return {
            label: (
              <Link href={getCampaignDetailUrl()} passHref>
                <a
                  style={{
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <img src={item.cover_img} alt="" />
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        margin: 0,
                        fontSize: textSize,
                      }}
                    >
                      {item.game.name}
                    </p>
                    <p style={{ margin: 0, fontSize: textSize }}>{item.name}</p>
                  </div>
                </a>
              </Link>
            ),
          };
        })
      ),
    [result]
  );

  return (
    <div className="lucis-container">
      <div className={`flex justify-end  md:my-[12px] ${s.searchContainer}`}>
        <AutoComplete
          className={s.temp}
          style={{ width: "400px" }}
          options={options}
          onSelect={onSelect}
          onSearch={useHandleSearch}
          dropdownMatchSelectWidth={false}
        >
          <Search placeholder="Search" />
        </AutoComplete>
      </div>
    </div>
  );
};

export default InputSearch;
