import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga} from './redux';

const sagaMiddleware  = createSagaMiddleware();

var middleware = applyMiddleware(sagaMiddleware);

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, {} , composeEnhancers(middleware));


sagaMiddleware.run(rootSaga); 