import cx from '../cx';
import data from '../data';

const Dropdown5 = () => {
  return (
    <article>
      <h3>
        #5. React<sub>HTML select</sub>
      </h3>
      <select name="dropdown5" className={cx('selectbox')}>
        {data.map(({ id, text }) => (
          <option value={text} key={id}>
            {text}
          </option>
        ))}
      </select>
    </article>
  );
};

export default Dropdown5;
