var FriendList = React.createClass({
  render: function() {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <div>
          <Friend name={friend.name} />
          {friend.thumb}
        </div>
      );
    });
    return (
      <div className="friend-list-container">
        This is the parent container.
        <div>
          {friendNodes}
        </div>
      </div>
    );
  }
});
