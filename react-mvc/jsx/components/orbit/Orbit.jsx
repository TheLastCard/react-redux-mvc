

define(['react', 'jsx!orbit/OrbitImage'], function (React, OrbitImage) {
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

    return Orbit;
});