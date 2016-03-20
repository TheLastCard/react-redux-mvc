
define(['redux', 'expect'], function (Redux, expect) {

    const create = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CreateRedux');
                return action.list.slice();
            case 'CHANGE':
                console.log('CHANGE CreateRedux');
                var inputsCopy = state.slice();
                inputsCopy[action.index].value = action.event.target.value;
                return inputsCopy;
            case 'CLEAR':
                console.log('CLEAR CreateRedux');
                var inputsCopy = state.slice();
                for (var i = 0; i < inputsCopy.length; i++) {
                    if (inputsCopy[i].type !== 'textarea') {
                        inputsCopy[i].value = null;
                    }
                    inputsCopy[i].value = '';
                }
                console.log(inputsCopy);
                return inputsCopy;
            default:
                return [];
        }
    };
    return Redux.createStore(create);
});