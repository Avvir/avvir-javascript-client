import {expect} from "chai";
import '@babel/polyfill';
import AutoClassifier from "../../source/utilities/autoclassify_elements";

describe.only("AutoClassifier", () => {
    describe("#initialize", () => {
        it("loads data from CSVs", async function () {
            let autoClassifier = new AutoClassifier("some-floor.csv");
            await autoClassifier.initialize().then((output) => {
                expect(autoClassifier.masterformatKeywords.length).eql(297);
                expect(autoClassifier.columnsWeCareAbout.length).eql(21);
                expect(autoClassifier.projectElementsData.length).eql(11417);
            });
        });

    })
    describe("#calculateScore", () => {
        it('returns the sum of the score divided by the fixed number of keywords ', () => {


            let autoClassifier = new AutoClassifier("some-floor.csv");
            let input = [
                {
                    'keyword': "some-keyword",
                    'weight': 5
                },
                {
                    'keyword': 'some-other-keyword',
                    'weight': 2
                }
            ]
            let answer = autoClassifier.calculateScore(input)
            expect(answer).to.eql(7 / 5)
        });
    })
    describe("#readInput", () => {
    })
    describe("#formatOutput", () => {
    })
});
