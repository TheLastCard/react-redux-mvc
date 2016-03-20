

define(['react'], function (React) {
    var Category = React.createClass({
        render: function () {
            return (
                <div className="small-12 medium-6 large-4 columns float-left">
                    <div className="callout">
                        <h4>{this.props.category.name}</h4>
                        <small>Id: {this.props.category.id}</small>
                        <p>{this.props.category.description}</p>
                    </div>
                </div>
            );
        }
    });

    return Category;
});