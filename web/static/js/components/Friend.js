var Friend = React.createClass({
	displayName: "Friend",
    render: function() {
        return (
            <div>
                <div>
                    and this is the <b>{this.props.name}</b>
                </div>
                <div>
                	{this.props.child}
                </div>
            </div>
        );
    }
});
