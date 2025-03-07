import "vant/lib/index.css"; // Vant 基础样式
import { Button, Toast, Dialog, NavBar, Cell, CellGroup } from "vant";

export function setupVant(app) {
  app.use(Button);
  app.use(Toast);
  app.use(Dialog);
  app.use(NavBar);
  app.use(Cell);
  app.use(CellGroup);
}
