import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('초기 조건 확인', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  const confirmBtn = screen.getByRole('button');
  expect(confirmBtn).toBeDisabled();
});

test('체크박스 체크 여부에 따른 버튼 활성화', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });
  fireEvent.click(checkbox);
  expect(confirmBtn).toBeEnabled();
  fireEvent.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});
