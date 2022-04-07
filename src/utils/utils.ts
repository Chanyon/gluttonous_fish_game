// 获取DOM 和 context 的函数
function getCanvasAndContextById(
  id: string
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const dom = document.querySelector(`#${id}`) as HTMLCanvasElement;
  const ctx = dom.getContext("2d") as CanvasRenderingContext2D;
  return [dom, ctx];
}

//  function lerpDistance(aim: number,cur: number,ratio: number): number{
//     let delta = cur - aim;
//     return aim + delta * ratio;
// }
function lerpDistance(mousexory: number, ratio: number): number {
  let res = mousexory - mousexory * ratio;
  return res;
}
function lerpAngle(aim: number, cur: number, ratio: number): number {
  let delta = cur - aim;
  if (delta > Math.PI) delta = delta - 2 * Math.PI;
  if (delta < -Math.PI) delta = delta + 2 * Math.PI;
  return aim + delta * ratio;
}
interface Pointer {
    x: number;
    y: number;
}
/**
 * 计算两个点的距离
 * @param {Pointer} p1 坐标点
 * @param {Pointer} p2 坐标点
 * @returns 距离
 */
function getDistance(p1: Pointer, p2: Pointer): number {
    let distance = Math.pow((p1.x-p2.x),2) + Math.pow((p1.y-p2.y),2);
    return Math.sqrt(distance);
}
export { getCanvasAndContextById, lerpDistance, lerpAngle, getDistance};
