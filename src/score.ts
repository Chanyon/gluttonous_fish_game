import { deltatime } from "./game_loop";
import {cvs_one,ctx_one} from "./init";
class Score{
    //eat fruit 数量
    fruitNum;
    // 双倍模式
    doubleMode;
    // 总分
    total;
    // game over
    gameOver = false;
    // 设置透明度
    alpha = 0;

    constructor(){
        this.fruitNum = 0;
        this.doubleMode = 1;
        this.total = 0;
    }

    reset(){
        this.total += this.fruitNum * 10 * this.doubleMode;
        this.fruitNum = 0;
        this.doubleMode = 1;
    }

    draw(){
        const width = cvs_one.width;
        const height = cvs_one.height;
        ctx_one.save();
        ctx_one.fillStyle = "white";
        ctx_one.textAlign = "center";
        ctx_one.fillText("果实数量：",width*0.8-300,height-80);
        ctx_one.fillText("分数：",width*0.8-290,height-50);
        ctx_one.fillText(this.fruitNum.toString(),width*0.5,height-80);
        ctx_one.fillText(this.total.toString(),width*0.5,height-50);
        ctx_one.restore();

        if(this.gameOver){
            this.alpha += deltatime *0.005;
            if(this.alpha > 1){
                this.alpha = 1;
            }
            ctx_one.fillStyle = `rgba(255,255,255,${this.alpha})`;
            ctx_one.fillText("Game Over！",width*0.5,height*0.5);
        }
    }
}

export {Score}