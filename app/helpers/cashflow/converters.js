const { objectOfObjectsToArrayOfObjects, objectOfObjectsToArrayOfObjectsForPages } = require('../converters');

const cardsToArray = (cards) => {
    return objectOfObjectsToArrayOfObjects(cards)
}
const cardsToArrayForPages = (cards) => {
    return objectOfObjectsToArrayOfObjectsForPages(cards)
}

const cashflowsToArray = (cashflows) => {
    return objectOfObjectsToArrayOfObjects(cashflows)
}
const cashflowsToArrayForPages = (cashflows) => {
    return objectOfObjectsToArrayOfObjectsForPages(cashflows)
}

const expensesToArray = (expenses) => {
    return objectOfObjectsToArrayOfObjects(expenses)
}
const expensesToArrayForPages = (expenses) => {
    return objectOfObjectsToArrayOfObjectsForPages(expenses)
}

module.exports.cardsToArray = cardsToArray
module.exports.cardsToArrayForPages = cardsToArrayForPages
module.exports.cashflowsToArray = cashflowsToArray
module.exports.cashflowsToArrayForPages = cashflowsToArrayForPages
module.exports.expensesToArray = expensesToArray
module.exports.expensesToArrayForPages = expensesToArrayForPages