import TextBox1 from './1_r';
import cx from './cx';

const TextBoxes = () => {
  return (
    <div className={cx('TextBoxes')}>
      <h2>Reactive Textarea</h2>
      <TextBox1 />
    </div>
  );
};

export default TextBoxes;
