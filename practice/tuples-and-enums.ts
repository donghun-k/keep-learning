// Tuples
let tuple: [number, string];

tuple = [1, 'tuple'];
// tuple = ['tuple', 1]; Error
// tuple = [1, 'tuple', 3]; Error

// Enums
enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
}

function isDelivered(status: OrderStatus) {
  return status === OrderStatus.DELIVERED;
}

isDelivered(OrderStatus.RETURNED);
