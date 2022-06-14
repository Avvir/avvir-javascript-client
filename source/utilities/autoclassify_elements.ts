import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';

const MasterFormatKeywordsTableName = "MasterFormat Keywords";
const MasterFormatKeywordsTableViewWithKeywords = "with keywords";
const masterFormatKeywordsKeys = ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"];
const masterFormatKeywordsWeights = ["Weight 1", "Weight 2", "Weight 3", "Weight 4", "Weight 5"];

const DefaultPropertiesTableName = "Default Properties";
const DefaultPropertiesPropertyName = "Property Name";
const DefaultPropertiesPropertyPriority = "Priority";

const ProjectCustomPropertiesTableName = "Project Custom Properties";

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

function AutoClassifier() {
    const base = useBase();

    const defaultPropertiesTable = base.getTableByNameIfExists(DefaultPropertiesTableName);
    const defaultPropertiesRecords = useRecords(defaultPropertiesTable);

    const masterFormatKeywordsTable = base.getTableByNameIfExists(MasterFormatKeywordsTableName);
    const masterFormatKeywordsTableView = masterFormatKeywordsTable.getViewByNameIfExists(MasterFormatKeywordsTableViewWithKeywords);
    const masterFormatKeywordsRecords = useRecords(masterFormatKeywordsTableView);

    const projectElementsDataTable = base.getTableByNameIfExists(ProjectElementsDataTableName);
    const projectElementsDataRecords = useRecords(projectElementsDataTable);

    function calculateScore(keywordsWithWeigths) {
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

    function autoClassify() {
        let t = timer("calculate scores");
        let i = 0, projectElementsDataRecordsLength = projectElementsDataRecords.length;
        while (i < projectElementsDataRecordsLength) {
            const projectElementDataRecord = projectElementsDataRecords[i];
            // console.log("Element: " + projectElementDataRecord.getCellValue("ItemName"));

            const matchingCodes = [];
            /*
                [
                    {
                        code: "23 11 07",
                        keywordsFoundInProperties: [
                            {keyword: "concrete", keywordWeight: 1},
                            {keyword: "rebar", keywordWeight: 0.75},
                        ],
                        calculatedScore: 0.875,
                    },
                    ...
                ]
            */

            let j = 0, defaultPropertjesRecordsLength = defaultPropertiesRecords.length;
            while (j < defaultPropertjesRecordsLength) {
                const propertyName = defaultPropertiesRecords[j].getCellValueAsString(DefaultPropertiesPropertyName);
                // get the corresponding model element property
                const elementPropertyValue = projectElementDataRecord.getCellValue(propertyName) ? projectElementDataRecord.getCellValueAsString(propertyName).toLowerCase() : null;

                if (elementPropertyValue && typeof (elementPropertyValue) === "string" && elementPropertyValue.length) {
                    // console.log("  Property " + propertyName + ": " + elementPropertyValue);
                    // console.log("    matching codes:");

                    // now search through MF records, which one has any keyword matching elementPropertyValue
                    let k = 0, masterFormatKeywordsRecordsLength = masterFormatKeywordsRecords.length;
                    while (k < masterFormatKeywordsRecordsLength) {
                        const masterFormatKeywordsRecord = masterFormatKeywordsRecords[k];
                        const masterFormatKeywordsRecordCode = masterFormatKeywordsRecord.getCellValueAsString("Code");

                        let l = 0, masterFormatKeywordsKeysLength = masterFormatKeywordsKeys.length;
                        while (l < masterFormatKeywordsKeysLength) {
                            const masterFormatKeywordsKey = masterFormatKeywordsKeys[l];
                            const keyword = masterFormatKeywordsRecord.getCellValueAsString(masterFormatKeywordsKey).toLowerCase();
                            const masterFormatKeywordsWeight = masterFormatKeywordsWeights[l]; // TODO log if this doesn't match
                            const keywordWeight = masterFormatKeywordsRecord.getCellValueAsString(masterFormatKeywordsWeight);
                            if (keyword && typeof (keyword) === "string" && keyword.length && elementPropertyValue.indexOf(keyword) > -1) {
                                // increment the score by number of matches and their weight
                                const weightedKeyword = {keyword: keyword, weight: keywordWeight};
                                const matchingCode = matchingCodes.find(match => {
                                    return match.code === masterFormatKeywordsRecordCode;
                                });
                                if (matchingCode) {
                                    const keywordFoundInProperties = matchingCode.keywordsFoundInProperties.find(keywordFound => {
                                        return keywordFound.keyword === keyword;
                                    });
                                    if (!keywordFoundInProperties) {
                                        matchingCode.keywordsFoundInProperties.push(weightedKeyword);
                                        matchingCode.score = calculateScore(matchingCode.keywordsFoundInProperties);
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
                                    matchingCodeInitial.score = calculateScore(matchingCodeInitial.keywordsFoundInProperties);
                                    matchingCodes.push(matchingCodeInitial);
                                }
                                ;
                            }
                            ;
                            l++;
                        }
                        ;
                        k++;
                    }
                    ;
                    // console.log(codesWithKeywordsMatchingPropertyValue);
                }
                ;
                j++;
            }
            ;
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
                if (projectElementsDataTable.hasPermissionToUpdateRecord(projectElementDataRecord, projectElementDataRecordFields)) {
                    projectElementsDataTable.updateRecordAsync(projectElementDataRecord, projectElementDataRecordFields);
                }
                ;
            }
            ;
            i++;
        }
        t.stop();
        return;
    };
}

