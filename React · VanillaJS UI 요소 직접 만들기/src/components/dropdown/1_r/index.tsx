import data from '../data';
import Dropdown from './Dropdown';

const Dropdown1 = () => {
  return (
    <article>
      <h3>
        #1. React<sub>Compound Component</sub>
      </h3>
      <Dropdown.Provider list={data}>
        <Dropdown.Container>
          <Dropdown.Trigger />
          <Dropdown.List />
        </Dropdown.Container>
      </Dropdown.Provider>
    </article>
  );
};

export default Dropdown1;
