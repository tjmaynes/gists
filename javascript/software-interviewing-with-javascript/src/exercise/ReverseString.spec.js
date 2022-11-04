const reverseString = (input) => {
    let result = "";
    for (let i = input.length - 1; i >= 0; i--)
        result += input[i];
    return result;
}

describe("ReverseString", () => {
    it("should return a string in reverse when given a valid string", () => {
        expect(reverseString("hello-world")).toBe("dlrow-olleh");
        expect(reverseString("aaaaaaaaaaa")).toBe("aaaaaaaaaaa");
        expect(reverseString("12321")).toBe("12321");
        expect(reverseString("racecar")).toBe("racecar");
        expect(reverseString("A Space Odyssey")).toBe("yessydO ecapS A");
        expect(reverseString("")).toBe("");
    });
}); 