export const objectOfObjectsToArrayOfObjects = (objectOfObjects) => {
    let returnArray = []

    Object.keys(objectOfObjects).forEach((objectOfObject) => {
        returnArray.push(objectOfObjects[objectOfObject])
    })

    return returnArray
}
export const objectOfObjectsToArrayOfObjectsForPages = (objectOfObjects) => {
    let returnArray = []

    Object.keys(objectOfObjects).forEach((objectOfObject) => {
        returnArray.push({data: objectOfObjects[objectOfObject]})
    })

    return returnArray
}