interface Props {
  text: string;
  onClick: () => void;
  size?: "small" | "large";
}

const ColorButton = ({ text, onClick, size = "small" }: Props) => {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 to-amber-300 p-[0.15rem] ${
        size === "large" ? "p-[0.3rem]" : "p-[0.15rem]"
      }`}
    >
      <button
        onClick={onClick}
        className={`rounded-sm bg-white p-[0.3rem] text-base transition-opacity hover:opacity-90 ${
          size === "large" ? "p-4 text-2xl" : "p-[0.3rem] text-base"
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
