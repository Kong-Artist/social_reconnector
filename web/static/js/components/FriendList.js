var FriendList = React.createClass({
  render: function() {
    var friendNodes = this.props.friends.map(function (friend) {
      return (
        <div>
          <Friend name={friend.name} id={friend.id} avatar={friend.avatar} />
          {friend.thumb}
        </div>
      );
    });
    return (
      <div>
        <h1>Your (long-lost) friends</h1>
        <div className="orange-container padding-list shadow">
          {friendNodes}
        </div>
      </div>
    );
  }
});
