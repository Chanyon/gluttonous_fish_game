import { ctx_one } from "./init";
import { deltatime } from "./game_loop";

// 特效
class Wave{
    x: number[] = [];
    y: number[] = [];
    alive:boolean[] = [];
    radius:number[] = [];
    type:boolean[] = []; //记录碰撞类型
    num:number = 20;
    constructor(){
        for (let i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.type[i] = false;
            this.radius[i] = 0;
        }
    }

    draw(){
        for (let i = 0; i < this.num;i++) {
            if(this.alive[i]) {
                if(this.radius[i] > 50){
                    this.alive[i] = false;
                    continue;
                }
                ctx_one.save();
                ctx_one.shadowBlur = 5;
                ctx_one.shadowColor = "#fff";
                ctx_one.lineWidth = 5;
                if(this.type[i]){
                    this.radius[i] += deltatime*0.04;
                    let alpha = 1-(this.radius[i] / 80);
                    ctx_one.strokeStyle = `rgba(203,91,0,${alpha})`;
                }else{
                    this.radius[i] += deltatime*0.05;
                    let alpha = 1-(this.radius[i] / 50);
                    ctx_one.strokeStyle = `rgba(203,91,0,${alpha})`;
                }
                ctx_one.beginPath();
                ctx_one.arc(this.x[i],this.y[i],this.radius[i],0,2*Math.PI);
                ctx_one.closePath();
                ctx_one.stroke();
                ctx_one.restore();
            }
        }
    }
    born(x:number,y:number,type = false){
        for (let i = 0; i < this.num; i++) {
            if(!this.alive[i]){
                this.alive[i] = true;
                this.radius[i] = 20;
                this.x[i] = x;
                this.y[i] = y;
                this.type[i] = type;
            }
        }
    }
}

export {Wave}