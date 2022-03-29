import { RoutesPath } from 'constants/routes';

export const routeTo = (history: any, route: RoutesPath, params?: any[]) => {
  const location = createRoute(route, params);
  history.push(location);
};

export const createRoute = (route: RoutesPath, params?: any[]) => {
  let res: any = route;

  if (route.includes('/?:')) {
    res = route.split('/?:')[0];
  } else {
    res = route.split('/:')[0];
  }

  if (!params) return res;

  params?.map((e) => (res += '/' + e));

  return res;
};
