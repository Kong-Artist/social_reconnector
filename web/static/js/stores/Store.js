var Store = {
    friends: [],
    recommendations: [],
    callback: undefined,
    handleAction: function(action) {
        switch (action.actionType) {
            case 'get-friends':
                this.friends = action.data;
                this.callback("friends");
                break;
            case 'get-recommendations':
                this.recommendations = action.data;
                this.callback("results");
                break;
        }
        // this.callbacks.forEach(function(callback) {
        //     callback();
        // });
    },
    registerListener: function(callback) {
        this.callback = callback;
    }
};

Dispatcher.register(function(payload) {
    Store.handleAction(payload);
});
