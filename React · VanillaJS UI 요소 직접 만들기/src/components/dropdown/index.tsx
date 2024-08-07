import ViewportContextProvider from '@/context/viewportContext';
import Dropdown1 from './1_r';
import Dropdown2 from './2_r';
import Dropdown3 from './3_r';
import cx from './cx';
import Dropdown4 from './4_r';
import Dropdown5 from './5_r';

const Dropdowns = () => {
  return (
    <ViewportContextProvider>
        <h2>Dropdown</h2>
        <Dropdown1 />
        <Dropdown2 />
        <Dropdown3 />
        <Dropdown4 />
        <Dropdown5 />
        <div id="popoverRoot" />
    </ViewportContextProvider>
  );
};

export default Dropdowns;
