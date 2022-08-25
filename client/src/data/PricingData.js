const priceData = [
  {
    name: "Silver",
    price: 3,
    duration: "Month",
    months: 1,
    isPopular: false,
    data: [
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet.",
        isAvailable: false,
      },
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: false,
      },
    ],
  },

  {
    name: "Gold",
    price: 5100,
    duration: "3 Months + 1 Month Free",
    months: 4,
    isPopular: true,
    data: [
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet.",
        isAvailable: false,
      },
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: true,
      },
    ],
  },

  {
    name: "Platinum",
    price: 11000,
    duration: "Year",
    isPopular: false,
    months: 12,
    data: [
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet .",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit amet.",
        isAvailable: true,
      },
      {
        name: "Lorem ipsum dolor sit .",
        isAvailable: true,
      },
    ],
  },
];

export default priceData;
