import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('각 스쿱 옵션의 이미지 표시', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((scoopImage) => scoopImage.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
