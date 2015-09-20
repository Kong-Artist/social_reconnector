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
      <div className="friend-list-container">
        <h1>Your friends</h1>
        <div>
          {friendNodes}
        </div>
      </div>
    );
  }
});
