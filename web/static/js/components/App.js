var App = React.createClass({
  displayName: "App",
  propTypes: {
    initialPage: React.PropTypes.string // login, friends, results
  },
  getInitialState: function() {
    return {
      page: this.props.initialPage || 'login'
    }
  },
  componentDidMount: function() {
    var self = this;
    Store.registerListener(function() {
        self.setState({
            friends: Store.friends
        });
    });
    Store.registerListener(function() {
        self.setState({
            recommendation: Store.recommendation
        });
    });
  },
  render: function() {
    if(this.state.page == "login") {
      return (
        <Login />
      )
    }
    else if(this.state.page == "friends") {
        if(this.state.friends) {
          return (
            <FriendList friends={this.state.friends} />
            )
        }
        else {
            return (
                <div>
                    <button onClick={Actions.getFriends}>Find friends</button>
                </div>
            )
        }
    }
    else if(this.state.page == "results") {
      return (
        <Results recommendation={this.state.recommendation}/>
      )
    }
  }
});

React.render(
  React.createElement(
    App, {
      initialPage: 'friends',//'login'
      url: 'public/friends.json'
    }
  ),
  document.getElementById('app')
)
