export interface BannerData {
  message: string;
  state: 'success' | 'error';
}
interface Props {
  banner: BannerData;
}

const Banner = ({ banner: { message, state } }: Props) => {
  const isSuccess = state === 'success';
  const icon = isSuccess ? '✅' : '❌';
  return (
    <p
      className={`w-full rounded-xl p-2 text-center ${
        isSuccess ? 'bg-green-300' : 'bg-red-300'
      }`}
    >{`${icon} ${message}`}</p>
  );
};

export default Banner;
