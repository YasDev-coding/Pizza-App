type pizza = {
  name: string;
  price: number;
};
type order = {
  pizza: pizza;
  status: string;
  orderId: number;
};

const menu: pizza[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister = 100;
const orderQueue: order[] = [];
let orderId = 0;
function addNewPizza(pizzaObj: pizza) {
  menu.push(pizzaObj);
}

function placeOrder(orderedPizza: string) {
  const selectedPizza = menu.find((pizza) => pizza.name === orderedPizza);
  if (selectedPizza) {
    if (cashInRegister >= selectedPizza.price) {
      cashInRegister += selectedPizza.price;
      const newOrder: order = {
        pizza: selectedPizza,
        status: "ordered",
        orderId: (orderId += 1),
      };
      orderQueue.push(newOrder);

      return newOrder;
    } else {
      console.log("Insufficient funds to place the order.");
    }
  } else {
    console.log("Pizza not found in the menu.");
  }
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.orderId === orderId);
  if (order) {
    order.status = "completed";
    return order;
  } else {
    console.log("Order not found.");
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
placeOrder("BBQ Chicken");
placeOrder("Spicy Sausage");
completeOrder(1);

console.log("Menu:", menu);
console.log("Order Queue:", orderQueue);
console.log("Cash in Register:", cashInRegister);
