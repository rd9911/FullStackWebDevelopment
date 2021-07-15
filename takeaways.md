#6
Flux architechture provides a guide on how and where apps' states are stored. Basically, flux architecture has 4 base steps of functioning. The first one is Actions. Actions are any action related to a state. Then it goes to Dispatcher. Dispatcher plays a middleman between Action and states. But states are not in the available place for everyone. States are all stored in Store and only Dispatcher has access to this store. So no one can directly access to the states of an app. When Dispatcher has done the needed action on the state e.g rendered, changed the page will be rerendered to represent the Action on the webpage.  

Actions are JavaScript Objects that  at least have "type" field and they are used in order to change the state of the application. Actions are never supposed to be done directly from application's code but only through `createStore(reducer(state, action))`. Note that parameter of `createStore()` is `reducer(state, action)` which defines the functionality of the action and must `return` the new state after teh action. Within `reducer(state, action)` is advisable to use `switch` method rather than `if/else` methods for the sake of simplicity. After instantiating `createStore(reducer(state, action))`, we can start to do actions with `.dispatcher( { type: ... } )`. You may wonder about the `{type: '...'}` of `.dispatcher()` method but there is nothing new here. Do you remmember the beginning of the paragraph where we defined what Actionns as JavaScript Objects? So, we have that's how the actions can be seen within the code. Another method of `store` is `.getState()` which returns the current state of the application. And the last but not the least one is `.subscribe(callback)` which defimes how the application should behave after each action. Before we pass callback into the `.subscribe()` we need to call it once because without this call application will never render the state in the first visit.

There are some basic assumptions of Redux reducer. The first one is "reducer should always be a pure function". Pure functions are functions that have no side effects and return always the same output when the same input is given. The second one is "state should be immutable objects and in order to change it, it should be replaced by the new state rather than changing directly from the original state". We can install `deep-freeze` package in order to cehck whether our reducer is defined correctly. And we can work in test-driven-development in which we first define tests and then features. In order to have access to our reducer we can place it in its own directory `src/reducer/whateverReducer.js`.

Array spreading.
We are already familiar with `concat` method. It is possible to achieve the smae functionality with "Array spread" method: 
```
const nums = [1, 2, 3, 4]
const spreadMethod = [...nums, 5, 6]
console.log(spreadMethod) // expected output: [1, 2, 3, 4, 5, 6]
```
There dots ([...]) are essential because without it we just nesting arrays (defining array within another array).
Almost the same structure can be used when we want to destrcuture (get several elements from the object/array as variables in once ) the array:
```
const nums = [1, 2, 3, 4]
const [fir, sec, ...others] = nums
console.log(fir) // expected output: 1
console.log(sec) // expected output: 2
console.log(others) // expected output: [3, 4]
```

Uncontrolled forms are forms that don't bound forms' fields to the app's states right away. It also has some limitations e.g can't disable the submit button based on input or dynamic error messaging. We can get access to the fields of forms through `evnt.target.nameOfField.value`.

Action creators.
It is not necessary for redux components to know Redux types and data `{ type: ... , data: {...} }`so we can separate them into its own functions (into reducer's file). Then App() only will have its functions for getting value of inputs of forms and passing that value into `.dispatch()`.

ppp

state and structure is saved in reducer's file. store is defined in index.js with the help of `createStore()`.

ppp

Forwarding Redux-Store to various components.
separate App(), how can components access to states of apps, react-redux, if many coponents App() pass store as props to all of them, default/normal exports {import}, useSelector(), useDispatch(), 
Now we should separate our App() but right after this decision teh question comes to the mind: how can App() and other components can access to the `store` after separation? `react-redux` library can help us to solve this problem since it allows us to access to the `store` from any point of application. So after we moved the `App()` in index.js it becomes the child of <Provider>. App's store is given to `<Provider store={createStore(reducer)}>`. Note that if app has multiple components then `App()` needs to pass `store` as props to all components. In `react-redux` there are 2 hooks that we need to get the state and change the state: `useSelector(), useDispatcher()`. `useSelector(state => state)` searches for element from redux-store and returns it. `useDispatcher(actionCreator)` provides a way to get access to redux-store and do the intended action. A lot of times `useSelectore()` implements query selections in which we can search and get access to specific elements in redux-store
Notes about exporting functions. A file can't have more than one `default` export variable/function but can have multiple "normal" (`export const nameOfVar`) variables/functions. 

presentational components, container component