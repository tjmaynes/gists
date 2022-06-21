const processCustomerEvents = (customerEvents) =>
    customerEvents.reduce((accum, currentEvent) => {
        const { Type, CustomerID, Emails } = currentEvent;

        switch (Type) {
        case 'CustomerCreated':
            if (!accum[CustomerID])
                accum[CustomerID] = Emails;
            break;
        case 'CustomerEmailAdded':
            const uniqueEmailSet = new Set();

            const newEmails = accum[CustomerID].concat(...Emails);
            newEmails.forEach((email) => uniqueEmailSet.add(email));

            accum[CustomerID] = Array.from(uniqueEmailSet);
            break;
        case 'CustomerEmailRemoved':
            accum[CustomerID] = accum[CustomerID]
                .filter(email => !Emails.includes(email));
            break;
        default:
            break;
        }

        return accum;
    }, {});

module.exports = processCustomerEvents;