var App = React.createClass({
  displayName: "App",
  propTypes: {
    initialPage: React.PropTypes.string // login, friends, results
  },
  getInitialState: function() {
    return {
      friends: [],
      recommendations: [],
      page: this.props.initialPage || 'login'
    }
  },
  componentDidMount: function() {
    console.log("Finished rendering");
    var self = this;
    Store.registerListener(function(page) {
        self.setState({
            page: page,
            friends: Store.friends,
            recommendations: Store.recommendations
        });
    });
  },
  render: function() {
    if(this.state.page == "login") {
      return (
        <Login />
        // <button onClick={Actions.getFriends}>get friends</button>
      )
    }
    else if(this.state.page == "friends") {
      if (this.state.friends.length == 0) {
        return (
          <div>
            <h1>You have no friends :(</h1>
          </div>
        )
      } else {
        console.log("in");
        return (
          <FriendList friends={this.state.friends} />
        )
      }
    }
    else if(this.state.page == "results") {
      if (this.state.recommendations.length == 0) {
        return (
          <div>
            <h1>You have nothing in common...</h1>
          </div>
        )
      } else {
        console.log("in");
        return (
          <Results recommendations={this.state.recommendations}/>
        )
      }
    }
  }
});

React.render(
  React.createElement(
    App, {
      url: 'public/friends.json'
    }
  ),
  document.getElementById('app')
)
