

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
                modalOptions: {
                    buttonText: 'Create new category'
                },
                inputs: [{
                    label: 'Name',
                    name: 'categoryName',
                    jsonName: 'name',
                    type: 'text',
                    placeholder: 'type a category name',
                    wrapperClassName: 'small-12 columns'
                },
                {
                    label: 'Description',
                    name: 'categoryDescription',
                    jsonName: 'description',
                    type: 'textarea',
                    wrapperClassName: 'small-12 columns'
                },
                {
                    label: 'Target Group',
                    name: 'targetGroup',
                    jsonName: 'targetGroup',
                    type: 'checkbox',
                    alternatives: ['Children', 'Young Adults', 'Adults', 'Seniors'],
                    defaultValue: ['Children'],
                    value: null,
                    placeholder: 'Pick a target group',
                    wrapperClassName: 'small-12 columns'
                }],
                buttons: [{
                    name: 'Create',
                    action: (event, inputs) => CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs }),
                    clearFormAfterAction: true,
                    closeModalAfterAction: true,
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }]
            };
        },
        componentDidMount: function () {
            CRUDRedux.dispatch({ type: 'INIT', list: this.props.categories });
            $(document).foundation();
        },
        render: function () {
            var self = this;
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Categories</h2>

                        <div className="row">
                            {CRUDRedux.getState().map(function (category) {
                                return <Category key={category.id} category={category}/>
                            })}
                        </div>
                        <Create inputs={this.state.inputs} buttons={this.state.buttons} modal={this.state.modalOptions}/>
                    </div>
                </div>
            );
        }
    });

    return Categories;
});