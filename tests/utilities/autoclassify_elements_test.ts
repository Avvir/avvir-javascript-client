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
    describe("#findColumnValueInKeywords", () => {
        let weightsByKeyword;
        beforeEach(() => {
            weightsByKeyword = {
                "Concrete": {
                    "some-masterformat": 1,
                    "some-other-masterformat": 7
                },
                "Reinforce": {
                    "some-masterformat": 1
                }
            };
        })
        it.only('returns the weightsByKeyword for keywords that match', () => {
            let autoClassifier = new AutoClassifier("some-floor.csv");
            let searchString = "Me and Concrete";
            let answer = autoClassifier.findColumnValueInKeywords(searchString, weightsByKeyword);
            expect(answer).to.eql([
                    {
                        "some-masterformat": 1,
                        "some-other-masterformat": 7
                    }
                ]
            )
            let anotherSearchString = "Concrete Reinforced"
            let anotherAnswer = autoClassifier.findColumnValueInKeywords(anotherSearchString, weightsByKeyword);
            expect(anotherAnswer).to.eql([
                    {
                        "some-masterformat": 1,
                        "some-other-masterformat": 7
                    },
                    {
                        "some-masterformat": 1
                    }

                ]
            )
        });

    })


    describe("#autoClassify", () => {
    })
});
