var Rec = React.createClass({
	displayName: "Recommendation",
    render: function() {
        return (
            <div className="recommendation text-align-left">
                <p>{this.props.name}</p>
            </div>
        );
    }
});
