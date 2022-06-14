import { expect } from "chai";
import '@babel/polyfill';
import AutoClassifier from "../../source/utilities/autoclassify_elements";

describe.only("AutoClassifier", () => {
    describe("#constructor", () => {
        it("loads lookup table", async (done) => {
            // setTimeout(() => {
                let autoClassifier = new AutoClassifier("some-floor.csv")
                autoClassifier.loadCsvFile(autoClassifier.hackResources.masterformatKeywords, autoClassifier.masterformatKeywords).then((output) => {
                    expect(output).has.length(1006742);
                    console.log(autoClassifier)
                    done();
                });

            // }, 10000)
        });
        it('loads data from some file', function () {

        });

    })
    describe("#calculateScore", () => {})
    describe("#readInput", () => {})
    describe("#formatOutput", () => {})
});