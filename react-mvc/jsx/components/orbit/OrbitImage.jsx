

define(['react'], function (React) {
    var OrbitImage = React.createClass({
        render: function () {
            return (
                <li className="is-active orbit-slide">
                    <img className="orbit-image" src="http://placehold.it/350x150" alt="Space" />
                    <figcaption className="orbit-caption">Space, the final frontier.</figcaption>
                </li>
            );
        }
    });
    return OrbitImage;
});