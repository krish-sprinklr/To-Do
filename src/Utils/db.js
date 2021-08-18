const data = [
  [
    {
      id: 1,
      heading: "Check",
      content: "Hello content",
    },
    {
      id: 2,
      heading: "Check1",
      content: "Hello content12",
    },
  ],
  [
    {
      id: 3,
      heading: "Check",
      content: "Hello content",
    },
    {
      id: 4,
      heading: "Check1",
      content: "Hello content12",
    },
  ],
  [
    {
      id: 5,
      heading: "Check",
      content: "Hello content",
    },
    {
      id: 6,
      heading: "Check1",
      content: "Hello content12",
    },
  ],
];

const delayedResult = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1200);
  });
};

export default delayedResult;
