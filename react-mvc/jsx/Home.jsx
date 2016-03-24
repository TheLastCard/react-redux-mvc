
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!CRUD/CRUD',
    'jsx!CRUD/CRUDRedux',
    'jsx!CRUD/CRUDFormRedux'
],
function (React, ReactDOM, ReactRedux, Redux, CRUD, CRUDRedux, CRUDFormRedux) {

    const render = () => {
        ReactDOM.render(
            <CRUD dataUrl={'Categories/GetCategories'}/>,
            document.getElementById('content')
        );
    }

    CRUDFormRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});