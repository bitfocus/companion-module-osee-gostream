
//Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateRecordVariables = exports.updatePlayStatedVariables = exports.variables = void 0;
const enums_1 = require(/*! ./enums */ "./enums.js");
const choices_1 = require(/*! ./choices */ "./choices.js");
function variables(_self) {
    const variables = [];
    const values = {};
    variables.push({
        name: 'IP address of GoStreamDeck',
        variableId: `device_ip`,
    });
    values['device_ip'] = _self.config.host;
    let MeChoice = (0, choices_1.getChoices)(enums_1.ActionType.Preview);
    for (let i = 0; i < MeChoice.length; i++) {
        variables.push({
            name: `Id of input_${i + 1}`,
            variableId: `pre${i + 1}_input_id`,
        });
        values[`pre${i + 1}_input_id`] = MeChoice[i].label;
    }
    variables.push({
        name: 'Play State of PlayBack',
        variableId: `PlayState`,
    });
    values['PlayState'] = 'Play';
    variables.push({
        name: 'Loaded video file',
        variableId: `PlayFile`,
    });
    values['PlayFile'] = '';
    variables.push({
        name: 'Recording duration (hh:mm)',
        variableId: 'record_duration_hm',
    });
    values['record_duration_hm'] = '00:00:00';
    _self.setVariableDefinitions(variables);
    _self.setVariableValues(values);
}
exports.variables = variables;
function updatePlayStatedVariables(_self, state) {
    const newValues = {};
    if (state)
        newValues['PlayState'] = 'Stop';
    else
        newValues['PlayState'] = 'Play';
    _self.setVariableValues(newValues);
}
exports.updatePlayStatedVariables = updatePlayStatedVariables;

function updatePlayFileVariables(_self, file) {
    const newValues = {};
    newValues['PlayFile'] = file;
    _self.setVariableValues(newValues);
}
exports.updatePlayFileVariables = updatePlayFileVariables;
    
function updateRecordVariables(_self, time) {
    const newValues = {};
    newValues['record_duration_hm'] = time;
    _self.setVariableValues(newValues);
}
exports.updateRecordVariables = updateRecordVariables;
//# sourceMappingURL=variables.js.map

//# sourceURL=webpack://osee-gostreamdeck/./dist/variables.js?
