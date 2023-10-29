import { describe, expect, it, vi } from 'vitest';
import { $ as miniQuery } from '../main';

const $ = (seletor: string, container: Element) => {
  if (!container) {
    throw new Error('Container is required');
  }
  return miniQuery(seletor, container);
};

describe('MiniQueyr', () => {
  describe('length', () => {
    it('returns the number of elements correctly', () => {
      const div = document.createElement('div');
      div.innerHTML = `/*html*/
      <button class="btn" type="button">Button 1</button>
      <button class="btn" type="button">Button 2</button>
      <button class="btn" type="button">Button 3</button>
      <button class="btn" type="button">Button 4</button>
    `;
      expect($('.btn', div).length()).toBe(4);
    });
  });
  describe('click', () => {
    it('attaches a click event listener correctly', () => {
      const div = document.createElement('div');
      div.innerHTML = `/*html*/
      <button class="btn" type="button">Button 1</button>
      <button class="btn" type="button">Button 2</button>
      <button class="btn" type="button">Button 3</button>
      <button class="btn" type="button">Button 4</button>
      `;
      const handler = vi.fn();
      $('.btn', div).click(handler);
      (div.querySelectorAll('.btn')[0] as HTMLButtonElement).click();
      expect(handler).toBeCalledTimes(1);
    });
  });
});
