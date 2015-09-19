var FriendList = React.createClass({
  render: function() {
    console.log(this.props);
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <div>
          <Friend name={friend.name}>
            {friend.thumb}
          </Friend>
        </div>
      );
    });
    return (
      <div className="friend-list-container">
        This is the parent container.
        <div className="friend-list">
          {friendNodes}
        </div>
      </div>
    );
  }
});
