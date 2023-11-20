import { User } from "@/app/model/user";
import Avatar from "./Avatar";

interface Props {
  user: User;
}

const SideBar = ({ user: { name, username, image } }: Props) => {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg leading-4 text-neutral-500">{name}</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
