function(ctx, msg) {
    // This is called first-thing and makes a context object that is
    // passed to all SMS dispatches.

    var freq = 440.0;
    var parts = msg.message.split(' ');
    if(parts.length > 1) {
        if(!isNaN(parseFloat(parts[1])))
            freq = parseFloat(parts[1]);
    }

    var sine = new Sine(ctx.audiolet, freq);
    sine.connect(ctx.audiolet.output);

    return 'sine added with frequency: ', freq;
}
