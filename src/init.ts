//game init;
import { getCanvasAndContextById } from "./utils/utils";
import Anemones from "./anemones";
import Fruits from "./fruits";
import imgSrc from "../assets/img/background.jpg";
import { FishMother ,FishBaby} from "./fish-mother";
import { Score } from "./score";
import { Wave } from "./wave";
import { Dust } from "./dust";
let cvs_one: HTMLCanvasElement;
let cvs_two: HTMLCanvasElement;
let ctx_one: CanvasRenderingContext2D;
let ctx_two: CanvasRenderingContext2D;
let cvs_width: number, cvs_height: number;
let mouse_x: number, mouse_y: number; //鱼的坐标
let anemones: Anemones, 
    fruits: Fruits, 
    fish_mother: FishMother,
    fish_baby:FishBaby,
    score: Score,
    wave: Wave,
    dust: Dust;
const bgPic = new Image();

function init() {
  [cvs_one, ctx_one] = getCanvasAndContextById("one");
  [cvs_two, ctx_two] = getCanvasAndContextById("two");
  bgPic.src = imgSrc;

  cvs_width = cvs_one.width;
  cvs_height = cvs_one.height;
  // 创建对象
  anemones = new Anemones();
  fruits = new Fruits();
  fish_mother = new FishMother();
  fish_baby = new FishBaby();
  score = new Score();
  wave = new Wave();
  dust = new Dust();
  //添加鼠标事件监听，更新mouse坐标
  cvs_one.addEventListener("mousemove", mouseMove, false);
}

function mouseMove(e: MouseEvent) {
  if (!score.gameOver && (e.offsetX || e.offsetY)) {
    mouse_x = typeof e.offsetX === "undefined" ? 0 : e.offsetX;
    mouse_y = typeof e.offsetY === "undefined" ? 0 : e.offsetY;
  }
}
export {
  bgPic,
  cvs_width,
  cvs_height,
  ctx_two,
  ctx_one,
  init,
  anemones,
  fruits,
  fish_mother,
  fish_baby,
  mouse_x,
  mouse_y,
  cvs_one,
  score,
  wave,
  dust
};
