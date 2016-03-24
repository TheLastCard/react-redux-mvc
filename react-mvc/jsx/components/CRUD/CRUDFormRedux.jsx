
define(['redux', 'expect', 'CRUD/InputOptions'], function (Redux, expect, InputOptions) {

    const CRUDFormRedux = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CRUDFormRedux');
                var inputsCopy = action.list.slice();
                return inputsCopy.map(function (input) {
                    return setErrorInitState(setDefaults(input));
                });
            case 'INIT_UPDATE':
                console.log('INIT_UPDATE CRUDFormRedux');
                var itemCopy = Object.assign({}, action.item);
                var inputsCopy = state.slice();
                return inputsCopy.map(function (input) {
                    input.value = itemCopy[input.name];
                    return input;
                });
                break;
            case 'CHANGE':
                console.log('CHANGE CRUDFormRedux');
                var inputsCopy = state.slice();
                var input = inputsCopy[action.index];

                var newValue = action.event.target.value;

                if (input.type === InputOptions.Checkbox) {
                    var alternatives = [];
                    if (input.value) {
                        alternatives = input.value.slice();
                    }
                    alternatives.indexOf(newValue) > -1 ? alternatives.splice(alternatives.indexOf(newValue), 1) : alternatives.push(newValue);
                    input.value = alternatives;
                }
                else {
                    input.value = newValue;
                }
                if (input.hasError) {
                    validateInput(input);
                }
                return inputsCopy;
            case 'ONBLUR':
                console.log('ONBLUR CRUDFormRedux');
                var inputsCopy = state.slice();
                var input = inputsCopy[action.index];
                validateInput(input);
                return inputsCopy;
            case 'VALIDATE':
                console.log('VALIDATE CRUDFormRedux');
                var inputsCopy = state.slice();
                inputsCopy.map(function (input) {
                    validateInput(input);
                });
                return inputsCopy;
            case 'CLEAR':
                console.log('CLEAR CRUDFormRedux');
                var inputsCopy = state.slice();
                return inputsCopy.map(function (input) {
                    return setErrorInitState(setDefaults(resetInput(input)));
                });
            default:
                return [];
        }
    };

    const validateInput =(input) =>{
        input.hasError = false;

        if (!input.required ) {
            return input.hasError;
        }
        
        if (!input.value || input.value.length === 0) {
            input.hasError = true;
            return input.hasError;
        }

        if ((input.type === InputOptions.Radio || input.type === InputOptions.Checkbox)) {
            return input.hasError;
        }

        if (input.type === InputOptions.Select && input.alternatives.indexOf(input.value) === -1) {
            input.hasError = true;
            return input.hasError;
        }

        if (input.regex !== undefined && input.value) {
            var expression = new RegExp(input.regex);
            input.hasError = !expression.test(input.value);
        }

        return input.hasError;
    }

    const setErrorInitState = (input) => {
        input.hasError = false;
        return input;
    }

    const resetInput = (input) => {
        switch (input.type) {
            case InputOptions.TextArea:
                input.value = '';
                break;
            case InputOptions.Select:
                input.value = input.placeholder;
                break;
            default:
                input.value = null;
                break;
        }
        return input;
    }

    const setDefaults = (input) => {
        if (input.defaultValue) {
            if (Array.isArray(input.defaultValue)) {
                input.value = input.defaultValue.slice();
            }
            else {
                input.value = input.defaultValue;
            }
        }
        return input;
    }

    return Redux.createStore(CRUDFormRedux);
});