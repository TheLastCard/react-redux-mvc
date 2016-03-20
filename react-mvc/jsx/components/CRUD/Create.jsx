

//Generates input fields with label. Required structure for 'inputs':
//Note that not all properties are required, but at least label, name, jsonName, type and alternatives(for checkbox and radio) is required
//[{
//    label: 'Label',
//    name: 'Name of the input field. Also used in the id of the html element unless if type is radio or checkbox. If type is radio or checkbox, this should be an array',
//    jsonName: 'Map name -> for CRUDRedux witch maps all input values to a json object',
//    type: 'Type of input; number, text, url',
//    value: null, //'Initial value of the input field'
//    defaultValue: null, //Used for checkboxes and radio buttons. Checkboxes takes an array [] and radio buttons takes a string as defaultValue
//    alternatives: null, //Array of alternatives for select, radio and checkbox
//    checked: null,
//    disabled: null,
//    //onChange : Here you can for example define an additional redux dispatcher which
//    //           will be called back with event and index of the field as paramters on input change'.
//    onChange: (event, index) =>MockRedux.dispatch({ type: 'CHANGE', event: event, index: index }),
//    placeholder: 'Placeholder text if any. Acts as default selected if using a select list. For textarea, radio and checkbox this will ignored but you can use "value" if you want initiate a text in the textarea',
//    wrapperClassName: 'Classes to add to the div surrounding the input',
//    labelClassName: 'Classes to add to the label',
//    inputClassName: 'Classes to add to the input',
//    maxValue: 100, //Only used for range slider
//    minValue: 0, //Only used for range slider,
//    required: true, //Set to true if input is required
//    errorMessage: 'Type in an error message. (Has fallback to a more generic error message)',
//    regex: '^[a-zA-Z]{3}$' //Regex string to test against. Ignored for radio or checkbox
//}]

//Buttons. Required structure for 'buttons'
//[{
//    name: 'For example: Submit. Will be the label of the button',
//    action: 'Action. Can be null',
//    clearFormAfterAction: 'If you want to clear the form after action has been run',
//    closeModalAfterAction: 'If you have spesified to use modal, set this to true in order to close modal after action',
//    className: 'Classes to add to the div surrounding the input',
//    skipValidation: false, //Use this if you want to skip validation on button click. For example if you add a button to clear form
//    wrapperClassName: 'If you want to add a wrapper class to the div outside the button',
//}]

//Modal. If you want the create form inside a modal, you need to specify the modal object aswell
//[{
//    buttonText: 'Create new category'
//}]

//Debug. Set to true to enable console log and checks around problems with radio buttons and checkboxes

//Example of element as writting in the parent container
//<Create inputs={this.state.inputs} buttons={this.state.buttons} modal={this.state.modalOptions} debug={true}/>


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
        onBlurHandler: function (event, index) {
            CreateRedux.dispatch({ type: 'ONBLUR', event: event, index: index });
        },
        buttonClickHanlder: function (event, button) {
            event.preventDefault();

            if (!this.formValidation() && !button.skipValidation) {
                return;
            }

            if (button.action) {
                var inputsCopy = this.state.inputs.slice();
                button.action(event, inputsCopy);
            }
            if (button.clearFormAfterAction) {
                CreateRedux.dispatch({ type: 'CLEAR' });
            }
            if (button.closeModalAfterAction) {
                this.closeModal('#createModal');
            }
        },
        formValidation: function () {
            CreateRedux.dispatch({ type: 'VALIDATE' });
            var validation = true;
            for (var i = 0; i < this.state.inputs.length; i++) {
                validation = this.state.inputs[i].hasError ? false : validation;
            }
            return validation;
        },
        componentDidMount: function () {
            CreateRedux.dispatch({ type: 'INIT', list: this.state.inputs });
            $(document).foundation();
        },
        render: function () {
            var self = this;
            var form = (
                <form>
                    <div className="row">
                        {this.state.inputs.map(function (input, index) {
                            var label = (
                                <label key={input.name + 'label' }
                                       htmlFor={input.name}
                                       className={input.labelClassName}>{input.label}</label>
                            );

                            var errorMessage = '';
                            if (input.required || input.regex) {
                                var message = input.errorMessage ? input.errorMessage : input.label + ' is required';
                                errorMessage = (
                                    <div className={input.hasError ? 'errorMessage' : 'errorMessage hide' }>{message}</div>
                                );
                            }

                            switch (input.type) {
                                case 'textarea':
                                    return (
                                        <div key={input.name + 'classes'} className={input.wrapperClassName}>
                                            { label }
                                             <textarea key={input.name}
                                                       id={input.id}
                                                       name={input.name}
                                                       value={input.value}
                                                       disabled={input.disabled}
                                                       className={input.labelClassName}
                                                       onChange={(event) => self.onChangeHandler(event, index, input.onChange)}
                                                       onBlur={(event) => self.onBlurHandler(event, index)}></textarea>
                                            { errorMessage }
                                        </div>
                                    );
                                    break;
                                case 'radio':
                                case 'checkbox':
                                    if (self.props.debug) {
                                        if (!self.isSetupCorrect(input)) {
                                            return null;
                                        }
                                    }

                                    var multiInputs = [];
                                    input.alternatives.map(function (checkboxRadioOption, checkboxRadioIndex) {
                                        multiInputs.push(
                                            <input key={input.name + checkboxRadioIndex}
                                                   type={input.type}
                                                   id={checkboxRadioOption.trim()}
                                                   name={checkboxRadioOption.trim()}
                                                   value={checkboxRadioOption}
                                                   checked={input.value && (input.value.indexOf(checkboxRadioOption) !== -1 && input.type === "checkbox") || (input.value === checkboxRadioOption && input.type === "radio")}
                                                   className={input.labelClassName}
                                                   onChange={(event) => self.onChangeHandler(event, index, input.onChange)}/>
                                            );
                                        multiInputs.push(
                                            <label key={checkboxRadioOption.trim()} htmlFor={checkboxRadioOption.trim() }>{checkboxRadioOption}</label>
                                            );
                                    });
                                    return (
                                        <fieldset key={input.label+'fieldset'} className={input.wrapperClassName}>
                                            <legend key={input.label+'legend'}>{input.label}</legend>
                                            { multiInputs }
                                            { errorMessage }
                                        </fieldset>
                                        );
                                    break;
                                case 'select':
                                    var alternativesHTML = input.alternatives.map(function (selectAlternatives, selectIndex) {
                                        return (
                                            <option key={selectAlternatives + selectIndex} value={selectAlternatives }>{selectAlternatives}</option>
                                        );
                                    });

                                    return (
                                        <div key={input.name + 'classes'} className={input.wrapperClassName}>
                                            { label }
                                            <select key={input.name}
                                                    id={input.name}
                                                    type={input.type}
                                                    name={input.name}
                                                    value={input.value}
                                                    disabled={input.disabled}
                                                    className={input.labelClassName}
                                                    onChange={(event) => self.onChangeHandler(event, index, input.onChange)}
                                                    onBlur={(event) => self.onBlurHandler(event, index)}
                                                    defaultValue={input.placeholder}>
                                                <option disabled value={input.placeholder}>{input.placeholder}</option>
                                                {alternativesHTML}
                                            </select>
                                            { errorMessage }
                                        </div>
                                    );
                                    break;
                                default:
                                    return (
                                        <div key={input.name + 'classes'} className={input.wrapperClassName}>
                                            { label }
                                             <input key={input.name}
                                                    id={input.name}
                                                    type={input.type}
                                                    name={input.name}
                                                    placeholder={input.placeholder}
                                                    value={input.value}
                                                    disabled={input.disabled}
                                                    className={input.labelClassName}
                                                    onChange={(event) => self.onChangeHandler(event, index, input.onChange)}
                                                    onBlur={(event) => self.onBlurHandler(event, index)}
                                                    max={input.maxValue}
                                                    min={input.minValue}
                                                    required={input.required} />
                                            { errorMessage }
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
                                            onClick={(event) => self.buttonClickHanlder(event, button )}>
                                        {button.name}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </form>
            );

            if (!this.props.modal) {
                return form;
            }

            return (
                <div>
                    <button className="button success" onClick={() =>self.openModal('#createModal') }>{this.props.buttonText || 'Create new'}</button>

                    <div className="reveal" id="createModal" data-reveal>
                        {form}
                        <button className="close-button" aria-label="Close reveal" type="button" onClick={() =>self.closeModal('#createModal')}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            );

        },
        openModal: function (id) {
            $(id).foundation('open');
        },
        closeModal: function (id) {
            $(id).foundation('close');
            CreateRedux.dispatch({ type: 'CLEAR' });
        },
        isSetupCorrect: function (input) {
            if (input.checked || Array.isArray(input.checked)) {
                console.error(input.type + ' : ' + input.name + '-> Trying to make something checked by default? Default values can be set by using defaultValue, f.ex with an array of strings for checkbox or a single string for radio buttons');
                return false;
            }
            if (input.type === 'radio' && input.defaultValue && typeof input.defaultValue !== "string") {
                console.error(input.type + ' : ' + input.name + '-> Radio button defaultValue should be a string!');
                return false;
            }

            if (!input.alternatives || !Array.isArray(input.alternatives)) {
                console.error(input.type + ' : ' + input.name + '-> Alternatives is not set or is not an array!');
                return false;
            }

            if ((input.type === 'checkbox') && input.defaultValue) {
                if (!Array.isArray(input.defaultValue)) {
                    console.error(input.type + ' : ' + input.name + '-> "defaultValue" should be an array!');
                    return false;
                }
                for (var i = 0; i < input.defaultValue.length; i++) {
                    if (input.alternatives.indexOf(input.defaultValue[i]) === -1) {
                        console.error('Checkbox ' + input.name + '-> "defaultValue" does not exist in "alternatives"');
                        return false;
                    }
                }
            }
            return true;
        }
    });

    return Create;
});