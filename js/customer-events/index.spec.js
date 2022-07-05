const processCustomerEvents = require('./');

describe("#processCustomerEvents", () => {
  describe("when customer events are ready to be consumed", () => {
    it("should update a customer with the aggregated event state", () => {
        const customerEvents = getCustomerEvents();

        const results = processCustomerEvents(customerEvents);

        expect(results).toStrictEqual({
            "Jack": [
                "foo@gmail.com",
                "jack@gmail.com"
            ],
            "Olivia": [
                "olivia@hotmail.com",
                "olivia+indebted@hotmail.com"
            ],
            "Robert": [
                "robert@gmail.com"
            ]
        })
    });
  });

  const getCustomerEvents = () => [
    {
      Type: "CustomerCreated",
      CustomerID: "Jack",
      Emails: ["foo@gmail.com", "bar@gmail.com"],
    },
    {
      Type: "CustomerEmailRemoved",
      CustomerID: "Jack",
      Emails: ["bar@gmail.com"],
    },
    {
      Type: "CustomerEmailAdded",
      CustomerID: "Jack",
      Emails: ["jack@gmail.com"],
    },
    {
      Type: "CustomerCreated",
      CustomerID: "Robert",
      Emails: [],
    },
    {
      Type: "CustomerEmailAdded",
      CustomerID: "Robert",
      Emails: ["robert@gmail.com"],
    },
    {
      Type: "CustomerCreated",
      CustomerID: "Olivia",
      Emails: ["olivia@hotmail.com"],
    },
    {
      Type: "CustomerEmailRemoved",
      CustomerID: "Olivia",
      Emails: ["olivia@hotmail.com"],
    },
    {
      Type: "CustomerEmailAdded",
      CustomerID: "Olivia",
      Emails: ["olivia@hotmail.com", "olivia+indebted@hotmail.com"],
    },
    {
      Type: "CustomerEmailAdded",
      CustomerID: "Robert",
      Emails: ["robert@gmail.com"],
    },
  ];
});
