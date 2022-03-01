const Todo = (props) => <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
  <span>
    {props.todo.text} 
  </span>
  {props.todo.done ? props.doneInfo : props.notDoneInfo}
</div>

export default Todo