import { all, fork } from 'redux-saga/effects';
// import ProfileSaga from 'store/profile/saga';
import  getMyProfileSaga  from './auth/saga';
import loginSaga from './auth/saga';

export default function* rootSaga() {
  yield all([
    // fork(ProfileSaga),
    fork(getMyProfileSaga),
    fork(loginSaga),
  ]);
}