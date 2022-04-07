import {
  ctx_one,
  cvs_height,
  cvs_width,
  mouse_x,
  mouse_y,
  fish_mother,
  score,
} from "./init";
import { lerpAngle } from "../src/utils/utils";
// 可以单独用一个文件重导出这一堆图片
import bigEye0 from "../assets/img/bigEye0.png";
import bigEye1 from "../assets/img/bigEye1.png";

import bigSwim0 from "../assets/img/bigSwim0.png";
import bigSwim1 from "../assets/img/bigSwim1.png";
import bigSwim2 from "../assets/img/bigSwim2.png";
import bigSwim3 from "../assets/img/bigSwim3.png";
import bigSwim4 from "../assets/img/bigSwim4.png";
import bigSwim5 from "../assets/img/bigSwim5.png";
import bigSwim6 from "../assets/img/bigSwim6.png";
import bigSwim7 from "../assets/img/bigSwim7.png";

import bigSwimBlue0 from "../assets/img/bigSwimBlue0.png";
import bigSwimBlue1 from "../assets/img/bigSwimBlue1.png";
import bigSwimBlue2 from "../assets/img/bigSwimBlue2.png";
import bigSwimBlue3 from "../assets/img/bigSwimBlue3.png";
import bigSwimBlue4 from "../assets/img/bigSwimBlue4.png";
import bigSwimBlue5 from "../assets/img/bigSwimBlue5.png";
import bigSwimBlue6 from "../assets/img/bigSwimBlue6.png";
import bigSwimBlue7 from "../assets/img/bigSwimBlue7.png";

import bigTail0 from "../assets/img/bigTail0.png";
import bigTail1 from "../assets/img/bigTail1.png";
import bigTail2 from "../assets/img/bigTail2.png";
import bigTail3 from "../assets/img/bigTail3.png";
import bigTail4 from "../assets/img/bigTail4.png";
import bigTail5 from "../assets/img/bigTail5.png";
import bigTail6 from "../assets/img/bigTail6.png";
import bigTail7 from "../assets/img/bigTail7.png";
import { deltatime } from "./game_loop";
import { babyTailImg, babyEyeImg, babyFadeImg } from "./utils/babyImages";

class FishMother {
  //坐标(x,y)
  x: number;
  y: number;
  // 为动画做准备HTMLImageElement[]
  bigEye: HTMLImageElement[] = [];
  bigBody: HTMLImageElement[] = [];
  private _bigBody: HTMLImageElement[] = [];
  //尾巴
  bigTail: HTMLImageElement[] = [];
  //鱼的角度
  angle: number = 0;
  // 渲染索引
  EyeIndex: number = 0;
  BodyIndex: number = 0;
  TailIndex: number = 0;
  // 计算时间
  EyeTimer: number = 0;
  BodyTimer: number = 0;
  TailTimer: number = 0;
  // 设置时间间隔
  EyeInterval: number = 300;
  BodyInterval: number = 1000;
  TailInterval: number = 50;
  // 导入的图片
  imgEye: any[] = [bigEye0, bigEye1];
  imgBody: any[] = [
    bigSwim0,
    bigSwim1,
    bigSwim2,
    bigSwim3,
    bigSwim4,
    bigSwim5,
    bigSwim6,
    bigSwim7,
  ];
  blueImgBody:any[] = [ 
    bigSwimBlue0,
    bigSwimBlue1,
    bigSwimBlue2,
    bigSwimBlue3,
    bigSwimBlue4,
    bigSwimBlue5,
    bigSwimBlue6,
    bigSwimBlue7,]
  imgTail: any[] = [
    bigTail0,
    bigTail1,
    bigTail2,
    bigTail3,
    bigTail4,
    bigTail5,
    bigTail6,
    bigTail7,
  ];

  constructor() {
    for (let i = 0; i < 2; i++) {
      this.bigEye[i] = new Image();
      this.bigEye[i].src = this.imgEye[i];
    }
    for (let i = 0; i < 8; i++) {
      this._bigBody[i] = new Image();
      this._bigBody[i].src = this.blueImgBody[i];
      this.bigBody[i] = new Image();
      this.bigBody[i].src = this.imgBody[i];
    }
    for (let i = 0; i < 8; i++) {
      this.bigTail[i] = new Image();
      this.bigTail[i].src = this.imgTail[i];
    }
    this.x = cvs_width / 2;
    this.y = cvs_height / 2;
  }
  checkImageIndex() {
    this.EyeTimer += deltatime;
    this.TailTimer += deltatime;
    this.BodyTimer += deltatime;

    if (this.EyeTimer > this.EyeInterval) {
      this.EyeIndex = (this.EyeIndex + 1) % 2;
      this.EyeTimer %= this.EyeInterval;
      if (this.EyeIndex === 0) {
        this.EyeInterval = Math.random() * 1500 + 2000;
      } else {
        this.EyeInterval = 300;
      }
    }
    if (this.TailTimer > this.TailInterval) {
      this.TailIndex = (this.TailIndex + 1) % 8;
      this.TailTimer %= this.TailInterval;
    }

    if (this.BodyTimer > this.BodyInterval) {
      this.BodyIndex = this.BodyIndex + 1;
      this.BodyTimer %= this.BodyInterval;
      if (this.BodyIndex > 7) {
        this.BodyIndex = 7;
      }
    }
  }
  draw() {
    this.checkImageIndex();

    this.x = mouse_x - mouse_x * 0.09;
    this.y = mouse_y - mouse_y * 0.09;

    //边x
    let instance_x = mouse_x - this.x;
    //边y
    let instance_y = mouse_y - this.y;
    let ag = Math.atan2(instance_y, instance_x) + Math.PI;
    // this.angle = lerpAngle(ag, this.angle,.9);
    this.angle = ag;
    ctx_one.save();
    ctx_one.translate(this.x, this.y);
    ctx_one.scale(0.8, 0.8);
    ctx_one.rotate(this.angle);
    ctx_one.drawImage(
      this.bigEye[this.EyeIndex],
      -this.bigEye[this.EyeIndex].width / 2,
      -this.bigEye[this.EyeIndex].height / 2
    );
    if(score.doubleMode === 2){
      ctx_one.drawImage(
        this.bigBody[this.BodyIndex],
        -this._bigBody[this.BodyIndex].width / 2,
        -this._bigBody[this.BodyIndex].height / 2
      );
    }else{
      ctx_one.drawImage(
        this.bigBody[this.BodyIndex],
        -this.bigBody[this.BodyIndex].width / 2,
        -this.bigBody[this.BodyIndex].height / 2
      );
    }
    ctx_one.drawImage(
      this.bigTail[this.TailIndex],
      -this.bigTail[this.TailIndex].width / 2 + 30,
      -this.bigTail[this.TailIndex].height / 2
    );
    ctx_one.restore();
  }
}

class FishBaby extends FishMother {
  x: number = cvs_width / 2 + 50; //x坐标
  y: number = cvs_height / 2 + 50;
  BodyInterval: number = 300;
  constructor() {
    super();
    for (let i = 0; i < 2; i++) {
      this.bigEye[i] = new Image();
      this.bigEye[i].src = babyEyeImg[i];
    }
    for (let i = 0; i < 20; i++) {
      this.bigBody[i] = new Image();
      this.bigBody[i].src = babyFadeImg[i];
    }
    for (let i = 0; i < 8; i++) {
      this.bigTail[i] = new Image();
      this.bigTail[i].src = babyTailImg[i];
    }
  }
  checkImageIndex() {
    this.EyeTimer += deltatime;
    this.TailTimer += deltatime;
    this.BodyTimer += deltatime;

    if (this.EyeTimer > this.EyeInterval) {
      this.EyeIndex = (this.EyeIndex + 1) % 2;
      this.EyeTimer %= this.EyeInterval;
      if (this.EyeIndex === 0) {
        this.EyeInterval = Math.random() * 1500 + 2000;
      } else {
        this.EyeInterval = 300;
      }
    }
    if (this.TailTimer > this.TailInterval) {
      this.TailIndex = (this.TailIndex + 1) % 8;
      this.TailTimer %= this.TailInterval;
    }

    if (this.BodyTimer > this.BodyInterval) {
      this.BodyIndex = this.BodyIndex + 1;
      this.BodyTimer %= this.BodyInterval;
      if (this.BodyIndex > 19) {
        this.BodyIndex = 19;
        // console.log("game over!");
        score.gameOver = true;
      }
    }
    // console.log(this.BodyIndex);
  }
  recover() {
    this.BodyIndex = 0;
  }

  draw() {
    this.checkImageIndex();
    this.x = fish_mother.x - fish_mother.x * 0.09;
    this.y = fish_mother.y - fish_mother.y * 0.09;

    let instance_x = fish_mother.x - this.x;
    let instance_y = fish_mother.y - this.y;

    let ag = Math.atan2(instance_y, instance_x) + Math.PI;
    this.angle = ag;
    ctx_one.save();
    ctx_one.translate(this.x, this.y);
    ctx_one.rotate(this.angle);
    ctx_one.scale(0.6, 0.6);
    ctx_one.drawImage(
      this.bigTail[this.TailIndex],
      -this.bigTail[this.TailIndex].width / 2 + 30,
      -this.bigTail[this.TailIndex].height / 2
    );
    ctx_one.drawImage(
      this.bigBody[this.BodyIndex],
      -this.bigBody[this.BodyIndex].width / 2,
      -this.bigBody[this.BodyIndex].height / 2
    );
    ctx_one.drawImage(
      this.bigEye[this.EyeIndex],
      -this.bigEye[this.EyeIndex].width / 2,
      -this.bigEye[this.EyeIndex].height / 2
    );
    ctx_one.restore();
  }
}

export { FishMother, FishBaby };
