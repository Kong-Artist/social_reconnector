var Login = React.createClass({
    displayName: "Login",
    getFriends: function(token) {
        Actions.getFriends(token);
    },
    componentDidMount: function() {
        var self = this;
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '130652690619615',
                status     : true,
                cookie     : true,
                xfbml      : true,
                oauth      : true,
            });
            FB.getLoginStatus(function(response) {
                if(response.status === "connected") {
                    console.log("connected") // redirect
                    // console.log(FB.getAuthResponse()['accessToken'])
                    // self.getFriends(FB.getAuthResponse()['accessToken']);
                    self.getFriends();
                }
                else if(response.status === "not_authorized") {
                    console.log("not authorized") // don't do anything
                }
                else {
                    //not logged in
                    console.log("not logged in") // do nothing
                }
            })
            FB.Event.subscribe('auth.login', function() {
                console.log("logged in"); // redirect
                // console.log(FB.getAuthResponse()['accessToken'])
                self.getFriends();
            });
        };
        (function(d){
        var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    },
    render: function() {
        return (
            <div>
                <h1>ReConnect</h1>
                <h3>Connect again with old friends!</h3>
                <div className="circle center">
                </div>
                <div className="fb-login-button">Login with Facebook</div>
            </div>
        )
    }
});
