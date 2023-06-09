import {StackActions, CommonActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(r) {
  _navigator = r;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      name: routeName,
      params: params,
    }),
  );
}

function back() {
  _navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  back,
  replace,
};
