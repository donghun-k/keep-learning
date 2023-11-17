interface Props {
  text: string;
  onClick: () => void;
}

const ColorButton = ({ text, onClick }: Props) => {
  return (
    <div className="rounded-md bg-gradient-to-bl from-fuchsia-600 to-amber-300 p-[0.15rem]">
      <button
        onClick={onClick}
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity"
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
