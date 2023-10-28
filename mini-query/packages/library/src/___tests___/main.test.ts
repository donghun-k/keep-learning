import { describe, expect, it } from 'vitest';
import { $ } from '../main';

describe('MiniQueyr', () => {
  it('does nothing', () => {
    expect(true).toBe(true);
  });

  it('returns length correctly', () => {
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
