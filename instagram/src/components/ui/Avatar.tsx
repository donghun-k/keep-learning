interface Props {
  image?: string | null;
}

const Avatar = ({ image }: Props) => {
  return (
    <div className="h-9 w-9 rounded-full bg-gradient-to-bl from-fuchsia-600 to-amber-300 p-[0.15rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rme]"
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Avatar;
