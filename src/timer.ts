import { Timer } from "three/examples/jsm/misc/Timer.js";
import { resizeRendererToDisplaySize } from "./utils/resize";
import renderer from "./renderer";
import camera from "./camera";
import scene from "./scene";
import controls from "./controls";
import stats from "./utils/stats";

const timer = new Timer();

export default timer;

export const tick = () => {
  stats.begin();
  timer.update();
  
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  renderer.render(scene, camera);
  controls.update();
  stats.end();
  requestAnimationFrame(tick);
};
