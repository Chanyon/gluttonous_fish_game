import { cvs_height, ctx_two, anemones as ane } from "./init";
import orangeImg from "../assets/img/fruit.png";
import blueImg from "../assets/img/blue.png";
import { deltatime } from "./game_loop";

enum FruitType {
  Blue = 1,
  Orange
}

class Fruits {
  num = 30;
  alive: boolean[] = []; //is alive
  x: number[] = [];
  y: number[] = [];
  diameter: number[] = []; //果实直径
  speed: number[] = []; //控制果实成长速度
  orange = new Image(); //orange fruit
  blue = new Image(); // blue fruit
  fruitType:FruitType[] = []; //果实类型枚举
  aneNum:number[] = []; //记录果实出生时所在的海葵
  constructor() {
    for (let i = 0; i < this.num; i++) {
      this.aneNum[i] = 0;
      this.born(i);
    }
    this.orange.src = orangeImg;
    this.blue.src = blueImg;
  }
  born(v: number) {
    let aneId = Math.floor(Math.random() * ane.num);
    this.alive[v] = true;
    this.diameter[v] = 0; //果实的直径数组
    this.speed[v] = Math.random() * 0.02 + 0.005;
    this.aneNum[v] = aneId;
    this.fruitType[v] = (Math.random() > 0.7) ? FruitType.Blue : FruitType.Orange; //随机产生
  }
  draw() {
    for (let i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        // 渲染水果类型
        let img = this.fruitType[i] === FruitType.Orange ? this.orange : this.blue;
        if (this.diameter[i] <= 20) {
          this.diameter[i] += this.speed[i] * deltatime;
          this.x[i] = ane.head_x[this.aneNum[i]];
          this.y[i] = ane.head_y[this.aneNum[i]];
        } else {
          this.y[i] -= this.speed[i] * deltatime;
        }
        ctx_two.drawImage(
          img,
          this.x[i] - this.diameter[i] / 2,
          this.y[i] - this.diameter[i] / 2,
          this.diameter[i],
          this.diameter[i]
        );
      }
      if (this.y[i] <= -10) {
        this.alive[i] = false;
      }
    }
  }
  monitor() {
    let monitor_num = 0;
    for (let i = 0; i < this.num; i++) {
      if (this.alive[i]) monitor_num += 1;
      if (monitor_num < 15) {
        this.reset();
        return;
      }
    }
  }
  reset() {
    for (let i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        this.born(i);
        return;
      }
    }
  }
  dead(i: number) {
    this.alive[i] = false;
  }
}

export default Fruits;
export { FruitType };