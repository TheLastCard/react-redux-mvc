
define(['redux', 'expect'], function (Redux, expect) {

    const create = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CreateRedux');
                var inputsCopy = action.list.slice();
                return inputsCopy.map(function (input) {
                    return setDefaults(input);
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

            case 'CLEAR':
                console.log('CLEAR CreateRedux');
                var inputsCopy = state.slice();
                return inputsCopy.map(function (input) {
                    input.value = input.type === 'textarea' ? '' : null;                  
                    return setDefaults(input);
                });

            default:
                return [];
        }
    };

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