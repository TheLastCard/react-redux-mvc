

//Generates input fields with label. Required structure for 'inputs':
//[{
//    label: 'Label',
//    name: 'Name of the inpuf field. Also used ad id',
//    type: 'Type of input; number, text, url',
//    className: 'Classes to add to the div surrounding the input',
//    placeholder: 'Placeholder text if any'
//}]

//Buttons. Required structure for 'buttons'
//[{
//    name: 'For example: Submit. Will be the label of the button',
//    action: 'Action to lock to',
//    className: 'Classes to add to the div surrounding the input',
//    wrapperClassName: 'If you want to add a wrapper class to the div outside the button'
//}]


define(['react'], function (React) {
    var Add = React.createClass({
        getInitialState: function () {
            return {
                inputs: this.props.inputs,
                buttons: this.props.buttons
            }
        },
        onChangeHandler: function (event, index, callback) {
            callback(event, index);
        },
        render: function () {
            var self = this;
            return (
                <div>
                    <div className="row">
                        {this.state.inputs.map(function (input, index) {
                            if (input.type !== 'textarea') {
                                return (
                                    <div key={input.name+'classes'} className={input.className}>
                                        <label key={input.name+'label'} htmlFor={input.name}>{input.label}</label>
                                        <input key={input.name} id={input.id} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} onChange={(event) => self.onChangeHandler(event, index, input.onChange)} />
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={input.name+'classes'} className={input.className}>
                                        <label key={input.name+'label'} htmlFor={input.name}>{input.label}</label>
                                        <textarea key={input.name} id={input.id} name={input.name} value={input.value} onChange={(event) => AddRedux.dispatch({ type: 'CHANGE', event: event, index: index })}>{input.placeholder}</textarea>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="row">
                        {this.state.buttons.map(function (button) {
                            return (
                                <div key={button.name+'wrapper'} className={button.wrapperClassName}>
                                    <button key={button.name} id={button.name} className={button.className} onClick={button.action}>{button.name}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    });

    return Add;
});