import { MyLinkedListStack } from "./LinkedListStack";

describe("MyLinkedListStack", () => {
    let stack;

    beforeEach(() => {
        stack = new MyLinkedListStack();
    });
    

    describe("#peek", () => {
        describe("when items are available", () => {
            beforeEach(() => {
                stack.push("wedding");
                stack.push("hello");
            });

            it("should return the last item added to stack", () => {
                expect(stack.peek()).toBe("hello");
            });
        });

        describe("when items are not available", () => {
            it("should throw an exception", () => {
                expect(() => stack.peek()).toThrow("No items to peek!")
            });
        });
    });

    describe("#push", () => {
        it("should add an item to the top of the stack", () => {
            stack.push("world");
            stack.push("hello");

            expect(stack.peek()).toBe("hello");
            expect(stack.size()).toBe(2);

            stack.push(null);

            expect(stack.peek()).toBe("hello");
            expect(stack.size()).toBe(2);
        });
    });

    describe("#pop", () => {
        describe("when items are available", () => {
            beforeEach(() => {
                stack.push(10);
                stack.push(12);
            });

            it("should return the top item in the stack and remove item", () => {
                const result = stack.pop();

                expect(result).toBe(12);
                expect(stack.size()).toBe(1);
            });
        });

        describe("when items are not available", () => {
            it("should throw an exception", () => {              
                expect(() => stack.pop()).toThrow("No items left to pop!");
            });
        });
    });
}); 