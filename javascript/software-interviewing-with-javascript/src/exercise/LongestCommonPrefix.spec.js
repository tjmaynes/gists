const longestCommonPrefix = (strs) => {
    let result = strs[0];

    for (let i = 1; i < strs.length; i++) {
        const currentWord = strs[i];
        if (currentWord == "") return "";

        for (let j = 0; j < currentWord.length; j++) {
            if (result[j] != currentWord[j]) {
                result = result.substring(0, j);
                break;
            }

            if (result.length > currentWord.length && j == currentWord.length - 1)
                result = currentWord;
        }
    }

    return result;
}

describe("LongestCommonPrefix", () => {
    describe("when given a list of strings", () => {
        it("should return the longest common prefix", () => {
            expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
            expect(longestCommonPrefix(["ab", "a"])).toBe("a");
            expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
            expect(longestCommonPrefix(["reflower", "flow", "flight"])).toBe("");
            expect(longestCommonPrefix(["flower", "fkow"])).toBe("f");
            expect(longestCommonPrefix(["abab", "aba", ""])).toBe("");
            expect(longestCommonPrefix(["baab","bacb","b","cbc"])).toBe("");
            expect(longestCommonPrefix(["abca","aba","aaab"])).toBe("a");
        });
    });
});