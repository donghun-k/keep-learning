import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('스쿱, 토핑 라우트 에러 핸들링', async () => {
  server.resetHandlers(
    rest.get('https://localhost:3030/scoops', (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get('https://localhost:3030/toppings', (req, res, ctx) => {
      res(ctx.status(500));
    })
  );
  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
