/*

Preprocessing to do:
    - Discard any masterformat keywords without keyword columns and discard (~ 6,400 records --> ~300 records)
        These should be keyed intelligently somehow (makeMasterformatKeysAsCode())
    - Get all project elements data into a list of objects.
    - Iterate through each row of projectElementsData and see if any values matches masterformat keywords
       - If so, add column to output; calculate score with existing function

 Input: Freetext (30,000 queries) --> Output (Masterformat (one of ~300 tagged masterformats) + Confidence Score)
Really just mashing up `masterformat-keywords-short` and `project-elements-data`
 */

import * as fs from 'fs';
import * as csv from 'fast-csv';


// Lookup table <-- this doesn't change between floors
const MasterFormatKeywordsTableName = "MasterFormat Keywords";
const MasterFormatKeywordsTableViewWithKeywords = "with keywords";
const masterFormatKeywordsKeys = ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"];
const masterFormatKeywordsWeights = ["Weight 1", "Weight 2", "Weight 3", "Weight 4", "Weight 5"];

// Source data for floor
const DefaultPropertiesTableName = "Default Properties";
const DefaultPropertiesPropertyName = "Property Name";
const DefaultPropertiesPropertyPriority = "Priority";
const ProjectCustomPropertiesTableName = "Project Custom Properties";

// Output data
const ProjectElementsDataTableName = "Project Elements Data";


export default class AutoClassifier {
    masterformatKeywords: any[];
    masterformatKeywordsByCode: any;
    columnsWeCareAbout: any[];
    projectElementsData: any[];
    hackResources: any;

    constructor(floorTsvFilename) {
        this.masterformatKeywords = [];
        this.columnsWeCareAbout = [];
        this.projectElementsData = [];
        this.masterformatKeywordsByCode = {};
        this.hackResources = {
            masterformatKeywords: __dirname + '/../../resources/masterformat-keywords-short.csv',
            columnsWeCareAbout: __dirname + '/../../resources/default-properties.csv',
            projectElementsData: __dirname + '/../../resources/project-elements-data.csv',
        }
    }

    private makeMasterformatsByCode = () => {
        this.masterformatKeywords.forEach( (row) => {
            this.masterformatKeywordsByCode[row['Code']] = row;
        });
    }

    async initialize() {

            await this.loadCsvFile(
                this.hackResources.masterformatKeywords,
                this.masterformatKeywords
            );
            await this.loadCsvFile(
                this.hackResources.columnsWeCareAbout,
                this.columnsWeCareAbout
            );
            await this.loadCsvFile(
                this.hackResources.projectElementsData,
                this.projectElementsData
            );

            this.makeMasterformatsByCode();
    }

    async loadCsvFile(filename, target) {
        return new Promise ((resolve, reject) => {
            fs.createReadStream(filename)
                .pipe(csv.parse({headers: true}))
                .on('error', error => console.error(error))
                .on('data', row => {
                    target.push(row);
                    // console.log(row);
                })
                .on('end', (rowCount: number) => {
                    console.log(`Parsed ${rowCount} rows`);
                    resolve(rowCount);
                });
        });
    }

    calculateScore(weights) {
        let score = 0;
        weights.forEach ( (curr) => {
            score += parseFloat(curr.weight);
        })
        return score / masterFormatKeywordsKeys.length;
    };

    findColumnValueInKeywords(searchString, weightsByKeyword) {
        let potentialMatches = []
        for (let keyword in weightsByKeyword) {
            if (searchString.indexOf(keyword) > -1) {
                potentialMatches.push(weightsByKeyword[keyword])
            }
        }
        return potentialMatches;
    };

    selectWinningMasterformat(potentialMatches) {
        let i = 0, n = potentialMatches.length;
        let masterformats = {}
        while (i < n) {
            let curr = Object.keys(potentialMatches[i]);
            curr.forEach(masterformat => {
                if (masterformats.hasOwnProperty(masterformat)) {
                    masterformats[masterformat] = masterformats[masterformat] + potentialMatches[i][masterformat];
                } else {
                    masterformats[masterformat] = potentialMatches[i][masterformat]
                }
            })
            i++;
        };
        let max_so_far = 0;
        let current_biggest;
        for (let masterformat in masterformats) {
            if (masterformats[masterformat] > max_so_far) {
                current_biggest = masterformat
                max_so_far = masterformats[masterformat]
            }
        };
        return current_biggest;
    };

    autoClassify() {
        // Project Elements Data == just the basic "PBE" information
        this.projectElementsData.forEach((pbe) => {
            const matchingCodes = [];
            // For Every Row in the "PBE", look at each of the columns called "default properties"
            this.columnsWeCareAbout.forEach((column) => {
                const elementPropertyValue = pbe[column].toLowerCase();
                // if there is an elementPropertyValue, iterate through masterformat-keywords-short to find it's weight
                // if (elementPropertyValue) {
                //     const matchingKeywor = this.findColumnValueInKeywords(elementPropertyValue);
                //     this.uniqueKeywords.foreach( (keyword) => {
                //        if keyword in elementPropertyValue
                //         matchingCodes.append( masterformatToWeightValueThingie )
                //     });
                // }
            });
            // pick best matching code for the PBE (i.e., highest score)
            pbe.masterformatCode = this.selectWinningMasterformat(matchingCodes);
        });
    }
}
