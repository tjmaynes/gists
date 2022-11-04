const fizzBuzz = (n) => {
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 != 0 && i % 3 != 0 && i % 5 != 0)
            result.push(String(i))
        else if (i % 15 == 0)
            result.push("FizzBuzz")
        else if (i % 3 == 0)
            result.push("Fizz")
        else
            result.push("Buzz");
    }
    return result;
}

describe("FizzBuzz", () => {
    describe("when given an integer", () => {
        it("should return an array of strings", () => {
            expect(fizzBuzz(3)).toStrictEqual(["1", "2", "Fizz"])
            expect(fizzBuzz(5)).toStrictEqual(["1","2","Fizz","4","Buzz"]);
            expect(fizzBuzz(15)).toStrictEqual(["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]);
        })
    })
})