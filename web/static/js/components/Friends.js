var Friends = React.createClass({
    displayName: "Friends",
    render: function() {
        return (
            <div className="friends-container">
                friends container
                <div className="friends-list">
                    {this.props.friends.map(function(row, index) {
                        return (
                            <Friend />
                        )
                    })}
                </div>
            </div>
        );
    }
});
