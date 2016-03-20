
define(['redux', 'expect'], function (Redux, expect) {

    const create = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CreateRedux');
                var inputsCopy = action.list.slice();
                return inputsCopy.map(function (input) {
                    return setErrorInitState(setDefaults(input));
                });
            case 'CHANGE':
                console.log('CHANGE CreateRedux');
                var inputsCopy = state.slice();
                var input = inputsCopy[action.index];

                var newValue = action.event.target.value;

                if (input.type === 'checkbox') {
                    var alternatives = [];
                    if (input.value) {
                        alternatives = input.value;
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
                console.log('ONBLUR CreateRedux');
                var inputsCopy = state.slice();
                var input = inputsCopy[action.index];
                validateInput(input);
                return inputsCopy;
            case 'VALIDATE':
                console.log('VALIDATE CreateRedux');
                var inputsCopy = state.slice();
                inputsCopy.map(function (input) {
                    validateInput(input);
                });
                return inputsCopy;
            case 'CLEAR':
                console.log('CLEAR CreateRedux');
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

        if ((input.type === 'radio' || input.type === 'checkbox')) {
            return input.hasError;
        }

        if (input.type === 'select' && input.alternatives.indexOf(input.value) === -1) {
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
            case 'textarea':
                input.value = '';
                break;
            case 'select':
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

    return Redux.createStore(create);
});