"use client"
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DataStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ReduxExamples from "./ReduxExamples/page";
import { Provider } from "react-redux";
import store from "./store";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  };
  return (
    <Provider store={store}>
    <div id="wd-lab4">
      <h2>Lab 4 - React Events</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions someFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ReduxExamples />
    </div>
    </Provider>
  );
}