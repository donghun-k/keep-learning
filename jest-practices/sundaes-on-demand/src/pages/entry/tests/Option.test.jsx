import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('각 스쿱 옵션의 이미지 표시', () => {
  render(<Options optionType="scoops" />);

  const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((scoopImage) => scoopImage.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
