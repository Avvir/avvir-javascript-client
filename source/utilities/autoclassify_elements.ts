/*

Preprocessing to do:
    - Discard any masterformat keywords without keyword columns and discard (~ 6,400 records --> ~300 records)
        These should be keyed intelligently somehow (makeMasterformatKeysAsCode())
    - Get all project elements data into a list of objects.
    - Iterate through each row of projectElementsData and see if any values matches masterformat keywords
       - If so, add column to output; calculate score with existing function

 Input: Freetext (30,000 queries) --> Output (Masterformat (one of ~300 tagged masterformats) + Confidence Score)
 */






import * as fs from 'fs';
import * as path from 'path';
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

var timer = function (name) {
    var start = new Date();
    return {
        stop: function () {
            var end = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};

function timeout(func) {
    return new Promise(resolve => setTimeout(resolve, func));
}

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
            masterformatKeywords: __dirname + '/../../resources/masterformat-keywords.csv',
            defaultProperties: __dirname + '/../../resources/default-properties.csv',
            projectElementsData: __dirname + '/../../resources/project-elements-data.csv',
        }
    }

    private makeMasterformatsByCode = () => {
        this.masterformatKeywords.forEach( (row) => {
            this.masterformatKeywordsByCode[row['Code']] = row;
        });
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
                // .on('close', (target) => {
                //     resolve(target);
                // })
        });
    }
    // const base = useBase();
    //
    // const defaultPropertiesTable = base.getTableByNameIfExists(DefaultPropertiesTableName);
    // const defaultPropertiesRecords = useRecords(defaultPropertiesTable);
    //
    // const masterFormatKeywordsTable = base.getTableByNameIfExists(MasterFormatKeywordsTableName);
    // const masterFormatKeywordsTableView = masterFormatKeywordsTable.getViewByNameIfExists(MasterFormatKeywordsTableViewWithKeywords);
    // const masterFormatKeywordsRecords = useRecords(masterFormatKeywordsTableView);
    //
    // const projectElementsDataTable = base.getTableByNameIfExists(ProjectElementsDataTableName);
    // const projectElementsDataRecords = useRecords(projectElementsDataTable);

    calculateScore(keywordsWithWeigths) {
        let score = 0;
        let h = 0, keywordsWithWeightsLength = keywordsWithWeigths.length;
        while (h < keywordsWithWeightsLength) {
            const keywordWithWeight = keywordsWithWeigths[h];
            score += parseFloat(keywordWithWeight.weight);
            h++;
        }
        ;
        return score / masterFormatKeywordsKeys.length;
    };

    // autoClassify() {
    //     this.makeMasterformatsByCode();
    //     let t = timer("calculate scores");
    //     // Project Elements Data == just the basic "PBE" information
    //     let i = 0, projectElementsDataRecordsLength = this.projectElementsData.length
    //     while (i < projectElementsDataRecordsLength) {
    //         const projectElementDataRecord = this.projectElementsData[i];
    //         const matchingCodes = [];
    //         // For Every Row in the "PBE", look at each of the columns called "default properties"
    //         this.columnsWeCareAbout.forEach( (column) => {
    //             const propertyName = column[DefaultPropertiesPropertyName];
    //             // get the corresponding model element property
    //             const elementPropertyValue = projectElementDataRecord[propertyName] ? projectElementDataRecord[propertyName].toLowerCase() : null;
    //
    //             if (elementPropertyValue) {
    //                 // now search through MF records, which one has any keyword matching elementPropertyValue
    //                 // This should be rewritten as a hash lookup to run in O(1) not O(n)
    //
    //
    //                 let k = 0;
    //                 let masterFormatKeywordsRecordsLength = this.masterformatKeywords.length;
    //                 while (k < masterFormatKeywordsRecordsLength) {
    //                     const masterFormatKeywordsRecord = this.masterformatKeywords[k];
    //                     const masterFormatKeywordsRecordCode = masterFormatKeywordsRecord["Code"];
    //
    //                     let l = 0, masterFormatKeywordsKeysLength = masterFormatKeywordsKeys.length;
    //                     while (l < masterFormatKeywordsKeysLength) {
    //                         const masterFormatKeywordsKey = masterFormatKeywordsKeys[l];
    //                         const keyword = masterFormatKeywordsRecord[masterFormatKeywordsKey].toLowerCase();
    //                         const masterFormatKeywordsWeight = masterFormatKeywordsWeights[l]; // TODO log if this doesn't match
    //                         const keywordWeight = masterFormatKeywordsRecord[masterFormatKeywordsWeight];
    //                         if (
    //                                 keyword &&
    //                                 elementPropertyValue.indexOf(keyword) > -1 &&
    //                                 this.masterformatKeywordsByCode.hasOwnProperty(keyword)
    //                         ) {
    //                             // increment the score by number of matches and their weight
    //                             const weightedKeyword = {keyword: keyword, weight: keywordWeight};
    //                             // if matchingcode is in some array
    //                             // const matchingCode = matchingCodes.find(match => {
    //                             //     return match.code === masterFormatKeywordsRecordCode;
    //                             // });
    //                             // if (matchingCode) {
    //                                 const keywordFoundInProperties = matchingCode.keywordsFoundInProperties.find(keywordFound => {
    //                                     return keywordFound.keyword === keyword;
    //                                 });
    //                                 if (!keywordFoundInProperties) {
    //                                     matchingCode.keywordsFoundInProperties.push(weightedKeyword);
    //                                     matchingCode.score = this.calculateScore(matchingCode.keywordsFoundInProperties);
    //                                 }
    //                         } else {
    //                                 const matchingCodeInitial = {
    //                                     id: masterFormatKeywordsRecord.id,
    //                                     code: masterFormatKeywordsRecordCode,
    //                                     keywordsFoundInProperties: [
    //                                         weightedKeyword,
    //                                     ],
    //                                     score: 0,
    //                                 }
    //                                 matchingCodeInitial.score = this.calculateScore(matchingCodeInitial.keywordsFoundInProperties);
    //                                 matchingCodes.push(matchingCodeInitial);
    //                             };
    //                         };
    //                         l++;
    //                     };
    //                     k++;
    //                 };
    //                 // console.log(codesWithKeywordsMatchingPropertyValue);
    //         });
    //         };
    //         if (matchingCodes.length) {
    //             console.log("Element: " + projectElementDataRecord.getCellValue("ItemName"));
    //             console.log(matchingCodes);
    //             const bestMatchingCode =
    //                 matchingCodes.sort((a, b) => {
    //                     return b.score - a.score;
    //                 })[0];
    //             const projectElementDataRecordFields = {
    //                 "MasterFormat Keywords": [{id: bestMatchingCode.id}],
    //             };
    //                 this.projectElementsData.push(projectElementDataRecord, projectElementDataRecordFields);
    //
    //         };
    //         i++;
    //     }
    //     t.stop();
    //     return;
    // };

}
