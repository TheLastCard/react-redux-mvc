

define([
    'react',
    'jsx!categories/Category',
    'jsx!CRUD/Create',
    'jsx!CRUD/CRUDRedux'
],
function (React, Category, Create, CRUDRedux) {

    var Categories = React.createClass({
        getInitialState: function () {
            return {
                inputs: [{
                    label: 'Name',
                    name: 'categoryName',
                    jsonName: 'name',
                    type: 'text',
                    wrapperClassName: 'small-12 columns',
                    placeholder: 'type a category name'
                },
                {
                    label: 'Description',
                    name: 'categoryDescription',
                    jsonName: 'description',
                    type: 'textarea',
                    wrapperClassName: 'small-12 columns'
                }],
                buttons: [{
                    name: 'Create',
                    action: (event, inputs) => CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs }),
                    clearFormAfterAction: true,
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }]
            };
        },
        componentDidMount: function () {
            CRUDRedux.dispatch({ type: 'INIT', list: this.props.categories });
        },
        render: function () {
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Categories</h2>

                        <div className="row">
                            {CRUDRedux.getState().map(function (category) {
                                return <Category key={category.id} category={category}/>
                            })}
                        </div>
                    </div>
                    <div className="small-12 columns">
                        <Create inputs={this.state.inputs} buttons={this.state.buttons} />
                    </div>
                </div>
            );
        }
    });

    return Categories;
});