
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

                var inputType = action.event.target.type;
                var inputValue = action.event.target.value;

                if (inputType === 'checkbox') {
                    var valueArray = [];
                    if (inputsCopy[action.index].value) {
                        valueArray = inputsCopy[action.index].value;
                    }
                    valueArray.indexOf(inputValue) > -1 ? valueArray.splice(valueArray.indexOf(inputValue), 1) : valueArray.push(inputValue);
                    inputsCopy[action.index].value = valueArray;
                }
                else {
                    inputsCopy[action.index].value = inputValue;
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
                    validateInput(input, true);
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

    const validateInput =(input, all) =>{
        input.hasError = false;

        if (!input.required || (!all && input.type === 'radio' || input.type === 'checkbox')) {
            return inputsCopy;
        }

        if (!input.value) {
            input.hasError = true;
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