# how to solve input delay (lagging) in react

we have two options when we are dealing with inputs in react realm:

1. [controlled component](https://reactjs.org/docs/forms.html#controlled-components)
2. [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html)

> **controlled components** :
> we update the value of the input by using `value` prop and `onChange` event

> **uncontrolled component** :
> DOM takes care of updating the input value. we can access the value by setting a `ref` on the input

There is a chance that you have encountered a situation that whenever you type something into an input or textarea there is a delay (lagging) and the input update is very slow. It is rather annoying and a bad user experience.

![example of slow input](./slow-nput.gif 'example')

This behavior is a side effect of using controlled components. let's see why and how we can mitigate the issue

## underlying cause

In controlled components, there is a cycle an input goes through.on every keystroke, we change some state(it could be in a global state like Redux or by `useState` hook), and React re-renders and set the input's value prop with the new state. This cycle could be expensive. That's why we face a delay while updating the input. another situation would be having a huge component that every keystroke causes the component to re-render.

![Untitled-2022-03-23-1209.png](./Untitled-2022-03-23-1209.png 're-render cycle')

examples:

-  there is a complex component (_e.g._, a big form with lots of inputs), and whenever the input changes, the whole component re-renders

-  a big web app with state management (_e.g._, redux, context) that on every keystroke changes something in the store that triggers a re-render of the whole app

## bounce, debounce might work?

if we bounce updating the global state and getting back the same value would add a delay making the input much worse. although it would be great to use it with [isolated component](#isolated-component-preferred).bounceing and debouncing is effective whenever we want to call an API and we don't want to fetch loads of information on every keystroke.

## solutions

there are a couple of ways that we could address this issue.

### Change to uncontrolled component

let's assume we have a component with a couple of inputs :

```javascript
function ComponentA() {
   const [value1, setState1] = useState();
   const [value2, setState2] = useState();
   const [value3, setState3] = useState();
   const handleSubmit = () => {
      //do something
   };
   <form onSubmit={handleSumbit}>
      <input value={value1} onChange={e => setState1(e.target.value)} />;
      <input value={value2} onChange={e => setState2(e.target.value)} />
      <input value={value3} onChange={e => setState2(e.target.value)} />
   </form>;
}
```

let's assume we have a component with a couple of inputs. we can change the code to use the uncontrolled component then input doesn't need to go through the re-rendering phase to get the value back.

```javascript
function ComponentB() {
   const input1 = useRef();
   const input2 = useRef();
   const input3 = useRef();
   const handleSubmit = () => {
      // let value1=input1.current.value
      // let value2=input2.current.value
      // let value3=input3.current.value
      // do something with them or update a store
   };
   return (
      <form onSubmit={handleSubmit}>
         <input ref={input1} />;
         <input ref={input2} />
         <input ref={input3} />
      </form>
   );
}
```

---

### onBlur

we can update our state (or global state) with the onBlur event. although it is not ideal in terms of user experience

```jsx
onInputBlur = (e) => {
   //setting the parent component state
   setPageValue(e.target.value);
}
onInputChange = (e) => {
   /*setting the current component state separately so that it will
      not lag anyway*/
   setState({inputValue: e.target.value});
}
   return (
      <input
         value = {this.state.inputValue}
         onBlur = {this.onInputBlur}
         onChange={this.onInputChange}
      >
   )
```

---

### Isolated component

the optimal solution is to use an isolated input component and manage the input state locally

```jsx
import { debounce } from 'lodash';
function ControlledInput({ onUpdate }) {
   const [value, setState] = useState();
   const handleChange = e => {
      setState(e.target.value);
      onUpdate(e.target.value);
   };
   return <input value={value} onChange={handleChange} />;
}
function ComponentB() {
   const input1 = useRef();
   const input2 = useRef();
   const input3 = useRef();
   const handleSubmit = () => {
      //do something with the values
   };
   return (
      <form onSubmit={handleSubmit}>
         <ControlledInput
            onUpdate={val => {
               input1.current = val;
               // update global state by debounce ,...
            }}
         />
         ;
         <ControlledInput
            onUpdate={val => {
               input1.current = val;
               // update global state by debounce ,...
            }}
         />
         ;
         <ControlledInput
            onUpdate={val => {
               input1.current = val;
               //update global state by debounce ,...
            }}
         />
         ;
      </form>
   );
}
```

we have the benefit of having a controlled component and not causing any unnecessary re-renders or going through an expensive one. we can make custom components that check for certain criteria and show success or error messages. now we can implement a bouncing, debouncing mechanism and update the global state or fetch an API. our input speed is natural and we wouldn't cause any unnecessary update or API calling on every keystroke.

\_I'd be happy to hear from you, let's connect on [Twitter](www.twitter.com/k1_kh89)
