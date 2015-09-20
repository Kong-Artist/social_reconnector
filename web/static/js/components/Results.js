var Results = React.createClass({
  displayName: "Results",
  componentDidMount: function() {
    var self = this;
    Store.registerListener(function() {
        self.setState({
            recommendation: Store.recommendations
        });
    });
  },
  render: function() {
      return (
          <div>results</div>
      )
  }
})
