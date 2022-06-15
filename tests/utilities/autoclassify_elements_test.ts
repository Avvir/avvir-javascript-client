import { expect } from "chai";
import '@babel/polyfill';
import AutoClassifier from "../../source/utilities/autoclassify_elements";

describe.only("AutoClassifier", () => {
    describe("#constructor", () => {
        it("loads lookup table", async function () {
                // this.timeout(10000);
                let autoClassifier = new AutoClassifier("some-floor.csv");
                await autoClassifier.loadCsvFile(autoClassifier.hackResources.masterformatKeywords, autoClassifier.masterformatKeywords).then((output) => {
                expect(output).eql(6743);
                console.log(autoClassifier.masterformatKeywords)
                });


        });
        it('loads data from some file', function () {

        });

    })
    describe("#calculateScore", () => {})
    describe("#readInput", () => {})
    describe("#formatOutput", () => {})
});
