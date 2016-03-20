

define(['react'], function (React) {
    var Category = React.createClass({
        render: function () {
            return (
                <div className="small-12 medium-6 large-4 columns float-left">
                    <div className="callout">
                        <h4>{this.props.category.name}</h4>
                        <small>Id: {this.props.category.id}</small>
                        <p>{this.props.category.description}</p>
                        <p>
                            <span>Target group:  </span>
                            <span>
                            {this.props.category.targetGroup && Array.isArray(this.props.category.targetGroup) ? this.props.category.targetGroup.map(function (item, index) {
                                return index === 0 ? item : ', '+ item;
                            }) : this.props.category.targetGroup}
                            </span>
                        </p>
                    </div>
                </div>
            );
        }
    });

    return Category;
});