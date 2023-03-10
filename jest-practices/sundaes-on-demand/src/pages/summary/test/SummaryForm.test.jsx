import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('초기 조건 확인', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  const confirmBtn = screen.getByRole('button');
  expect(confirmBtn).toBeDisabled();
});

test('체크박스 체크 여부에 따른 버튼 활성화', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });
  await user.click(checkbox);
  expect(confirmBtn).toBeEnabled();
  await user.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});

test('마우스 호버 시 팝오버', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered./
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
