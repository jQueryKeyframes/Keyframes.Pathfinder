
(function() {

  $.keyframe = $.extend($.keyframe, {

    pathfinderOpts: {
      bezierSteps: 100,
      circleSteps: 100
    },

    bezierPath: function(kfro, p1, p2, p3, p4){

      var opts = $.keyframe.pathfinderOpts;
      if(p4 == null){
        p4 = p1;
      }

      p1 = coord(p1[0],p1[1]);
      p2 = coord(p2[0],p2[1]);
      p3 = coord(p3[0],p3[1]);
      p4 = coord(p4[0],p4[1]);
      
      var points = {};
      var step = 1 / opts.bezierSteps;

      for (var i = 0; i <= 1.01; i += step){
        var newpos = getBezier(i, p1, p4, p3, p2);
        points[ (100 - Math.round(i * 100)) + '%' ] = { 'transform': 'translate(' + newpos.x + 'px,' + newpos.y + 'px)' };
      }

      return $.extend(kfro, points);

    },

    circlePath: function(kfro, center, radius){
      var opts = $.keyframe.pathfinderOpts;

      center = coord(center[0],center[1]);
      var step = 100 / opts.circleSteps;
      var points = {};

      for (var i = 0; i <= opts.circleSteps; i += step){
        var degree = (360 / opts.circleSteps) * i;
        var newpos = getCirclePoint(degree, radius, center);
        points[ Math.round(i) + '%' ] = { 'transform': 'translate(' + newpos.x + 'px,' + newpos.y + 'px)' };
      }
      return $.extend(kfro, points);
    }
  });

  function getCirclePoint(degree, radius, center) {
    var radians = degree * (Math.PI / 180);
    return {
        x: (center.x + radius * Math.cos(radians)),
        y: (center.y + radius * Math.sin(radians))
    }
  }

  //====================================\\
  // 13thParallel.org Beziér Curve Code \\
  //   by Dan Pupius (www.pupius.net)   \\
  //====================================\\

  var coord = function (x,y) {
    if(!x) var x=0;
    if(!y) var y=0;
    return {x: x, y: y};
  }

  function B1(t) { return t*t*t }
  function B2(t) { return 3*t*t*(1-t) }
  function B3(t) { return 3*t*(1-t)*(1-t) }
  function B4(t) { return (1-t)*(1-t)*(1-t) }

  function getBezier(percent,C1,C2,C3,C4) {
    var pos = new coord();
    pos.x = C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent);
    pos.y = C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent);
    return pos;
  }

}).call(this);