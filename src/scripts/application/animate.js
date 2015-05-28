define(['eventmanager', 'RequestAnimationFrame', '../view/map', 'actors'], function (eventmanager) {
    var frame = 0;

    function animate() {
        frame++;
        eventmanager.publish('new.frame', frame);
        window.setTimeout(animate, 1000 / app.config.framerate);
    }

    eventmanager.subscribe('game.init', function () {
        animate();
    });
    return {};
});