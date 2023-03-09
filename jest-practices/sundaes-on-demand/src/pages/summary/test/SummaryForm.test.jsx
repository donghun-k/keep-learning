import { render, test, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('초기 조건 확인', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});
