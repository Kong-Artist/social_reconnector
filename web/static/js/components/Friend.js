var Friend = React.createClass({
	displayName: "Friend",
    clickFriend: function() {
        Actions.getRecommendations(this.props.id);
    },
    render: function() {
		console.log(this.props.avatar)
        return (
            <div className="friend center text-align-left" onClick={this.clickFriend}>
				<img src={this.props.avatar} className="thumbnail shadow"></img>
                    <h1 className="text-align-center">{this.props.name}</h1>
            </div>
        );
    }
});
