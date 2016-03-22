
define([], function () {

    const InputOptions = {
        Type: {
            Text: 'text',
            Url: 'url',
            TextArea: 'textarea',
            Select: 'select',
            Radio: 'radio',
            Password: 'password',
            Range: 'range',
            Number: 'number',
            Checkbox: 'checkbox'
        }
    }

    return InputOptions;
});