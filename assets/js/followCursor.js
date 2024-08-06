        (function fairyDustCursor() {
 
            var possibleColors = [
                "#D61C59", "#E7D84B", "#1B8798", "#4CAF50", "#FF5722", "#03A9F4", "#9C27B0", "#795548",
                "#009688", "#FFEB3B", "#FF9800", "#FFC107", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4",
                "#FF4081", "#F44336", "#CDDC39", "#8BC34A", "#FFEB3B", "#FF5722", "#607D8B", "#9E9E9E",
                "#795548", "#FF5722", "#9C27B0", "#03A9F4", "#4CAF50", "#FFC107", "#FF9800", "#9C27B0",
                "#9E9E9E", "#607D8B", "#03A9F4", "#FF5722", "#9C27B0", "#673AB7", "#795548", "#FFEB3B",
                "#FFC107", "#FF9800", "#FF5722", "#607D8B", "#2196F3", "#00BCD4", "#FF4081", "#F44336",
                "#CDDC39", "#8BC34A", "#FFEB3B", "#FF9800", "#FFC107", "#673AB7", "#3F51B5", "#9C27B0"
            ];            
            var width = window.innerWidth;
            var height = window.innerHeight;
            var cursor = { x: width / 2, y: width / 2 };
            var particles = [];
 
            function init() {
                bindEvents();
                loop();
            }
 
           
            function bindEvents() {
                document.addEventListener('mousemove', onMouseMove);
                window.addEventListener('resize', onWindowResize);
            }
 
            function onWindowResize(e) {
                width = window.innerWidth;
                height = window.innerHeight;
            }
 
            function onMouseMove(e) {
                cursor.x = e.clientX;
                cursor.y = e.clientY;
 
                addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
            }
 
            function addParticle(x, y, color) {
                var particle = new Particle();
                particle.init(x, y, color);
                particles.push(particle);
            }
 
            function updateParticles() {
 
                
                for (var i = 0; i < particles.length; i++) {
                    particles[i].update();
                }
 
               
                for (var i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles[i].die();
                        particles.splice(i, 1);
                    }
                }
 
            }
 
            function loop() {
                requestAnimationFrame(loop);
                updateParticles();
            }
 
          
 
            function Particle() {
 
                this.character = "*";
                this.lifeSpan = 120; //ms
                this.initialStyles = {
                    "position": "fixed",
                    "display": "inline-block",
                    "top": "0px",
                    "left": "0px",
                    "pointerEvents": "none",
                    "touch-action": "none",
                    "z-index": "10000000",
                    "fontSize": "25px",
                    "will-change": "transform"
                };
 
              
                this.init = function (x, y, color) {
 
                    this.velocity = {
                        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                        y: 1
                    };
 
                    this.position = { x: x + 10, y: y + 10 };
                    this.initialStyles.color = color;
 
                    this.element = document.createElement('span');
                    this.element.innerHTML = this.character;
                    applyProperties(this.element, this.initialStyles);
                    this.update();
 
                    document.querySelector('.js-cursor-container').appendChild(this.element);
                };
 
                this.update = function () {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;
 
                    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
                }
 
                this.die = function () {
                    this.element.parentNode.removeChild(this.element);
                }
 
            }
 
           
            function applyProperties(target, properties) {
                for (var key in properties) {
                    target.style[key] = properties[key];
                }
            }
 
            if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
        })(); 