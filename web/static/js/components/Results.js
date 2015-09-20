var Results = React.createClass({
  displayName: "Results",
  render: function() {
    console.log(this.props);
    var resultNodes = this.props.recommendations.map(function (val) {
      return (
        <div>
          <Rec name={val} />
        </div>
      );
    });
    return (
      <div className="recommendation-list-container">
        <h1>Things you have in common:</h1>
        <div>
          {resultNodes}
        </div>
      </div>
    );
  }
})
