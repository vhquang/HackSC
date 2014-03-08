function send(options) {
    return function() {
        $.ajax(options).done(function() {
        //cooldown
        });
    };
}

$("#upBtn").click( send({ url: "./up", type: "POST" }) );
$("#downBtn").click( send({ url: "./down", type: "POST" }) );