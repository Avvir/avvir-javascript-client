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

    autoClassify() {
        // Project Elements Data == just the basic "PBE" information
        this.projectElementsData.forEach( (pbe) => {
            const matchingCodes = [];
            // For Every Row in the "PBE", look at each of the columns called "default properties"
            this.columnsWeCareAbout.forEach((column) => {
                const elementPropertyValue = pbe[column].toLowerCase();
                // see if any keywords are present in that value
                if (elementPropertyValue.indexOf(keyword) > -1 &&
                    this.masterformatKeywordsByCode.hasOwnProperty(keyword)) {
                    // add to matchingCodes
                }
            });
            // pick best matching code for the PBE (i.e., highest score)
            // append that code to the PBE record and keep going.
        });
                const propertyName = column[DefaultPropertiesPropertyName];
                // get the corresponding model element property


                if (elementPropertyValue) {
                    // now search through MF records, which one has any keyword matching elementPropertyValue
                    // This should be rewritten as a hash lookup to run in O(1) not O(n)


                    let k = 0;
                    let masterFormatKeywordsRecordsLength = this.masterformatKeywords.length;
                    while (k < masterFormatKeywordsRecordsLength) {
                        const masterFormatKeywordsRecord = this.masterformatKeywords[k];
                        const masterFormatKeywordsRecordCode = masterFormatKeywordsRecord["Code"];

                        let l = 0, masterFormatKeywordsKeysLength = masterFormatKeywordsKeys.length;
                        while (l < masterFormatKeywordsKeysLength) {
                            const masterFormatKeywordsKey = masterFormatKeywordsKeys[l];
                            const keyword = masterFormatKeywordsRecord[masterFormatKeywordsKey].toLowerCase();
                            const masterFormatKeywordsWeight = masterFormatKeywordsWeights[l]; // TODO log if this doesn't match
                            const keywordWeight = masterFormatKeywordsRecord[masterFormatKeywordsWeight];
                            if (
                                    keyword &&
                                    elementPropertyValue.indexOf(keyword) > -1 &&
                                    this.masterformatKeywordsByCode.hasOwnProperty(keyword)
                            ) {
                                // increment the score by number of matches and their weight
                                const weightedKeyword = {keyword: keyword, weight: keywordWeight};
                                // if matchingcode is in some array
                                // const matchingCode = matchingCodes.find(match => {
                                //     return match.code === masterFormatKeywordsRecordCode;
                                // });
                                // if (matchingCode) {
                                    const keywordFoundInProperties = matchingCode.keywordsFoundInProperties.find(keywordFound => {
                                        return keywordFound.keyword === keyword;
                                    });
                                    if (!keywordFoundInProperties) {
                                        matchingCode.keywordsFoundInProperties.push(weightedKeyword);
                                        matchingCode.score = this.calculateScore(matchingCode.keywordsFoundInProperties);
                                    }
                            } else {
                                    const matchingCodeInitial = {
                                        id: masterFormatKeywordsRecord.id,
                                        code: masterFormatKeywordsRecordCode,
                                        keywordsFoundInProperties: [
                                            weightedKeyword,
                                        ],
                                        score: 0,
                                    }
                                    matchingCodeInitial.score = this.calculateScore(matchingCodeInitial.keywordsFoundInProperties);
                                    matchingCodes.push(matchingCodeInitial);
                                };
                            };
                            l++;
                        };
                        k++;
                    };
                    // console.log(codesWithKeywordsMatchingPropertyValue);
            });
            };
            if (matchingCodes.length) {
                console.log("Element: " + projectElementDataRecord.getCellValue("ItemName"));
                console.log(matchingCodes);
                const bestMatchingCode =
                    matchingCodes.sort((a, b) => {
                        return b.score - a.score;
                    })[0];
                const projectElementDataRecordFields = {
                    "MasterFormat Keywords": [{id: bestMatchingCode.id}],
                };
                    this.projectElementsData.push(projectElementDataRecord, projectElementDataRecordFields);

            };
            i++;
        }

        return;
    };

}
