const data = [
  {
    id: '1',
    name: 'est exercitation ex do nulla deserunt officia consequat aliquip proident',
  },
  {
    id: '2',
    name: 'occaecat et quis culpa exercitation sit irure ex nulla ad',
  },
  {
    id: '3',
    name: 'incididunt laborum minim ipsum reprehenderit deserunt ex proident Lorem sint',
  },
  {
    id: '4',
    name: 'nisi nostrud adipisicing consectetur dolor dolore sunt consectetur minim velit',
  },
  {
    id: '5',
    name: 'dolor occaecat sit adipisicing proident et ad incididunt reprehenderit sit',
  },
  {
    id: '6',
    name: 'eu aliquip exercitation amet officia officia ex eiusmod in incididunt',
  },
]

const list = Array.from({ length: 10 }, () => data).flatMap((list, index) =>
  list.map(item => ({ ...item, id: `_${index}_${item.id}` })),
)

export default list
