import { ITodo, Todo } from "./models.js";
import {
    setInitialTodos,
    getInitialTodos,
} from "./storage.js";

type Callback = (data: ITodo[]) => void;

let todoList: ITodo[] = getInitialTodos();
let subscriptions: Callback[] = [];

export function addTodo(text: string): void {
    if (text && !todoList.some(elem => (elem.text === text))) {
        setTodos([
            ...todoList,
            new Todo(text),
        ]);
    }
}

export function removeTodos(index: number): void {
    const newList = [
        ...todoList.slice(0, index),
        ...todoList.slice(index + 1),
    ];
    setTodos(newList);
}

export function setTodoIsComplatade(index: number, isCompleted: boolean): void {
    setTodos(
        todoList.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    isCompleted,
                };
            }

            return item;
        })
    );
}

export function setTodoIsImportand(index: number, isImportand: boolean): void {
    setTodos(
        todoList.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    isImportand,
                };
            }

            return item;
        })
    );
}

export function getTodos(): ITodo[] {
    return todoList;
}

export function setTodos(todoListValue: ITodo[]): void {
    todoList = todoListValue;
    setInitialTodos(todoList);

    subscriptions.forEach(cb => {
        cb(todoList);
    })
}

export function addChangeListener(cb: (data: ITodo[]) => void) {
    subscriptions = [...subscriptions, cb];

    return () => {
        subscriptions = subscriptions.filter(item => item !== cb);
    };
}
