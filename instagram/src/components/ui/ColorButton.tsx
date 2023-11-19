interface Props {
  text: string;
  onClick: () => void;
  size?: 'small' | 'large';
}

const ColorButton = ({ text, onClick, size = 'small' }: Props) => {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 to-amber-300 p-[0.15rem] ${
        size === 'large' ? 'p-[0.3rem]' : 'p-[0.15rem]'
      }`}
    >
      <button
        onClick={onClick}
        className={`bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity ${
          size === 'large' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
