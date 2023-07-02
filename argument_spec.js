/*
 * This source code is under the Unlicense
 */
/*
 * This test case is described for Jasmine.
 */
describe("morilib-pattern", function() {
    const P = Argument();

    function ok(actual, expected) {
        expect(actual).toEqual(expected);
    }

    function oknum(actual, expected) {
        expect(actual).toBeCloseTo(expected, 6);
    }

    beforeEach(function() {
    });

    describe("testing morilib-pattern", function() {
        it("simple", () => {
            const f1 = P.pattern([
            {
                pattern: [P.pred(0, P.type("number"))],
                f: x => x + 1
            },
            {
                pattern: [P.pred(-1, P.empty)],
                f: () => "empty"
            },
            {
                pattern: [P.pred(0, P.is(Array))],
                f: x => x.concat([1])
            },
            {
                pattern: [P.pred(0, P.any)],
                f: x => x
            }]);

            ok(f1(26), 27);
            ok(f1([]), "empty");
            ok(f1([1, 2]), [1, 2, 1]);
            ok(f1({ a: 2 }), { a: 2 });
            expect(() => f1()).toThrow();
            expect(() => f1(1, 2)).toThrow();
        });

        it("object", () => {
            const f1 = P.pattern([
            {
                pattern: [P.matchObject({ aaaa: P.pred(0, P.type("number")), bbbb: P.opt(1, P.type("number"), -1) })],
                f: (x, y) => x + y
            }]);

            ok(f1({ aaaa: 2, bbbb: 3 }), 5);
            ok(f1({ aaaa: 2, }), 1);
            expect(() => f1({ bbbb: 3 })).toThrow();
        });

        it("opt array", () => {
            const f1 = P.pattern([
            {
                pattern: [P.pred(0, P.type("number")), P.opt(1, P.type("number"), -1), P.opt(2, P.type("string"), "")],
                f: (x, y, z) => (x + y) + z
            }]);

            ok(f1(2, 3, "aaa"), "5aaa");
            ok(f1(2, 3), "5");
            ok(f1(2, "aaa"), "1aaa");
            ok(f1(2), "1");
        });

        it("repeat", () => {
            const f1 = P.pattern([
            {
                pattern: [P.pred(0, P.type("number")), P.repeat(1, P.type("number")), P.pred(2, P.type("number"))],
                f: (x, y, z) => x + y.reduce((accum, x) => accum + x, 0) - z
            }]);

            ok(f1(2, 3, 4, 5, 6), 8);
            ok(f1(2, 6), -4);
            expect(() => f1(2, 3, 4, "aaa")).toThrow();
        });

        it("choice", () => {
            const f1 = P.pattern([
            {
                pattern: P.choice([1, 2], [2, 3]),
                f: () => "ok"
            }]);

            ok(f1(1, 2), "ok");
            ok(f1(2, 3), "ok");
            expect(() => f1(2, 4)).toThrow();
        });
    });
});

