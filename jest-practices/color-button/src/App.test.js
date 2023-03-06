import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Button has correct initial color', () => {
  render(<App />);
  // button 이라는 Role과 'Change to blue'라는 텍스트로 버튼 찾기
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  // 버튼 색이 빨강인지 확인
  expect(colorBtn).toHaveStyle({ backgroundColor: 'red' });
});
test('Button turns blue when clicked', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', { name: 'Change to blue' });
  // 버튼 클릭
  fireEvent.click(colorBtn);
  // 버튼 색이 파랑으로 변했는지 확인
  expect(colorBtn).toHaveStyle({ backgroundColor: 'blue' });
  // 텍스트도 변경되었는지 확인
  expect(colorBtn).toHaveTextContent('Change to red');
});
