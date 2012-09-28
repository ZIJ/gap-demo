(function(){
    "use strict";

    //TODO refactor rendering code; maybe se

    var readyFired = false;

    // simulating "deviceready" event
    function deviceReady(){
        var evt = document.createEvent('Event');
        evt.initEvent('deviceready', true, true);
        document.dispatchEvent(evt);
    }

    // triggering deviceready simulation
    setTimeout(function(){
        if (!readyFired){
            deviceReady();
        }
    }, 1000);

    document.addEventListener("deviceready", function(){

        readyFired = true;

        /* Info */

        var InfoModel = Backbone.Model.extend({
            defaults: {
                deviceName: "Unnamed Device",
                devicePlatform: "Unknown Platform",
                deviceVersion: "Unknown Version"
            },
            initialize: function(){
                this.update();
            },
            update: function(){
                try {
                    this.set({
                        deviceName: window.device.name,
                        devicePlatform: window.device.platform,
                        deviceVersion: window.device.version
                    });
                } catch (e) {
                    console.log(e.message);
                }
            }
        });

        var InfoView = Backbone.View.extend({
            initialize: function(){
                this.render();
                console.log("Info view created");
            },
            render: function(){
                var source = $("#info-template").html();
                var template = Handlebars.compile(source);
                var json = this.model.toJSON();
                var markup = template(json);
                $(this.el).html(markup);

            }
        });

        /* Accelerometer */

        var AccelerometerModel = Backbone.Model.extend({
            defaults: {
                x: 0,
                y: 0,
                z: 0
            },
            initialize: function(){
                var that = this;
                var options = { frequency: 30 };
                try {
                    navigator.accelerometer.watchAcceleration(function(acceleration){
                        that.set({
                            x: acceleration.x.toFixed(2),
                            y: acceleration.y.toFixed(2),
                            z: acceleration.z.toFixed(2)
                        });
                    }, function(){}, options);
                } catch (e) {
                    console.log(e.message);
                }
            }
        });

        var AccelerometerView = Backbone.View.extend({
            initialize: function(){
                this.model.on('change', this.render, this);
                this.render();
                console.log("Accelerometer view created");
            },
            render: function(){
                var source = $("#accelerometer-template").html();
                var template = Handlebars.compile(source);
                var json = this.model.toJSON();
                var markup = template(json);
                $(this.el).html(markup);
            }
        });

        /* Camera */

        var CameraModel = Backbone.Model.extend({
            defaults: {
                lastURI: ""
            },
            initialize: function(){
                var that = this;
                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    targetWidth: 400,
                    targetHeight: 400
                };
                try {
                    navigator.camera.getPicture(function(uri){
                        that.set({
                            lastURI: uri
                        });
                    }, function(){}, options);
                } catch (e) {
                    console.log(e.message);
                }
            }
        });

        var CameraView = Backbone.View.extend({
            initialize: function(){
                this.model.on('change', this.render, this);
                this.render();
            },
            render: function(){
                var source = $("#camera-template").html();
                var template = Handlebars.compile(source);
                var json = this.model.toJSON();
                var markup = template(json);
                $(this.el).html(markup);
            }
        });

        /* Application */

        var AppModel = Backbone.Model.extend({
            initialize: function(){
                this.info = new InfoModel();
                this.accelerometer = new AccelerometerModel();
                console.log("App model created");
            }
        });


        var app = new AppModel({
            title: "PhoneGap Demo"
        });

        var AppView = Backbone.View.extend({
            initialize: function(){
                this.infoView = new InfoView({model: app.info, el: $("#info")});
                this.accelerometerView = new AccelerometerView({model: app.accelerometer, el: $("#accelerometer")});
                this.render();
                console.log("App view created");
            },
            render: function(){
                this.infoView.render();
                this.accelerometerView.render();
            },
            page: function(pageName){
                $(".page").hide();
                $("#" + pageName).show();
            }

        });

        var appView = new AppView({model: app});

        var AppRouter = Backbone.Router.extend({
            routes: {
                "": "home",
                "*pageName": "pageRoute"
            },
            home: function(){
                appView.page("menu");
            },
            pageRoute: function(pageName){
                appView.page(pageName);
                console.log("routing to " + pageName);
            }
        });

        var appRouter = new AppRouter();

        Backbone.history.start();

    });

}());