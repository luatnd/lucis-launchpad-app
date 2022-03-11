import { Col, Row } from "antd";
import s from "./Content.module.sass";

const data = [
  {
    title: "Chain-agnostic",
    content: "Lucis supports multi-chain, designed to be chain-agnostic.",
  },
  { title: "Rapid Launches", content: "Launch your INO within days of being approved." },
  {
    title: "Highly customizable",
    content:
      "Chain, number of buying phases, which item was sold in a phase, box types, box quantity,… All are customizable.",
  },
  { title: "Exposure", content: "Get exposure to the Lucis users around the world." },
  {
    title: "Future Synergy",
    content:
      "Project will receive extensive support and advices even after listing, having access to all areas of the Lucis ecosystem such as: Lucis Media, Lucis Academy, Lucis Tournament, Lucis Marketplace, Lucis Scholar Community",
  },
];

const Content = () => {
  return (
    <div className={s.contentContainer}>
      <p className="text-center text-[16px] md:text-[26px] lg:text-[36px] font-[600]">
        Why choose Lucis launchpad?
      </p>
      <div className={s.contentBoxContainer}>
        <Row justify="space-around" gutter={[30, 20]}>
          {data.map((item, index) => {
            return (
              <Col xs={24} md={18} xl={14} key={index}>
                <div className={s.contentBox}>
                  <h3 className="text-center text-[16px] md:text-[26px] font-[600]">
                    {item.title}
                  </h3>
                  <p className="text-center">{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Content;
