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
                expect(autoClassifier.plannedBuildingElements.length).eql(11417);

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
        it('returns the weightsByKeyword for keywords that match', () => {
            let autoClassifier = new AutoClassifier("some-floor.csv");
            autoClassifier.weightsByKeyword = weightsByKeyword;
            let searchString = "Me and Concrete";
            let answer = autoClassifier.findColumnValueInKeywords(searchString);
            expect(answer).to.eql([
                    {
                        "some-masterformat": 1,
                        "some-other-masterformat": 7
                    }
                ]
            )
            let anotherSearchString = "Concrete Reinforced"
            let anotherAnswer = autoClassifier.findColumnValueInKeywords(anotherSearchString);
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

    describe("#selectWinningMasterformat", () => {
        it('returns the masterformat with the highest score', () => {
            let potentialMatches = [
                {
                    "some-masterformat": 4,
                    "some-other-masterformat": 7
                },
                {
                    "some-masterformat": 4
                }
            ];
            let autoClassifier = new AutoClassifier("some-floor.csv");
            let answer = autoClassifier.selectWinningMasterformat(potentialMatches);
            expect(answer).to.eql("some-masterformat");
        });
    });
    describe("#makeWeightsByKeyword", async () => {
        it('transforms the CSV into something useful', () => {


            let autoClassifier = new AutoClassifier("some-floor.csv");
            autoClassifier.masterformatKeywords = [
                {
                    'Map ID': '',
                    'Division': '03',
                    'Code': '03 05 00',
                    'Level': '3',
                    'Description': 'Common Work Results for Concrete',
                    'Keyword 1': 'Concrete',
                    'Weight 1': '1',
                    'Keyword 2': '',
                    'Weight 2': '2',
                    'Keyword 3': '',
                    'Weight 3': '1',
                    'Keyword 4': '',
                    'Weight 4': '1',
                    'Keyword 5': '',
                    'Weight 5': '1'
                }
            ];
            autoClassifier.makeWeightsByKeyword();
            let output = {
                "Concrete":
                    {
                        '03 05 00': 1
                    }
            }
            expect(autoClassifier.weightsByKeyword).eql(output);
        });
    });
    describe("#autoClassify", () => {
        it("makes the masterformat field happy", async function () {
            let autoClassifier = new AutoClassifier("some-floor.csv");
            await autoClassifier.initialize();
            autoClassifier.autoClassify();
            autoClassifier.plannedBuildingElements.forEach(pbe => {
                expect(pbe.hasOwnProperty("masterformatCode")).to.eql(true);
            })
        });
    })
    describe("#writeToTsv", () => {
        it("writes our planned building elements to a tsv", async() => {
            let autoClassifier = new AutoClassifier("/tmp/some-floor.tsv");
            await autoClassifier.initialize();
            let outputTsv = autoClassifier.autoClassify();
            expect(outputTsv).to.contain("GUID")
        })
    });
});
