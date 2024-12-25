type Pizza = {
  id: number;
  name: string;
  price: number;
};
type Order = {
  pizza: Pizza;
  status: "ordered" | "completed";
  id: number;
};

let pizzaId = 0;

const menu: Pizza[] = [
  { id: pizzaId++, name: "Margherita", price: 8 },
  { id: pizzaId++, name: "Pepperoni", price: 10 },
  { id: pizzaId++, name: "Hawaiian", price: 10 },
  { id: pizzaId++, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
const orderHistory: Order[] = [];
let orderId = 0;

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const addedPizzaObj = { id: pizzaId++, ...pizzaObj };
  menu.push(addedPizzaObj);
  return addedPizzaObj;
}

function placeOrder(orderedPizza: string): Order | undefined {
  const selectedPizza = menu.find((pizza) => pizza.name === orderedPizza);
  if (selectedPizza) {
    cashInRegister += selectedPizza.price;
    const newOrder: Order = {
      pizza: selectedPizza,
      status: "ordered",
      id: (orderId += 1),
    };
    orderHistory.push(newOrder);

    return newOrder;
  } else {
    console.log("Pizza not found in the menu.");
  }
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderHistory.find((order) => order.id === orderId);
  if (order) {
    order.status = "completed";
    return order;
  } else {
    console.log("Order not found.");
  }
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
  if (typeof identifier === "number") {
    const pizza = menu.find((pizza) => pizza.id === identifier);
    if (!pizza) {
      console.log("Pizza not found in the menu.");
      return;
    }
    return pizza;
  } else if (typeof identifier === "string") {
    const pizza = menu.find(
      (pizza) => pizza.name.toLowerCase === identifier.toLowerCase
    );
    if (!pizza) {
      console.log("Pizza not found in the menu.");
      return;
    }
    return pizza;
  } else {
    throw new TypeError("Parameter `identifier` must be a string or a number");
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
console.log("Order Queue:", orderHistory);
console.log("Cash in Register:", cashInRegister);
getPizzaDetail(5);
getPizzaDetail("Pepperoni");
