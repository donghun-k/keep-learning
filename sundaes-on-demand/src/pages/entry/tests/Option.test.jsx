import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

test('각 스쿱 옵션의 이미지 표시', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((scoopImage) => scoopImage.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('각 토핑 옵션의 이미지 표시', async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const imageTitles = images.map((image) => image.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
