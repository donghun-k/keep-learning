import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  className?: string;
}

const HeartIcon = ({ className }: Props) => {
  return <AiOutlineHeart className={className || "h-6 w-6"} />;
};

export default HeartIcon;
