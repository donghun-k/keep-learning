// class MiniQuery {
//   private elements: Element[];
//   constructor(selector: string, container?: Element) {
//     this.elements = Array.from(
//       (container ?? document).querySelectorAll(selector)
//     );
//   }

//   click(handler: EventListener) {
//     this.elements.forEach((element) => {
//       element.addEventListener('click', handler);
//     });
//   }
//   length() {
//     return this.elements.length;
//   }
// }

export const $ = (selector: string, container?: Element) => {
  const elements = Array.from(
    (container ?? document).querySelectorAll(selector)
  );

  return {
    length: () => elements.length,
    click: (handler: EventListener) => {
      elements.forEach((element) => {
        element.addEventListener('click', handler);
      });
    },
  };
};
