const isPalindrome = (input) => {
    if (input < 0) return false;

    const toArray = (value) => value.toString().split("").map(Number);

    const data = toArray(input); let leftIndex = 0; let rightIndex = data.length - 1;
    while (leftIndex <= data.length / 2 && rightIndex >= data.length / 2) {
        if (data[leftIndex] != data[rightIndex]) return false;
        leftIndex += 1; rightIndex -= 1;
    }

    return true
}

describe("IsPalindrome", () => {
    it("should return true if number is a palindrome", () => {
        expect(isPalindrome(121)).toBeTruthy();
        expect(isPalindrome(101)).toBeTruthy();
        expect(isPalindrome(1)).toBeTruthy();
        expect(isPalindrome(11)).toBeTruthy();
        expect(isPalindrome(10)).toBeFalsy();
        expect(isPalindrome(912)).toBeFalsy();
        expect(isPalindrome(-101)).toBeFalsy();
        expect(isPalindrome(1000030001)).toBeFalsy();
    });
}); 