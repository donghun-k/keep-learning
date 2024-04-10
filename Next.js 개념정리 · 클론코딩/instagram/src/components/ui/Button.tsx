interface Props {
  text: string;
  onClick?: () => void;
  red?: boolean;
}
const Button = ({ text, onClick, red = false }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border-none px-8 py-2 font-bold leading-4 text-white ${
        red ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
