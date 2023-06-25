export const billingItems = [
  {
    _id: 101,
    name: "Nike Shoe",
    plus_icon: "../images/plusicon.png",
    minus_icon: "../images/minusicon.png",
    item_image: "../images/item01.jpg",
    qty: 2,
    size: 8,
    price: 100,
  },
  {
    _id: 102,
    name: "Puma Shoe",
    plus_icon: "../images/plusicon.png",
    minus_icon: "../images/minusicon.png",
    item_image: "../images/item02.jpg",
    qty: 3,
    size: 9,
    price: 200,
  },
];

export function getBillingItems() {
  return billingItems;
}
