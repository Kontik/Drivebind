Drivebind = function(){

    var PubSub = {
        subscribe: function(ev, listener) {
            (this.events[ev] = this.events[ev] || []).push(listener);
        },
        publish: function(ev, data) {
            if (!this.events[ev]) {return this;}
            
            var calls = this.events[ev];
            for (var i=0, calls_length=calls.length; i < calls_length; i++) {
                calls[i](data);
            }
        },
        unsubscribe: function(ev, listener) {
            if (listener) {
                var index = this.events[ev].indexOf(listener);
                if (index != -1) {
                    this.events[ev].splice(index, 1);
                }
            }
        }
    }

    var Hub = {
        channels: {},
        listen: function(channel_id, ev, callback) {
            var args = Array.prototype.slice.call(arguments),
                channel_id = args[2] ? args.shift() : 'main',
                channel = this.channels[channel_id];

            if (!channel) {
                channel = this.channels[channel_id] = Object.create(PubSub);
            }
            channel.events = channel.events || {};
            channel.subscribe(args[0], args[1]);
        },
        emit: function(channel_id, ev, data) {
            var args = Array.prototype.slice.call(arguments),
                channel_id = args[2] ? args.shift() : 'main';

            if (!this.channels[channel_id]) {return this;}
            this.channels[channel_id].publish(args[0], args[1]);
        },
        clear: function(channel_id, ev, listener) {
            if (arguments[2] && this.channels[channel_id] && this.channels[channel_id].events[ev]) {
                this.channels[channel_id].unsubscribe(ev, listener);
            } else if (arguments[1] && this.channels[channel_id]) {
                delete this.channels[channel_id].events[ev];
            } else {
                delete this.channels[channel_id];
            }
        }
    }

    var core = {
        Hub: Hub
    }

    return core;

}();