﻿
define(['jsx!CRUD/CRUDRedux'], function (CRUDRedux) {

    const CRUDActions = (urls) => {
        if (!urls) {
            console.error("CRUDActions -> urls is not set in the constructor! Should be an object of urls like this urls:{readUrl: <readUrl>, createUrl: <createUrl>, updateUrl: <updateUrl>, deleteUrl: <deleteUrl>}. To use CRUDActions, you initiate it like a function like this: var actions = CRUDAction(urls)");
        }

        const toggleLoader = (toggle) => {
            !toggle ? $("#loader").hide() : $("#loader").show();
        };

        const mapObjectValuesToJSONString = (inputs, id) => {
            var result = { id: id };
            inputs.map(function (input) {
                if (!input.jsonName) {
                    result[input.name] = input.value;
                }
                else {
                    result[input.jsonName] = input.value;
                }
            });
            return JSON.stringify(result);
        };

        const doneSwitch = (type, result, event, inputs, id) => {
            switch (type) {
                case 'CREATE':
                    CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs, id: result.id });
                    break;
                case 'READ':
                    CRUDRedux.dispatch({ type: 'INIT', list: JSON.parse(result) });
                    break;
                case 'UPDATE':
                    CRUDRedux.dispatch({ type: 'UPDATE', event: event, inputs: inputs, id: id });
                    break;
                case 'DELETE':
                    CRUDRedux.dispatch({ type: 'DELETE', event: event, id: id });
                    break;
                default:
                    console.warn('Invalid call to doneSwitch() inside CRUDActions');
                    break;
            }
        };

        const ajaxOptions = (type, event, inputs, id) => {
            var form = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();
            console.log('token', token);
            switch (type) {
                case 'CREATE':
                    return {
                        url: urls.createUrl,
                        type: 'POST',
                        data: {
                            model: mapObjectValuesToJSONString(inputs, id),
                            __RequestVerificationToken: token
                        }
                    };
                    break;
                case 'READ':
                    return {
                        url: urls.readUrl,
                        type: 'GET'
                    };
                    break;
                case 'UPDATE':
                    return {
                        url: urls.updateUrl,
                        type: 'POST',
                        data: {
                            model: mapObjectValuesToJSONString(inputs, id),
                            __RequestVerificationToken: token
                        }
                    };
                    break;
                case 'DELETE':
                    return {
                        url: urls.deleteUrl,
                        type: 'POST',
                        data: {
                            id: id,
                            __RequestVerificationToken: token
                        }
                    };
                    break;
                default:
                    console.warn('Invalid call to ajaxOptions() inside CRUDActions');
                    break;
            }
        }

        const ajaxCall = (type, event, inputs, id, callback) => {
            console.log('CRUDActions', type);
            if (!urls.createUrl) {
                console.error('CRUDActions' + type + '-> ' + type.toLowerCase() + 'Url is not set! Should be a string inside the urls object like this urls:{' + type.toLowerCase() + 'Url: <' + type.toLowerCase() + 'Url>.');
            }
            if (type === 'CREATE') {
                id = CRUDRedux.getState().length;
            }
            if (type !== 'READ' && (id === undefined || id === null)) {
                console.error('CRUDActions' + type + '-> id is undefined!');
            }
            toggleLoader(true);

            $.ajax(ajaxOptions(type, event, inputs, id)).done(function (result) {
                console.log(result);
                doneSwitch(type, result, event, inputs, id);
                if (callback && typeof (callback) === 'function') {
                    console.log('running callback');
                    callback();
                }
            }).fail(function (error) {
                console.error('CRUDActions ' + type + ' failed! ', error);
            }).always(function () {
                toggleLoader(false);
            });
        };

        return {
            CREATE: (event, inputs, id, callback) => {
                ajaxCall('CREATE', event, inputs, id, callback);
            },
            READ: () => {
                ajaxCall('READ');
            },
            UPDATE: (event, inputs, id, callback) => {
                ajaxCall('UPDATE', event, inputs, id, callback);
            },
            DELETE: (event, inputs, id, callback) => {
                ajaxCall('DELETE', event, inputs, id, callback);
            }
        }
    };

    return CRUDActions;
});