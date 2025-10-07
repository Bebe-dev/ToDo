export const addTodo = (text: any) => {
    return {
      type: "ADD_TASK",
      payload: {
        id: new Date().getTime(),
        text: text,
      },
    };
  };
  
  export const deleteTodo = (id: any) => {
    return {
      type: "DELETE_TASK",
      payload: id,
    };
  };