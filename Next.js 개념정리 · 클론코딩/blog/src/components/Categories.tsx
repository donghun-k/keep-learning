interface Props {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
}
const Categories = ({ categories, selected, onClick }: Props) => {
  return (
    <section className="p-4 text-center">
      <h2 className="mb-2 border-b border-sky-500 text-lg font-bold">
        Category
      </h2>
      <ul>
        {categories.map((category) => (
          <li
            className={`cursor-pointer hover:text-sky-500 ${
              category === selected ? 'text-sky-600' : ''
            }`}
            key={category}
            onClick={() => onClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
