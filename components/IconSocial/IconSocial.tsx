import st from "./Icon.module.sass";

type Props = {
  href: string;
  src: string;
};

const IconSocial = ({ href, src }: Props) => {
  return (
    <div className={st.ic_item}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={src} alt="" />
      </a>
    </div>
  );
};

export default IconSocial;

// https://www.tiktok.com/@lucistvv"
// "/assets/footer/tiktok.svg"
