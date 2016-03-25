
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
        }


        return {
            CREATE: (event, inputs, id, callback) => {
                console.log('CRUDActions CREATE');
                if (!urls.createUrl) {
                    console.error("CRUDActions CREATE-> createUrl is not set! Should be a string inside the urls object like this urls:{createUrl: <createUrl>.");
                }
                if (id === undefined || id === null) {
                    id = CRUDRedux.getState().length;
                }

                toggleLoader(true);
                var JSONStringOfCreatedObject = mapObjectValuesToJSONString(inputs, id);
            
                $.ajax({
                    url: urls.createUrl,
                    type: 'POST',
                    data: { model: JSONStringOfCreatedObject }
                }).done(function (result) {
                    //console.log(result);
                    CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs, id: id });
                    callback ? callback() : null;
                }).fail(function (error) {
                    console.error('CRUDActions CREATE failed! ', error);
                }).always(function () {
                    toggleLoader(false);
                });
            },
            READ: () =>{
                console.log('CRUDActions READ');
                if (!urls.readUrl) {
                    console.error("CRUDActions READ-> readUrl is not set! Should be a string inside the urls object like this urls:{readUrl: <readUrl>.");
                }
                $.ajax({
                    url: urls.readUrl,
                    type: 'GET'
                }).done(function (result) {
                    CRUDRedux.dispatch({ type: 'INIT', list: JSON.parse(result) });
                }).fail(function (error) {
                    console.error('urls.readUrl for fetching data was called, but failed fetching data! ', error);
                }).always(function () {
                    toggleLoader(false);
                });
            },
            UPDATE: (event, inputs, id, callback) => {
                console.log('CRUDActions UPDATE');
                if (!urls.updateUrl) {
                    console.error("CRUDActions UPDATE-> updateUrl is not set! Should be a string inside the urls object like this urls:{updateUrl: <updateUrl>.");
                }
                if (id === undefined || id === null) {
                    console.error("CRUDActions UPDATE-> id of element to update is not defined!");
                }

                toggleLoader(true);
                var JSONStringOfCreatedObject = mapObjectValuesToJSONString(inputs, id);

                CRUDRedux.dispatch({ type: 'UPDATE', event: event, inputs: inputs, id: id });
                callback ? callback() : null;
                toggleLoader(false);

                //$.ajax({
                //    url: urls.updateUrl,
                //    type: 'POST',//TODO: Should be PUT
                //    data: { model: JSONStringOfCreatedObject }
                //}).done(function (result) {
                //    //console.log(result);
                //}).fail(function (error) {
                //    console.error('CRUDActions UPDATE failed! ', error);
                //}).always(function () {
                //    toggleLoader(false);
                //});
            },
            DELETE: (event, id, callback) => {
                console.log('CRUDActions DELETE');
                if (!urls.deleteUrl) {
                    console.error("CRUDActions DELETE-> deleteUrl is not set! Should be a string inside the urls object like this urls:{deleteUrl: <deleteUrl>.");
                }
                if (id === undefined || id === null) {
                    console.error("CRUDActions DELETE-> id of element to delete is not defined!");
                }

                toggleLoader(true);

                CRUDRedux.dispatch({ type: 'DELETE', event: event, id: id });
                callback ? callback() : null;
                toggleLoader(false);

                //$.ajax({
                //    url: urls.deleteUrl,
                //    type: 'POST',
                //    data: { id: id }
                //}).done(function (result) {
                //    //console.log(result);
                //}).fail(function (error) {
                //    console.error('CRUDActions UPDATE failed! ', error);
                //}).always(function () {
                //    toggleLoader(false);
                //});
            }
        }
    };

    return CRUDActions;
});