import { MyArray } from "./Array";

describe("MyArray", () => {
    let array;

    beforeEach(() => {
        array = new MyArray();
    });
    
    describe("#get", () => {
        describe("when items are available", () => {
            beforeEach(() => {
                array.push(10);
                array.push(12);
            });
    
            it("should be able to get by index", () => {            
                expect(array.get(0)).toBe(10);
                expect(array.get(1)).toBe(12);
            });
        });
    
        describe("when item does not exist", () => {
            it("should throw an exception", () => {
                expect(() => array.get(0)).toThrow("Item not found!");
            });
        });
    });

    describe("#push", () => {
        describe("when item does not exist", () => {
            it("should add the item to the array", () => {
                array.push(45);

                expect(array.get(0)).toBe(45);
            });
        });

        describe("when item does exist", () => {
            it("should not add the item to the array (no duplicates)", () => {
                array.push(45);
                array.push(45);

                expect(array.size()).toBe(1);
            });
        });
    });

    describe("#pop", () => {
        describe("when items are available", () => {
            beforeEach(() => {
                array.push(10);
                array.push(14);
            });

            it("should remove the last item and return last item", () => {
                let result = array.pop();

                expect(result).toBe(14);
                expect(array.size()).toBe(1);
            });
        });

        describe("when items are not available", () => {
            it("should throw an exception", () => {
                expect(() => array.pop()).toThrow("No items left to pop!");
            });
        });
    });

    describe("#remove", () => {
        describe("when item is found", () => {
            beforeEach(() => {
                array.push(20);
                array.push(55);
            });

            it("should remove the item", () => {
                array.remove(0);

                expect(() => array.get(0)).toThrow("Item not found!");
                expect(array.size()).toBe(1);

                array.remove(1);

                expect(() => array.get(1)).toThrow("Item not found!");
                expect(array.size()).toBe(0);
            });
        });

        describe("when item is not found", () => {
            beforeEach(() => {
                array.push(55);
            })

            it("should throw an exception", () => {
                expect(() => array.remove(1)).toThrow("Item not found!");
            });
        });
    });
}); 