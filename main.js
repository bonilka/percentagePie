console.log("include main.js")
// window.onload = function() {
    var Canva = function (data) {
        var canvas = data.el;
        var defaultBorderWidth = function () {
            var w = data['el'].clientWidth;
            return w*0.1;
        }
        this.textDefault = function () {
            return 'normal '+ data['el'].clientWidth*0.5 + '% Helvetica, Arial, sans-serif'
        }
        this.prec = data['value'];
        this.borderColor = data['borderColor'] || 'rgb(41, 180, 194)';
        this.borderWidth = data['borderWidth'] || defaultBorderWidth();
        this.innerColor = data['innerColor'] || 'transparent';
        this.textColor = data['textColor'] || '#000';
        this.font = data['font'] || this.textDefault();
        this.context = canvas.getContext("2d");
    }
    Canva.prototype.arc = function (center, radius, start, end, counterClockwise, borderWidth, color) {
        //рисуем дугу
        this.context.beginPath();
        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = borderWidth;
        this.context.arc(center.x, center.y, radius, start, end, counterClockwise);
        this.context.stroke();

    };
    Canva.prototype.round = function (center, radius, color) {
        // рисуем круг
        this.context.beginPath();
        this.context.arc(center.x, center.y, radius, 0, 2*Math.PI, false);
        this.context.fillStyle = this.innerColor;
        this.context.fill();
    };
    Canva.prototype.printText = function (data) {
        this.font = data['font'] || this.textDefault();
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.font = this.font;
        this.context.fillStyle = this.textColor;
        this.context.fillText(data.text, data.center.x, data.center.y);
    };
    // var canva = new Canva(document.getElementById('pie-0'));
    // canva.arc();
    var Pie = function (data) {
        var that = this;
        this.parentEl = document.getElementById(data['id']);
        this.createEl();
        console.log(this.w);
        this.calcCenter();
        data.el = this.el; //add in settings object
        this.text = data['text']; //print text in center (val%) ?
        Canva.call(this, data);
        this.print();
        window.addEventListener('resize', function () {
            if(that.parentEl.clientWidth > that.w || that.parentEl.clientWidth < that.w){
                that.setSize();
                that.print();
                if(this.text){
                    this.printText({text: this.prec+'%', center: this.center});
                }
                console.log('is resize!');
            }
        })
    }
    Pie.prototype = Object.create(Canva.prototype);
    Pie.prototype.constructor = Canva;
    Pie.prototype.createEl = function () {
        this.el = document.createElement('canvas');
        this.setSize();
        this.parentEl.appendChild(this.el);
        this.el.style.display = 'block';
    };
    Pie.prototype.setSize = function () {
        this.setHeight();
        this.setWidth();
    };
    Pie.prototype.setHeight = function () {
        this.h = this.parentEl.clientWidth;
        this.el.setAttribute('height', this.h);
    }
    Pie.prototype.setWidth = function () {
        this.w = this.parentEl.clientWidth;
        this.el.setAttribute('width', this.w)
    }
    Pie.prototype.calcCenter = function () {
        this.center = this.center || {}
        this.center.x = this.w/2;
        this.center.y  = this.h/2;
    }
    Pie.prototype.calcArcRad = function () {
        return this.prec*2*Math.PI/100 + 1.5*Math.PI; //+ 1.5*PI, because start in 1.5*PI, not in 0
    };
    Pie.prototype.print = function () {
        this.calcCenter();
        this.arc(this.center,  this.h/2-this.borderWidth/2, 1.5*Math.PI, this.calcArcRad(), false, this.borderWidth);
        this.round(this.center,  this.h/2-this.borderWidth);
        if(this.text){
            this.printText({text: this.prec+'%', center: this.center});
        }
    };
    // var pie = new Pie({'id':'pie-1', 'value': 89, 'font': '', 'borderWidth': '20', 'textColor': '#c0c0c0',  'innerColor': '', 'text': 'true'});
    // {'id':'pie-1', 'value': 35, 'font': '', 'borderWidth': '20', 'textColor': '#c0c0c0', 'borderColor': '#a0ffff', 'innerColor': '#0429ff', 'backgroundColor'}

// };
