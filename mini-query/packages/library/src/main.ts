class MiniQuery {
  private elements: Element[];
  constructor(selector: string, container?: Element) {
    this.elements = Array.from(
      (container ?? document).querySelectorAll(selector)
    );
  }
  length() {
    return this.elements.length;
  }
}

export const $ = (selector: string, container?: Element) => {
  return new MiniQuery(selector, container);
};
