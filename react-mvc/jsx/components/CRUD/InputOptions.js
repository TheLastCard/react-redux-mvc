
define([], function () {

    //Note that right now, even most of these inputs is supported it may only be partial. F.ex there is no support for file validation atm
    const InputOptions = {
        Text: 'text',
        Url: 'url',
        TextArea: 'textarea',
        Select: 'select',
        Radio: 'radio',
        Password: 'password',
        Range: 'range',
        Number: 'number',
        Checkbox: 'checkbox',
        DateTime: 'datetime',
        DateTimeLocal: 'datetime-local',
        Email: 'email',
        Month: 'month',
        Search: 'search',
        Tel: 'tel',
        Time: 'time',
        Week: 'week',
        Color: 'color',
        File: 'file'
    }

    return InputOptions;
});