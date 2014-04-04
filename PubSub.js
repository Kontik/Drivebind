(Drivebind = function(){

    var PubSub = {
        events: {},
        subscribe: function(ev, listener) {
            this.events[ev] = (this.events[ev] || []).push(listener);
        },
        publish: function(ev, data) {
            if (!this.events[ev]) {return this;}
            
            var calls = this.events[ev];
            for (var i=0, calls_lenght=calls.length; i < calls_lenght; i++) {
                calls[i](data);
            }
        }
    }

    var Hub = {
        channels: {},
        listen: function(channel_id, ev, callback) {
            var channel_id = arguments[2] ? channel_id : 'main',
                channel;
            if (!this.channels[channel_id]) {
                channel = this.channels[channel_id] = Object.create(PubSub);
            }
            channel.subscribe(ev, callback);
        },
        emit: function(channel_id, ev, data) {
            var channel_id = arguments[2] ? channel_id : 'main';
            if (!this.channels[channel_id]) {return this;}
            channels[channel_id].publish(ev, data)
        }
    }

})();