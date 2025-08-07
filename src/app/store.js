import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import tasksReducer from '../features/tasks/tasksSlice';
import externalApiReducer from '../features/externalApi/externalApiSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    api: externalApiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);