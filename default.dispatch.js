function(ctx, msg) {
    if(!(msg && msg.message)) {
        console.log("empty message");
    }

    for (var key in ctx.handlers.map) { 
        if(msg.message.toLowerCase().indexOf(key.toLowerCase()) == 0) {
            return ctx.handlers.call(key, ctx, msg);
        }
    }

    // No handlers
    return "dispatch default";
}
