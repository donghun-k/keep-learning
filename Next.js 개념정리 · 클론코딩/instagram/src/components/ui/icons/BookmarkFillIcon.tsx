import { RiBookmarkFill } from "react-icons/ri";

interface Props {
  className?: string;
}

const BookmarkIcon = ({ className }: Props) => {
  return <RiBookmarkFill className={className || "h-6 w-6"} />;
};

export default BookmarkIcon;
