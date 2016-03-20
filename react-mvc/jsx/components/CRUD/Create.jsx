

//Generates input fields with label. Required structure for 'inputs':
//[{
//    label: 'Label',
//    name: 'Name of the inpuf field. Also used in the id of the html element',
//    jsonName: 'Map name -> for CRUDRedux witch maps all input values to a json object',
//    type: 'Type of input; number, text, url',
//    value: null, //'Initial value of the input field'
//    checked: null,
//    disabled: null,
//    //onChange : Here you can for example define an additional redux dispatcher which
//    //           will be called back with event and index of the field as paramters on input change'.
//    onChange: (event, index) =>MockRedux.dispatch({ type: 'CHANGE', event: event, index: index })
//    placeholder: 'Placeholder text if any. For textare this will ignored but you can use "value" if you want initiate a text in the textarea,
//    wrapperClassName: 'Classes to add to the div surrounding the input',
//    labelClassName: 'Classes to add to the label',
//    inputClassName: 'Classes to add to the input'
//}]

//Buttons. Required structure for 'buttons'
//[{
//    name: 'For example: Submit. Will be the label of the button',
//    action: 'Action. Can be null',
//    clearFormAfterAction: 'If you want to clear the form after action has been run'
//    className: 'Classes to add to the div surrounding the input',
//    wrapperClassName: 'If you want to add a wrapper class to the div outside the button',
//}]


define(['react', 'jsx!CRUD/CreateRedux'], function (React, CreateRedux) {
    var Create = React.createClass({
        getInitialState: function () {
            if (!this.props.inputs) {
                console.error('"inputs" is not defined. Did you forget to add it to the <Create /> component?');
            }
            if (!this.props.buttons) {
                console.error('"buttons" is not defined. Did you forget to add it to the <Create /> component?');
            }

            return {
                inputs: this.props.inputs,
                buttons: this.props.buttons
            }
        },
        onChangeHandler: function (event, index, callback) {
            CreateRedux.dispatch({ type: 'CHANGE', event: event, index: index });
            if (callback) {
                callback(event, index);
            }
        },
        buttonClickHanlder: function (event, clear, callback) {
            event.preventDefault();
            if (callback) {
                var inputsCopy = this.state.inputs.slice();
                callback(event, inputsCopy);
            }
            if (clear) {
                CreateRedux.dispatch({ type: 'CLEAR' });
            }
        },
        componentDidMount: function () {
            CreateRedux.dispatch({ type: 'INIT', list: this.state.inputs });
        },
        render: function () {
            var self = this;
            return (
                <form>
                    <div className="row">
                        {this.state.inputs.map(function (input, index) {
                            switch (input.type) {
                                case 'textarea':
                                    return (
                                        <div key={input.name + 'classes'} className={input.wrapperClassName}>
                                            <label key={input.name+'label'}
                                                   htmlFor={input.name}>{input.label}</label>

                                             <textarea key={input.name}
                                                       id={input.id}
                                                       name={input.name}
                                                       value={input.value}
                                                       disabled={input.disabled}
                                                       onChange={(event) => self.onChangeHandler(event, index, input.onChange)}></textarea>
                                        </div>
                                    );
                                    break;
                                default:
                                    return (
                                        <div key={input.name + 'classes'} className={input.wrapperClassName}>
                                            <label key={input.name + 'label'}
                                                   htmlFor={input.name}
                                                   className={input.labelClassName}>{input.label}</label>

                                             <input key={input.name}
                                                    id={input.id}
                                                    type={input.type}
                                                    name={input.name}
                                                    placeholder={input.placeholder}
                                                    value={input.value}
                                                    disabled={input.disabled}
                                                    checked={input.type === 'checkbox' || input.type === 'radio' ? '' : input.checked}
                                                    className={input.labelClassName}
                                                    onChange={(event) => self.onChangeHandler(event, index, input.onChange)} />
                                        </div>
                                    );
                                    break;
                            }
                        })}
                    </div>
                    <div className="row">
                        {this.state.buttons.map(function (button) {
                            return (
                                <div key={button.name+'wrapper'} className={button.wrapperClassName}>
                                    <button key={button.name}
                                            id={button.name}
                                            className={button.className}
                                            onClick={(event) => self.buttonClickHanlder(event, button.clearFormAfterAction, button.action )}>
                                        {button.name}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </form>
            );
        }
    });

    return Create;
});