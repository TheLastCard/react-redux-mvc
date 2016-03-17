


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

var Orbit = React.createClass({
    render: function () {
        return (
          <div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
              <ul className="orbit-container">
              <OrbitImage />
              </ul>
          </div>
      );
    }
});

var HomeContainer = React.createClass({
    render: function () {
        return (
            <Orbit />
      );
    }
});


ReactDOM.render(
    <HomeContainer />,
    document.getElementById('content')
);