console.log("Start!");
let canvases = document.querySelectorAll('canvas');
let maxDesign = 4;
canvases.forEach(canvas => {
    var context = canvas.getContext('2d');
    var size = canvas.width;

    let num = Math.random()

    if (num > (maxDesign - 1) / maxDesign) {

        var step = 10;
        var dpr = window.devicePixelRatio;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);

        context.lineCap = 'square';
        context.lineWidth = 2;
        function draw(x, y, width, height) {
            var leftToRight = Math.random() >= 0.5;

            if (leftToRight) {
                context.moveTo(x, y);
                context.lineTo(x + width, y + height);
            } else {
                context.moveTo(x + width, y);
                context.lineTo(x, y + height);
            }

            context.stroke();
        }

        for (var x = 0; x < size; x += step) {
            for (var y = 0; y < size; y += step) {
                draw(x, y, step, step);
            }
        }

    } else if (num > (maxDesign - 2) / maxDesign) {
        var dpr = window.devicePixelRatio;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 2;

        var randomDisplacement = 15;
        var rotateMultiplier = 20;
        var offset = 10;
        var squareSize = 30;

        function draw(width, height) {
            context.beginPath();
            context.rect(-width / 2, -height / 2, width, height);
            context.stroke();
        }

        for (var i = squareSize; i <= size - squareSize; i += squareSize) {
            for (var j = squareSize; j <= size - squareSize; j += squareSize) {
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

                context.save();
                context.translate(i + translateAmt + offset, j + offset);
                context.rotate(rotateAmt);
                draw(squareSize, squareSize);
                context.restore();
            }
        }

    } else if (num > (maxDesign - 3) / maxDesign) {
        var dpr = window.devicePixelRatio;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);
        
        context.lineWidth = 2;
          
        var circles = [];
        var minRadius = 2;
        var maxRadius = 100;
        var totalCircles = 500;
        var createCircleAttempts = 500;
         
        function createAndDrawCircle() {
          
          var newCircle;
          var circleSafeToDraw = false;
          for(var tries = 0; tries < createCircleAttempts; tries++) {
            newCircle = {
              x: Math.floor(Math.random() * size),
              y: Math.floor(Math.random() * size),
              radius: minRadius
            }
            
            if(doesCircleHaveACollision(newCircle)) {
              continue;
            } else {
              circleSafeToDraw = true;
              break;
            }
          }
        
          if(!circleSafeToDraw) {
            return;
          }
        
          for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
            newCircle.radius = radiusSize;
            if(doesCircleHaveACollision(newCircle)){
              newCircle.radius--;
              break;
            } 
          }
        
          circles.push(newCircle);
          context.beginPath();
          context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
          context.stroke(); 
        }
        
        function doesCircleHaveACollision(circle) {
          for(var i = 0; i < circles.length; i++) {
            var otherCircle = circles[i];
            var a = circle.radius + otherCircle.radius;
            var x = circle.x - otherCircle.x;
            var y = circle.y - otherCircle.y;
        
            if (a >= Math.sqrt((x*x) + (y*y))) {
              return true;
            }
          }
          
          if(circle.x + circle.radius >= size ||
             circle.x - circle.radius <= 0) {
            return true;
          }
            
          if(circle.y + circle.radius >= size ||
              circle.y - circle.radius <= 0) {
            return true;
          }
          
          return false;
        }
        
        for( var i = 0; i < totalCircles; i++ ) {  
          createAndDrawCircle();
        }
        
    } else {
        var dpr = window.devicePixelRatio;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 2;

        var step = 10;
        var lines = [];

        // Create the lines
        for (var i = step; i <= size - step; i += step) {

            var line = [];
            for (var j = step; j <= size - step; j += step) {
                var distanceToCenter = Math.abs(j - size / 2);
                var variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
                var random = Math.random() * variance / 2 * -1;
                var point = { x: j, y: i + random };
                line.push(point);
            }
            lines.push(line);
        }

        // Do the drawing
        for (var i = 5; i < lines.length; i++) {

            context.beginPath();
            context.moveTo(lines[i][0].x, lines[i][0].y);

            for (var j = 0; j < lines[i].length - 2; j++) {
                var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
                var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
                context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
            }

            context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.fill();
            context.restore();
            context.stroke();
        }

    }

});
console.log("OK!");
