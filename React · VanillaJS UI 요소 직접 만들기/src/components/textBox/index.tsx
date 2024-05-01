import TextBox1 from './1_r';
import TextBox2 from './2_r';
import cx from './cx';

const TextBoxes = () => {
  return (
    <div className={cx('TextBoxes')}>
      <h2>Reactive Textarea</h2>
      <TextBox1 />
      <TextBox2 />
    </div>
  );
};

export default TextBoxes;
