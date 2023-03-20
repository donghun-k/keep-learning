import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('스쿱 업데이트 시 소계 변경 테스트', async () => {
  const user = userEvent.setup();
  render(<Options optionType={'scoops'} />);

  const scoopsSubtotal = screen.getByText('Scoop total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // 바닐라 스쿱 업데이트 후 소계 체크
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // 초콜릿 스쿱 업데이트 후 소계 체크
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
