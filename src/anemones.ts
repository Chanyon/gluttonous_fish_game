import { deltatime } from "./game_loop";
import { ctx_two,cvs_height } from "./init";

class Anemones{
    x:number[] = []; //x轴坐标
    height:number[] = []; // height
    head_x:number[] = []; //
    head_y:number[] = []; //
    num = 50;
    alpha:number = 0; //角度
    amp:number[] = []; //
    opacity:number[] = [];
    constructor(){
        for(let i = 0; i < this.num;i++){
            this.x[i] = i*16+Math.random()*20;
            this.head_x[i] = this.x[i];
            this.head_y[i] = cvs_height - 240 + Math.random()*80;
            this.amp[i] = 20 + Math.random()*30;
            this.opacity[i] = (Math.random()*0.6) + 6;
        }
    }
    draw(){
        this.alpha += deltatime * 0.001;
        let L = Math.sin(this.alpha);
        ctx_two.save();
        ctx_two.strokeStyle = "#3b154e";
        ctx_two.lineWidth = 20;
        ctx_two.lineCap = "round";

        for (let i = 0; i < this.num; i++) {
            this.head_x[i] = this.x[i] + L * this.amp[i];
            ctx_two.beginPath();
            ctx_two.globalAlpha = this.opacity[i];
            ctx_two.moveTo(this.x[i],cvs_height);
            // ctx_two.lineTo(this.x[i],cvs_height-this.height[i]);
            ctx_two.quadraticCurveTo(
                this.x[i],cvs_height - 100, //控制点
                this.head_x[i],this.head_y[i] //结束点
                );
            ctx_two.stroke();            
        }
        ctx_two.restore();
    }
}

export default Anemones;