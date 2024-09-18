window.onload = function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);
}