import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  children: ReactNode;
}

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 3,
  },
};

const ScrollableBar = ({ children }: Props) => {
  return (
    <Carousel containerClass="flex w-full gap-2" responsive={responsive}>
      {children}
    </Carousel>
  );
};

export default ScrollableBar;
