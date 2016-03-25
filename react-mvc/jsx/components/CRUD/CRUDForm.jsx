
//1#: Define inputs and add it to the CRUDForm component: <CRUDForm inputs={<inputs here>} />
//Generates input fields with label. Required structure for 'inputs':
//Note that not all properties are required, but at least label, name, type and alternatives(for checkbox and radio) is required
//[{
//    label: 'Label',
//    name: 'Name of the input field. Also used in the id of the html element unless if type is radio or checkbox. If type is radio or checkbox, this should be an array',
//    jsonName: 'Map name -> for CRUDRedux witch maps all input values to a json object. If this is null, "name" is used for fallback',
//    type: 'Type of input; number, text, url',
//    value: null, //'Initial value of the input field'
//    defaultValue: null, //Used for checkboxes and radio buttons. Checkboxes takes an array [] and radio buttons takes a string as defaultValue
//    alternatives: [  //Array of alternatives for select, radio and checkbox. If value is not defined, name is used as value instead
//                {
//                    name: 'Children',
//                    value: 'Value1'
//                },
//                {
//                    name: 'Young Adults',
//                    value: 'Value2'
//                }
//    ],
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

//2#: Define buttons and add it to the CRUDForm component: <CRUDForm buttons={<buttons here>} />
//Buttons. Required structure for 'buttons'
//[{
//    name: 'For example: Submit. Will be the label of the button',
//    action: (event, inputs, id) => CRUDRedux.dispatch({ type: 'UPDATE', event: event, inputs: inputs, id: id }), //Or 'CREATE' for create
//    clearFormAfterAction: 'If you want to clear the form after action has been run',
//    closeModalAfterAction: 'If you have spesified to use modal, set this to true in order to close modal after action. Closing modal triggers CLEAR on the form',
//    className: 'Classes to add to the div surrounding the input',
//    skipValidation: false, //Use this if you want to skip validation on button click. For example if you add a button to clear form
//    wrapperClassName: 'If you want to add a wrapper class to the div outside the button',
//}]

//3#: If you want the CRUDForm comoponent to act as an UPDATE form instead of CREATE, you need to specity an item like this:
//    <CRUDForm item={<item to edit here>} /> (dont worry, the system makes a copy of the item you supply so there is no direct editing)

//4#: If you want to have the create/update-form to appear inside a modal instead of just a form, you need to add a modal object
//    <CRUDForm modal={<modal options here>} />
//Example object:
//[{
//    openModalButtonText: 'Create new category',
//    openModalButtonClass : 'button success'
//}]

//5#: If you want debug to be activated you need to specify this on the Read component: <Read debug={true] />

//Example of how a <CRUDForm /> element could look like in the CRUD.jsx file. (CRUD.jsx acts as a parent to the other CRUD components)
//<CRUDForm inputs={self.state.formInputs} buttons={self.state.updateButtons} modal={self.state.updateModalOptions} item={item} debug={true} />


define(['react', 'CRUD/InputOptions', 'jsx!CRUD/CRUDFormRedux'], function (React,InputOptions, CRUDFormRedux) {
    var CRUDForm = React.createClass({
        modalId: '',
        getInitialState: function () {
            if (!this.props.inputs) {
                console.error('"inputs" is not defined. Did you forget to add it to the <CRUDForm /> component?');
            }
            if (!this.props.buttons) {
                console.error('"buttons" is not defined. Did you forget to add it to the <CRUDForm /> component?');
            }

            return {
                inputs: this.props.inputs,
                buttons: this.props.buttons
            }
        },
        componentWillMount: function () {
            this.modalId = '#CRUDFormModal' + Math.floor((Math.random() * 10000) + 1).toString();
        },
        componentDidMount: function () {
            CRUDFormRedux.dispatch({ type: 'INIT', list: this.state.inputs });
            if (this.props.modal) {
                $(this.modalId).foundation();
                return;
            }
            if (this.props.item) {
                CRUDFormRedux.dispatch({ type: 'INIT_UPDATE', event: event, item: this.props.item });
            }
        },
        onChangeHandler: function (event, index, callback) {
            CRUDFormRedux.dispatch({ type: 'CHANGE', event: event, index: index });
            if (callback) {
                callback(event, index);
            }
        },
        onBlurHandler: function (event, index) {
            CRUDFormRedux.dispatch({ type: 'ONBLUR', event: event, index: index });
        },
        buttonClickHandler: function (event, button, id) {
            event.preventDefault();
            var self = this;
            if (!this.formValidation() && !button.skipValidation) {
                return;
            }

            if (!button.action) {
                self.buttonDefaultActions(button);
            }

            var inputsCopy = this.state.inputs.slice();
            button.action(event, inputsCopy, id, () => { self.buttonDefaultActions(button) });
        },
        buttonDefaultActions: function (button) {
            var self = this;
            if (button.clearFormAfterAction && !button.closeModalAfterAction) {
                CRUDFormRedux.dispatch({ type: 'CLEAR' });
            }
            if (button.closeModalAfterAction && self.props.modal) {
                self.closeModal(self.modalId);
            }
        },
        formValidation: function () {
            CRUDFormRedux.dispatch({ type: 'VALIDATE' });
            var validation = true;
            for (var i = 0; i < this.state.inputs.length; i++) {
                validation = this.state.inputs[i].hasError ? false : validation;
            }
            return validation;
        },
        createLabel: function (input) {
            return (
                <label key={input.name + 'label' } htmlFor={input.name} className={input.labelClassName}>{input.label}</label>
            );
        },
        createErrorMessage: function (input) {
            var errorMessage = '';
            if (input.required || input.regex) {
                var message = input.errorMessage ? input.errorMessage : input.label + ' is required';
                var radioCheckboxErrorClass = input.type === InputOptions.Checkbox || input.type === InputOptions.Radio ? 'errorMessageRadioCheckbox' : 'errorMessage';
                errorMessage = (
                    <div className={input.hasError ? radioCheckboxErrorClass : radioCheckboxErrorClass + ' hide' }>{message}</div>
                );
            }
            return errorMessage;
        },
        createTextArea: function (input, index) {
            var self = this;
            return (
                <div key={input.name + 'classes'} className={input.wrapperClassName }>
                    {self.createLabel(input)}
                        <textarea key={input.name}
                                  id={input.id}
                                  name={input.name}
                                  value={input.value}
                                  disabled={input.disabled}
                                  className={input.labelClassName}
                                  onChange={(event) => self.onChangeHandler(event, index, input.onChange)}
                                  onBlur={(event) => self.onBlurHandler(event, index)
                        }></textarea>
                    {self.createErrorMessage(input)}
                </div>
            );
        },
        createCheckboxOrRadiobutton: function (input, index) {
            var self = this;
            if (self.props.debug) {
                if (!self.isSetupCorrect(input)) {
                    return null;
                }
            }

            var multipleChoices = [];
            input.alternatives.map(function (checkboxRadioOption, checkboxRadioIndex) {
                var value = checkboxRadioOption.value !== undefined && checkboxRadioOption.value !== null ? checkboxRadioOption.value : checkboxRadioOption.name;
                multipleChoices.push(
                    <input key={input.name + checkboxRadioIndex}
                           type={input.type}
                           id={checkboxRadioOption.name.trim()}
                           name={checkboxRadioOption.name.trim()}
                           value={value}
                           checked={input.value && (input.value.indexOf(value) !== -1 && input.type === InputOptions.Checkbox) || (input.value === value && input.type === InputOptions.Radio)}
                           className={input.labelClassName}
                           onChange={(event) => self.onChangeHandler(event, index, input.onChange)} />
                );
                multipleChoices.push(
                    <label key={checkboxRadioOption.name.trim()} htmlFor={checkboxRadioOption.name.trim() }>{checkboxRadioOption.name}</label>
                );
            });

            return (
                <fieldset key={input.label+'fieldset'} className={input.wrapperClassName}>
                    <legend key={input.label+'legend'}>{input.label}</legend>
                    { multipleChoices }
                    { self.createErrorMessage(input) }
                </fieldset>
            );
        },
        createSelectlist: function (input, index) {
            var self = this;
            var optionList = input.alternatives.map(function (selectAlternatives, selectIndex) {
                var value = selectAlternatives.value !== undefined && selectAlternatives.value !== null ? selectAlternatives.value : selectAlternatives.name;
                return (<option key={selectAlternatives + selectIndex} value={value }>{selectAlternatives.name}</option>);
            });

            return (
                <div key={input.name + 'classes'} className={input.wrapperClassName}>
                    { self.createLabel(input) }
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
                        {optionList}
                    </select>
                    { self.createErrorMessage(input) }
                </div>
            );
        },
        createSimpleInputfield: function (input, index) {
            var self = this;
            return (
                <div key={input.name + 'classes'} className={input.wrapperClassName}>
                    { self.createLabel(input) }
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
                    { self.createErrorMessage(input) }
                </div>
            );
        },
        createInputs: function () {
            var self = this;
            return this.state.inputs.map(function (input, index) {
                switch (input.type) {
                    case InputOptions.TextArea:
                        return self.createTextArea(input, index);
                        break;
                    case InputOptions.Radio:
                    case InputOptions.Checkbox:
                        return self.createCheckboxOrRadiobutton(input, index);
                        break;
                    case InputOptions.Select:
                        return self.createSelectlist(input, index);
                        break;
                    default:
                        return self.createSimpleInputfield(input, index);
                        break;
                }
            })
        },
        createButtons: function () {
            var self = this;
            var id = this.props.item ? this.props.item.id : null;
            return this.state.buttons.map(function (button) {
                return (
                    <div key={button.name + 'wrapper'} className={button.wrapperClassName }>
                        <button key={button.name} id={button.name} className={button.className}
                                onClick={(event) => self.buttonClickHandler(event, button, id)}>
                            {button.name}
                        </button>
                    </div>
                );
            });
        },
        render: function () {
            var self = this;
            var form = (
                <form>
                    <div className="row">
                        {self.createInputs()}
                    </div>
                    <div className="row">
                        {self.createButtons()}
                    </div>
                </form>
            );
            if (!this.props.modal) {
                return form;
            }
            return self.createModal(form);
        },
        createModal: function (form) {
            var self = this;
            return (
                <div className={this.props.className}>
                    <button className={self.props.modal.openModalButtonClass} onClick={() =>self.openModal(self.modalId) }>{!self.props.item ? (self.props.modal.openModalButtonText || 'New/Edit') : (self.props.modal.openModalButtonText || '')}</button>

                    <div className="reveal" id={self.modalId.replace('#', '')} data-reveal>
                        {self.createModalHeading()}
                        {form}
                        <button className="close-button" aria-label="Close reveal" type="button" onClick={() =>self.closeModal(self.modalId)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            );
        },
        createModalHeading: function(){
            var self = this;
            if (self.props.modal && self.props.modal.modalHeading) {
                return (<h2 className={self.props.modal.modalHeadingClass}>{self.props.modal.modalHeading}</h2>);
            }
            return null;
        },
        openModal: function (id) {
            $(id).foundation('open');
            if (!this.props.item) {
                return;
            }
            CRUDFormRedux.dispatch({ type: 'INIT_UPDATE', event: event, item: this.props.item });
        },
        closeModal: function (id) {
            $(id).foundation('close');
            CRUDFormRedux.dispatch({ type: 'CLEAR' });
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
            if (!input.alternatives[0].name) {
                console.error(input.type + ' : ' + input.name + '-> Alternatives is not defined correctly! Should be an array of objects like this:');
                console.error('alternatives: [{name: "somename", value: "this one is optional with name as fallback"}]');
            }

            if ((input.type === InputOptions.Checkbox) && input.defaultValue) {
                if (!Array.isArray(input.defaultValue)) {
                    console.error(input.type + ' : ' + input.name + '-> "defaultValue" should be an array!');
                    return false;
                }
                for (var i = 0; i < input.defaultValue.length; i++) {
                    var found = false;
                    input.alternatives.map(function (alternative) {
                        if(alternative.name === input.defaultValue[i] || alternative.value === input.defaultValue[i]){
                            found = true;
                        }
                    });
                    if (!found) {
                        console.error('Checkbox ' + input.name + '-> "defaultValue" does not exist in "alternatives"');
                        return false;
                    }
                }
            }
            return true;
        }
    });

    return CRUDForm;
});