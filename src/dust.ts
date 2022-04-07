import { deltatime } from "./game_loop";
import { cvs_height,cvs_width,ctx_one } from "./init";
import { dustImages } from "./utils/dustImages";

class Dust{
    dustPic:Array<HTMLImageElement> = [];
    x:number[] = [];
    y:number[] = [];
    amp:number[] = [];
    No:number[] = [];
    alpha:number = 0;
    num:number = 30;
    constructor(){
        for (let i = 0; i < 7;i++){
            this.dustPic[i] = new Image();
            this.dustPic[i].src = dustImages[i];
        }
        for (let j = 0; j < this.num; j++) {
            this.x[j] = Math.random()*cvs_width;
            this.y[j] = Math.random()*cvs_height;
            this.amp[j] = 20 + Math.random()*15;
            this.No[j] = Math.floor(Math.random()*7);
        }
        this.alpha = 0;
    }
    draw() {
        this.alpha += deltatime*0.001;
        const L = Math.sin(this.alpha);
        for (let i = 0; i < this.num;i++) {
            let no = this.No[i];
            ctx_one.drawImage(
                this.dustPic[no],
                this.x[i]+L*this.amp[i],
                this.y[i]
            )
        }
    }
}

export {
    Dust
}