var HashParameters = {
    hashParams: {},
    initialize: function() {
        if (window.location.hash) {
            var paramItems = (window.location.hash.substr(1)).split("&");

            for (i = 0; i < paramItems.length; i++) {
                var a = paramItems[i].split("=");
                if (a[0] === undefined) {
                    continue;
                }

                this.set(a[0], ((a[1] !== undefined) ? decodeURIComponent(a[1]) : null));
            }
        }
    },
    get: function(key) {
        return this.hashParams[key];
    },
    set: function(key, value) {
        this.hashParams[key] = value;
        this.commit();
    },
    unset: function(key) {
        if (this.get(key) !== undefined) {
            delete this.hashParams[key];
        }

        this.commit();
    },
    commit: function() {
        var paramArray = [];
        var obj = this;
        Object.keys(this.hashParams).forEach(function(key,index) {
            var paramStr = (obj.get(key) !== null) ? (key+'='+encodeURIComponent(obj.get(key))) : key;
            paramArray.push(paramStr);
        });

        window.location.hash = "#"+paramArray.join('&');
    }
};

HashParameters.initialize();
