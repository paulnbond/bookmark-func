javascript:(
    function(){
        const dot = (function(){
            function dot(size = null, startPosX = null, startPosY = null, xDir = null, yDir = null, speed = null, color = null){
                this.size = (size !== null) ? size : 150;
                this.minSize = 60;
                this.colChange = 80;
                this.x = (startPosX !== null) ? startPosX : Math.random() * (window.innerWidth - this.size) ;
                this.y = (startPosY !== null) ? startPosY : Math.random() * (window.innerHeight - this.size);
                this.maxX = window.innerWidth;
                this.maxY = window.innerHeight;
                this.xDir = (xDir !== null) ? xDir : 1;
                this.yDir = (yDir !== null) ? yDir : 1;
                this.speed = (speed !== null) ? speed : 1;
                this.shrink = 20;
                this.color = (color !== null) ? color : "#70a6ff";

                this.dot = document.createElement("div");
                this.dot.style.width = this.dot.style.height = `${this.size}px`;
                this.dot.style.border = `1px solid ${this.color}`;
                this.dot.style.backgroundColor = `${this.color}1A`;
                this.dot.style.position = "fixed";
                this.dot.style.zIndex = "99999999";
                this.dot.style.top = `${this.x}px`;
                this.dot.style.left = `${this.y}px`;
                this.dot.style.borderRadius = "90px";

                document.body.appendChild(this.dot);

                this.dot.addEventListener("mousedown", () => {
                    this.size -= this.shrink;
                    if (this.size > this.minSize){
                        this.speed += 0.3;
                        this.dot.style.width = this.dot.style.height = `${this.size}px`;
                        this.x = this.x + ((this.shrink / 2) * this.xDir);
                        this.y = this.y + ((this.shrink / 2) * this.yDir);
                        this.dot.style.left = `${this.x}px`;
                        this.dot.style.top = `${this.y}px`;
                        console.log(this.size);
                        this.color = (this.size < this.colChange) ? "#ff0000" : this.color;
                        this.dot.style.border = `1px solid ${this.color}`;
                        this.dot.style.backgroundColor = `${this.color}1A`;
                        window.dotStats.dotspopped++;
                        let newXDir = (Math.round(Math.random()) === 1) ? 1 : -1;
                        let newYDir = (Math.round(Math.random()) === 1) ? 1 : -1;
                        window.dots.push(new dot(this.size, this.x, this.y, newXDir, newYDir, (this.speed+(Math.random()/0.5)), this.color));
                    }
                    if (this.size < this.minSize){
                        window.clearInterval(this.move);
                        this.dot.remove();
                    }
                }, false);
        
                this.move = window.setInterval(() => {
                    this.x += (this.xDir * this.speed);
                    if (this.x >= (this.maxX - this.size))this.xDir = -1; if (this.x <= 0) this.xDir = 1;
                    this.y += (this.yDir * this.speed);
                    if (this.y >= (this.maxY - this.size))this.yDir = -1; if (this.y <= 0) this.yDir = 1;
        
                    this.dot.style.left = `${this.x}px`;
                    this.dot.style.top = `${this.y}px`;
                }, 10);
            }

            return dot;
        })();

        if (window.dots){
            window.dots.push(new dot());
            window.dotStats.basedots++;
        } else {
            window.dots = [new dot()];
            window.dotStats = {
                basedots: 1,
                clicks: 0,
                dotspopped: 0
            };
            window.addEventListener("mousedown", ()=> {
                window.dotStats.clicks++;
                window.updateStats();
            }, false);
            let ds = document.createElement("div");
            ds.setAttribute("id", "dotStats");
            ds.style.position = "fixed";
            ds.style.right = "0px";
            ds.style.top = "0px";
            ds.style.zIndex = "9999999";
            ds.style.textAlign = "right";
            ds.style.padding = "20px";
            ds.style.backgroundColor = "#fff";
            ds.style.border = "1px solid #ccc";
            ds.style.color = "#090909";
            ds.style.fontFamily = "Arial, Helvetica, sans-serif";
            document.body.appendChild(ds);

            window.updateStats = function(){
                document.getElementById("dotStats").innerHTML = 
                    `Big dots spawned: ${window.dotStats.basedots}<br/>
                    Dots popped: ${window.dotStats.dotspopped}<br/>
                    Misses: ${window.dotStats.clicks - window.dotStats.dotspopped}`;
            };
        }

        window.updateStats();
    }
)();