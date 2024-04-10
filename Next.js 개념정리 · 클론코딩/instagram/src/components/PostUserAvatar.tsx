import Avatar from "./ui/Avatar";

interface Props {
  userImage: string;
  username: string;
}

const PostUserAvatar = ({ userImage, username }: Props) => {
  return (
    <div className="flex items-center p-2">
      <Avatar image={userImage} size="medium" highlight />
      <span className="ml-2 font-bold text-gray-900">{username}</span>
    </div>
  );
};

export default PostUserAvatar;
