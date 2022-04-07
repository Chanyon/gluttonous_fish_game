import {
  bgPic,
  cvs_width,
  cvs_height,
  ctx_two,
  anemones,
  fruits,
  fish_mother,
  fish_baby,
  ctx_one,
  score,
  wave,
  dust
} from "./init";
import { getDistance } from "./utils/utils";
import {FruitType} from "./fruits"
let lasttime = Date.now();
let deltatime = 0;

// 循环调用
export default function gameloop() {
  let now = Date.now();
  deltatime = now - lasttime;
  lasttime = now;
  if(deltatime > 40) deltatime = 40;
  // 绘制背景图
  drawBackground();
  // 绘制海葵
  anemones.draw();
  // 绘制果实
  fruits.draw();
  // 监视果实
  fruits.monitor();
  ctx_one.clearRect(0, 0, cvs_width, cvs_height);
  // 绘制鱼
  fish_baby.draw();
  fish_mother.draw();
  // 进行碰撞检测
  if(!score.gameOver){
    fishAndFruitsCollection();
    fishMotherAndBabyCollection();
  }
  // 绘制分数
  score.draw();
  // 绘制特效
  wave.draw();
  //绘制摆幅
  dust.draw();
  // 不断的循环 gameloop函数，且流畅性提升
  requestAnimationFrame(gameloop);
}
//绘制背景图
function drawBackground() {
  ctx_two.drawImage(bgPic, 0, 0, cvs_width, cvs_height);
}
// 碰撞检测
function fishAndFruitsCollection(){
  for (let i = 0; i < fruits.num; i++) {
    if(fruits.alive[i]){
      const distance = getDistance(
        {x:fruits.x[i], y:fruits.y[i]},
        {x:fish_mother.x, y:fish_mother.y}
        );
        // 距离小于20，让果实消失
        if(distance < 20){
          fruits.dead(i);
          score.fruitNum += 1;
          // 双倍模式 枚举FruitType.Blue
          if(fruits.fruitType[i] === FruitType.Blue){
            score.doubleMode = 2;
          }
          wave.born(fruits.x[i],fruits.y[i]);
        }
    }
  }
}
function fishMotherAndBabyCollection(){
  const distance = getDistance(
    {x:fish_baby.x, y:fish_baby.y},
    {x:fish_mother.x, y:fish_mother.y}
    );
    // 必须要鱼妈妈吃到了果实才能喂给小鱼
    if(distance < 20 && score.fruitNum != 0){
      fish_baby.recover();
      // 计分一次
      score.reset();
      fish_mother.BodyIndex = 0;
      wave.born(fish_baby.x,fish_baby.y,true);
    }
}

export { deltatime };
