

define([
    'react',
    'jsx!categories/Category',
    'jsx!categories/CategoriesRedux',
    'jsx!CRUD/Add',
    'jsx!CRUD/AddRedux'
],
function (React, Category, CategoriesRedux, Add, AddRedux) {

    var Categories = React.createClass({
        getInitialState: function () {
            return {
                categoryId: this.props.categories.length,
                inputs: [{
                    label: 'Name',
                    name: 'categoryName',
                    type: 'text',
                    className: 'small-12 columns',
                    placeholder: 'type a category name',
                    value: null,
                    onChange: (event, index) =>AddRedux.dispatch({ type: 'CHANGE', event: event, index: index })
                }],
                buttons: [{
                    name: 'Create',
                    action: () => this.state.addCategory(),
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }],
                addCategory: () => {
                    CategoriesRedux.dispatch({ type: 'ADD_CATEGORY', id: this.state.categoryId++, name: this.state.inputs[0].value });
                    AddRedux.dispatch({ type: 'CLEAR', index: 0 });
                }
            };
        },
        componentDidMount: function () {
            AddRedux.dispatch({ type: 'INIT', list: this.state.inputs });
        },
        render: function () {
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Categories</h2>
                        <div>
                            {this.props.categories.map(function (category) {
                                return <Category key={category.id} id={category.id} name={category.name} />
                            })}
                        </div>
                    </div>
                    <div className="small-12 columns">
                        <Add inputs={this.state.inputs} buttons={this.state.buttons} />
                    </div>
                </div>
            );
        }
    });

    return Categories;
});