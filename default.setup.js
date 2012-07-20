function(ctx) {
    // This is called first-thing and makes a context object that is
    // passed to all SMS dispatches.

    var audiolet = new Audiolet();

    ctx["audiolet"] = audiolet;
}
