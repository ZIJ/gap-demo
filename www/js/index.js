(function(){
    //registering namespace
    var root = window || global || this;
    if (!root.pgdemo) {
        root.pgdemo = {};
    }
    var pgdemo = root.pgdemo;

    if (root.device) {
        document.addEventListener("deviceready", function(){
            $(f);
        });
    } else {
        $(f);
    }


function f(){

    alert("it works!");

}
}());