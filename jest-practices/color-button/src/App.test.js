import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('Button has correct initial color', () => {
  render(<App />);
  // button 이라는 Role과 'Change to blue'라는 텍스트로 버튼 찾기
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  // 버튼 색이 빨강인지 테스트
  expect(colorBtn).toHaveStyle({ backgroundColor: 'red' });
});

test('Button turns blue when clicked', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  // 버튼 클릭
  fireEvent.click(colorBtn);
  // 버튼 색이 파랑으로 변했는지 테스트
  expect(colorBtn).toHaveStyle({ backgroundColor: 'blue' });
  // 텍스트도 변경되었는지 테스트
  expect(colorBtn).toHaveTextContent('Change to red');
});

test('Initial conditions', () => {
  render(<App />);
  // 버튼이 활성화된 상태인지 테스트
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorBtn).toBeEnabled();

  // 체크박스가 unchecked 상태인지 테스트
  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked();
});

test('Disable checkbox test', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  const checkBox = screen.getByRole('checkbox', { name: 'Disable Button' });

  fireEvent.click(checkBox);
  expect(colorBtn).toBeDisabled();
  fireEvent.click(checkBox);
  expect(colorBtn).toBeEnabled();
});

test('Disabled button has gray bg and revert to prev color', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  const checkBox = screen.getByRole('checkbox', { name: 'Disable Button' });

  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: 'gray' });
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorBtn);
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: 'gray' });
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: 'blue' });
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
