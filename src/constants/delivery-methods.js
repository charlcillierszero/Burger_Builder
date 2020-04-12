const deliveryMethods = {
  FASTEST: { value: 'fastest', displayValue: 'Fastest' },
  CHEAPEST: { value: 'cheapest', displayValue: 'Cheapest' },
};

const defualtDeliveryOptions = [
  deliveryMethods.CHEAPEST,
  deliveryMethods.FASTEST,
];

export default deliveryMethods;

export {
  deliveryMethods,
  defualtDeliveryOptions,
}