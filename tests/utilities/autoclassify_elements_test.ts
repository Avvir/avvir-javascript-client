import { expect } from "chai";
import '@babel/polyfill';
import AutoClassifier from "../../source/utilities/autoclassify_elements";

describe.only("AutoClassifier", () => {
    describe("#constructor", () => {
        it("loads lookup table", ()=>{
            let autoClassifier = new AutoClassifier("some-floor.csv");
            expect(autoClassifier.masterformatKeywords).has.length(6742);
        });
        it('loads data from some file', function () {

        });

    })
    describe("#calculateScore", () => {})
    describe("#readInput", () => {})
    describe("#formatOutput", () => {})
});