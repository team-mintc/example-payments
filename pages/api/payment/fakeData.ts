export const FakeORM = {
  OrderService: {
    findById: (id: string) => ({id, amount: 1000}),
    create: (id: string, amount: number) => undefined,
  },
};
