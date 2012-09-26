(function(){
    "use strict";

    function deviceReady(){
        var evt = document.createEvent('Event');
        evt.initEvent('deviceready', true, true);
        document.dispatchEvent(evt);
    }

    //$(deviceReady);

    document.addEventListener("deviceready", function(){


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

        var AppModel = Backbone.Model.extend({
            initialize: function(){
                this.info = new InfoModel();
                console.log("App model created");
            }
        });


        var app = new AppModel({
            title: "PhoneGap Demo"
        });

        var AppView = Backbone.View.extend({
            initialize: function(){
                this.infoView = new InfoView({model: app.info, el: $("#info")});
                this.render();
                console.log("App view created");
            },
            render: function(){
                this.infoView.render();
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