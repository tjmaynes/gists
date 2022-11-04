const interpret = (command) => {
    let result = command.split("");
    let newResult = [];

    let i = 0;
    while (i < result.length) {
        if (result[i] == "(" && result[i+1] == ")") {
            newResult.push("o")
            i += 2;
        } else if (result[i] == "G") {
            newResult.push("G");
            i += 1;
        } else {
            newResult.push("al");
            i += 4;
        }
    }

    return newResult.join("");
}

describe("GoalParserInterpretation", () => {
    describe("when given a parsable goal string", () => {
        it("should return the parsed goal word", () => {
            expect(interpret("G()(al)")).toBe("Goal");
            expect(interpret( "G()()()()(al)")).toBe("Gooooal");
            expect(interpret("(al)G(al)()()G")).toBe("alGalooG");
        })
    })
});