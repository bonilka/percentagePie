console.log("include main.js")
// window.onload = function() {
    var Canva = function (data) {
        var canvas = data.el;
        this.prec = data['value'];
        this.borderColor = data['borderColor'] || 'rgb(41, 180, 194)';
        this.borderWidth = data['borderWidth'] || '20';
        this.backgroundColor = data['backgroundColor'] || 'transparent';
        this.textColor = data['textColor'] || '#000';
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
        this.context.fillStyle = this.backgroundColor;
        this.context.fill();
    };
    Canva.prototype.text = function (data) {
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        if(data.font){
            this.context.font = data.font;
        }else{
            this.context.font = 'normal 1em Helvetica, Arial, sans-serif'
        };
        this.context.fillStyle = this.textColor;
        this.context.fillText(data.text, data.center.x, data.center.y);
    };
    // var canva = new Canva(document.getElementById('pie-0'));
    // canva.arc();
    var Pie = function (data) {
        this.parentEl = document.getElementById(data['id']);
        this.createEl();
        this.calcCenter();
        console.log(this.el);
        data.el = this.el; //добавлям элемент в объект настроек
        Canva.call(this, data);
        this.print();
    }
    Pie.prototype = Object.create(Canva.prototype);
    Pie.prototype.constructor = Canva;
    Pie.prototype.createEl = function () {
        this.el = document.createElement('canvas');
        this.parentEl.appendChild(this.el);
        this.getWidth();
        this.getHeight();
        this.setHeight();
        this.setWidth();

    };
    Pie.prototype.setHeight = function () {
        //this.el.style.height = this.h+'px';
        // console.log(this.el);
        this.el.setAttribute('height', this.h);
    }
    Pie.prototype.getHeight = function () {
        this.h = this.parentEl.clientWidth;
    }
    Pie.prototype.getWidth = function () {
        this.w = this.parentEl.clientWidth;
    }
    Pie.prototype.setWidth = function () {
        this.el.setAttribute('width', this.w)
    }
    Pie.prototype.calcCenter = function () {
        this.center = this.center || {}
        this.center.x = this.w/2;
        this.center.y  = this.h/2;
    }
    Pie.prototype.calcArcRad = function () {
        return this.prec*2*Math.PI/100 + 1.5*Math.PI; //+ 1.5*PI, тк отстчет начинается 1.5*PI, а не с нуля
    };
    Pie.prototype.print = function () {
        this.arc(this.center,  this.h/2-this.borderWidth/2, 1.5*Math.PI, this.calcArcRad(), false, this.borderWidth);
        this.round(this.center,  this.h/2-this.borderWidth);
        this.text({text: this.prec+'%', center: this.center});
    };
    var pie = new Pie({'id':'pie-1', 'value': 99, 'font': '', 'borderWidth': '20', 'textColor': '#c0c0c0',  'innerColor': '#0429ff', 'backgroundColor': ''})
    // {'id':'pie-1', 'value': 35, 'font': '', 'borderWidth': '20', 'textColor': '#c0c0c0', 'borderColor': '#a0ffff', 'innerColor': '#0429ff', 'backgroundColor'}
    // pie.setHeight();
    // pie.getCenter()
    // console.dir(pie);

    // var PI = Math.PI
    // var canvas = document.getElementById("pie");
    // if (canvas.getContext){
    //     var context = canvas.getContext("2d");
    //
    //     context.beginPath();
    //     // context.moveTo(150, 100);
    //     // context.lineTo(250, 50);
    //     context.lineWidth = 10;
    //     context.strokeStyle = "#aa0000";
    //     context.arc(150, 100, 50, 1.5*PI, 2*PI, false);
    //     // context.lineCap = "round";
    //     context.stroke();
    // }
    // else {
    //     alert('Canvas not supported')
    // }

// };
