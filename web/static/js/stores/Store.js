var Store = {
    friends: [],
    callbacks: [],
    handleAction: function(action) {
        switch (action.actionType) {
            case 'get-friends':
                this.friends = action.data;
                break;
        }
        this.callbacks.forEach(function(callback) {
            callback();
        });
    },
    registerListener: function(callback) {
        this.callbacks.push(callback);
    }
};

Dispatcher.register(function(payload) {
    Store.handleAction(payload);
});
