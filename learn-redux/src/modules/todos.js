const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

let nextId = 1;
export const addTodo = (text) => ({
    type: ADD_TODO,
    todo: {
        id: nextId++,
        text,
    },
});
export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
});

const initialState = [
    /* 우리는 다음과 같이 구성된 객체를 이 배열 안에 넣을 것입니다.
  {
    id: 1,
    text: '예시',
    done: false
  } 
  */
];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(
                (todo) =>
                    todo.id === action.id // id 가 일치하면
                        ? { ...todo, done: !todo.done } // done 값을 반전시키고
                        : todo // 아니라면 그대로 둠
            );
        default:
            return state;
    }
}
