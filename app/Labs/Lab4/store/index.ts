import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "c:/Users/jessi/fall25/webdev/kambaz-next-js/app/Labs/Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "c:/Users/jessi/fall25/webdev/kambaz-next-js/app/Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "c:/Users/jessi/fall25/webdev/kambaz-next-js/app/Labs/Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "c:/Users/jessi/fall25/webdev/kambaz-next-js/app/Labs/Lab4/ReduxExamples/todos/todosReducer";
const store = configureStore({
  reducer: { helloReducer, counterReducer, addReducer, todosReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;