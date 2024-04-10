import { AiFillHeart } from "react-icons/ai";

interface Props {
  className?: string;
}

const HeartFillIcon = ({ className }: Props) => {
  return <AiFillHeart className={className || "h-6 w-6 fill-red-500"} />;
};

export default HeartFillIcon;
