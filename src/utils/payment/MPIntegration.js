import { MP_ACCESS_TOKEN } from "../../../config.json";

export const HandleIntegrateMP = async (items) => {
  console.log(items);
  const preferences = {
    items: items,
  };
  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      }
    );
    const data = await response.json();
    return data.init_point;
  } catch (err) {
    console.log(err);
  }
};
