import reducers from './reducers';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import watchAuthProcess from './effects/auth.effects';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchAuthProcess);

export default store;