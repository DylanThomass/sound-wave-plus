import { Button, NavBar, Swipe, SwipeItem, Tabbar, TabbarItem, Loading } from "vant";

export function setupVant(app) {
  app.use(Button);
  app.use(NavBar);
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Loading);
}
