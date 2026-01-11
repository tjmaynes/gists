// Arrays

Array.prototype.map = function (callback) {
    if (this.length <= 0) return []
    if (callback === undefined) return []

    for (let i = 0; i <= this.length - 1; i++)
        this[i] = callback(this[i])
    return this
}

Array.prototype.reduce = function (callback, initialValue) {
    if (initialValue === undefined)
        throw new Error('Need an initial value...')

    let updatedValue = initialValue
    for (let i = 0; i <= this.length - 1; i++)
        updatedValue = callback(updatedValue, this[i], i, this)
    return updatedValue
}

Array.prototype.filter = function (callback) {
    let result = []
    for (let i = 0; i < this.length; i++)
        if (callback(this[i], i))
            result.push(this[i])
    return result
}

Array.prototype.search = function (val) {

}

const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++){
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++){
            if (arr[j] > arr[j + 1])
            {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // IF no two elements were
        // swapped by inner loop, then break
        if (!swapped)
            break;
    }
    return arr
}

Array.prototype.sort = function (callback) {
    if (callback === undefined) {
        return bubbleSort(this)
    } else {
        // return bubbleSort(this).reduce((accum, curr, index, arr) => {
        //     const result = callback(curr, arr[index + 1])
        //     console.log(accum, [curr, arr[index + 1]], result, arr)
        //     if (result >= 1) {
        //         accum.push(arr[index + 1])
        //     } else {
        //         accum.push(curr)
        //     }
        //     return accum
        // }, [])
    }
}

const assertEqualTo = (fnName, actual, expected) => {
    const actualString = JSON.stringify(actual);
    const expectedString = JSON.stringify(expected);
    const result = actualString === expectedString

    if (result) {
        console.log(`${fnName}: '${actualString}' is equal to '${expectedString}'`)
    } else {
        console.error(result, `${fnName}: '${actualString}' is equal to '${expectedString}'`)
    }
}

const test = () => {
    assertEqualTo('Array.prototype.map', ['1', '2'].map((num) => parseInt(num)), [1, 2])
    assertEqualTo('Array.prototype.filter', [1, 2, 3, 4].filter((num) => num % 2 !== 0), [1, 3])
    assertEqualTo('Array.prototype.filter', [1, 2, 3, 4].filter((num) => false), [])
    assertEqualTo('Array.prototype.reduce', [1, 2].reduce((accum, curr) => accum + curr, 0), 3)
    assertEqualTo('Array.prototype.reduce', [1, 2, 3, 4, 5].reduce((accum, curr) => accum + curr, 0), 15)
    assertEqualTo('Array.prototype.sort', [2, 20, 10, 1].sort(), [1, 2, 10, 20])
    // assertEqualTo('Array.prototype.sort', [2, 20, 10, 1].sort((num1, num2) => num2 - num1), [20, 10, 2, 1])
}

test()
