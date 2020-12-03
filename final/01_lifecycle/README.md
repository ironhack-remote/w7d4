# React Lifecycle Methods

There are 3 lifecycle methods that you should at least know about. Those lifecycle methods signify different stages of a component's `lifetime` on the DOM.

Lets remember the timeline:

if in a class component
- State is set
- The render method is called
- Props or state is updated
- The render method is called

In a functional component (because it has no state)
- Receives Props (optional)
- Component Renders
- Props are updated
- Component Rerenders 

## 👇 only applies to Class Components
Now, with new knowledge, you have 3 new lifecycle methods:

In reality `React` is aware that there are different stages of the lifetime of a React `class` component. So it gives us the ability to **tap into** this stages. They are the:
1. Component Mounting
2. Component Updating 
3. Right before the component leaves the DOM


The way that react deals with a component is now looked a little bit differently

- State is set
- The render method is called
- componentDidMount method gets called
- Props or state is updated
- componentDidUpdate method gets called
- The render method is called
- Whenever the component is about to leave the DOM: `componentWillUnmount` gets called.

How do these function look like?
```jsx

componentDidMount = () => {
   // do something here
}

```

```jsx
// prevProps, prevState -> both of these arguments are optional
componentDidUpdate = (prevProps, prevState) => {
   // do something here
}
```

```jsx
componentWillUnmount = () => {
   // do something here
}
```