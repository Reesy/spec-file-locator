import chai = require("chai");
import * as WorldHello from "../WorldHello";
describe("WorldHello", () => {

    describe("RandomTest", () => 
    {
        describe("When called", () => 
        {
            let testClass:any;
            before(()=>
            {
                testClass = new WorldHello.WorldHello;
            });
            it("Should return 5", () =>
            {
                chai.expect(testClass.RandomTest()).to.eq(5);
            });
        });
    });
});