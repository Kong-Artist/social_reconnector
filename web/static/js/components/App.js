var App = React.createClass({
    displayName: "App",
    propTypes: function() {
        initialPage: React.PropTypes.string // login, friends, results
    },
    getInitialState: function() {
        return {
            page: this.props.initialPage || 'login'
        }
    },
    render: function() {
        if(this.state.page == "login") {
            return (
                <Login />
            )
        }
        else if(this.state.page == "friends") {
            return (
                <Friends />
            )
        }
        else if(this.state.page == "results") {
            return (
                <Results />
            )
        }
    }
});

React.render(
    React.createElement(
        App, {
            initialPage: 'friends'//'login'
        }
    ),
    document.getElementById('app')
)
