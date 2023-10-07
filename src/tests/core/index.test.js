import NCoreContext from "../../core";

const Context = new NCoreContext(
    {
        a: "x"
    },
    {
        key: "a"
    }
);

describe("Core Class Test", () => {
    test("State", () => {
        expect(Context.state.a).toEqual("x");
    });
});
