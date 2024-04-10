import { RiBookmarkLine } from "react-icons/ri";

interface Props {
  className?: string;
}

const BookmarkIcon = ({ className }: Props) => {
  return <RiBookmarkLine className={className || "h-6 w-6"} />;
};

export default BookmarkIcon;
