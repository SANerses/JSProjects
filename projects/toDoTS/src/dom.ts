import {
    addTodo,
    getTodos,
    removeTodos,
    setTodoIsComplatade,
    setTodoIsImportand,
    addChangeListener,
} from "./logic.js";
import { ITodo } from "./models.js";

const DOM_STATE = {
    newTextInput: null,
    addButton: null,
    todoListElement: null,
};

export function init() {
    DOM_STATE.newTextInput = document.getElementById('newText') as HTMLInputElement;
    DOM_STATE.addButton = document.getElementById('addbtn') as HTMLButtonElement;
    DOM_STATE.todoListElement = document.getElementById('todo-list') as HTMLElement;
}

export function setupListeners() {
    DOM_STATE.newTextInput.addEventListener('keypress', event => {
        if (event.key === "Enter") {
            handleAddNewTodo();
        }
    });
    
    DOM_STATE.addButton.addEventListener('click', handleAddNewTodo);
    DOM_STATE.newTextInput.addEventListener('input', handleInputChange);

    addChangeListener(render)
}

export function render(listItems: ITodo[] = getTodos()): void {
    DOM_STATE.todoListElement.innerHTML = '';

    listItems.forEach((toDo, i) => {
        DOM_STATE.todoListElement.append(createTodoElement(toDo, i));
    });
}

function handleAddNewTodo() {
    const newVal = DOM_STATE.newTextInput.value;
    const listItems = getTodos();

    if (newVal.trim() && !listItems.some(({ text }) => text === newVal)) {
        addTodo(newVal);
        DOM_STATE.newTextInput.classList.remove('error');
        DOM_STATE.newTextInput.value = '';
    } else {
        DOM_STATE.newTextInput.classList.add('error');
    }
}

function handleInputChange(event) {
    const listItems = getTodos();

    if (listItems.some(({ text }) => text === (event.target as HTMLInputElement).value)) {
        DOM_STATE.newTextInput.classList.add('error');
    } else {
        DOM_STATE.newTextInput.classList.remove('error');
    }
}

function createTodoElement(toDo: ITodo, i: number) {
    const element: HTMLLIElement = document.createElement('li');
    element.classList.add('listItem');
    element.innerHTML = toDo.text;

    const divBlock: HTMLDivElement = document.createElement('div');
    divBlock.classList.add('show');

    const deletButton: HTMLButtonElement = document.createElement('button');
    deletButton.classList.add('iconContainer', 'deleteBtn');
    deletButton.innerHTML = '<div class="deleteButton trash-solid icon"></div>';

    const importantButton: HTMLButtonElement = document.createElement('button');
    importantButton.classList.add('iconContainer', 'importantBtn');
    importantButton.innerHTML = '<div class="importantButton paperclip icon"></div>';

    divBlock.appendChild(deletButton);
    divBlock.appendChild(importantButton);
    element.appendChild(divBlock);

    if (toDo.isCompleted) {
        element.classList.add('fixedItem');
    }

    if (toDo.isImportand) {
        element.classList.add('important');
    }

    element.addEventListener('click', function (event) {
        event.stopPropagation();
        setTodoIsComplatade(i, !toDo.isCompleted);
    });

    deletButton.addEventListener('click', function (event) {
        event.stopPropagation();
        element.remove();
        removeTodos(i);
    });

    importantButton.addEventListener('click', function (event) {
        event.stopPropagation();
        setTodoIsImportand(i, !toDo.isImportand);
    });

    return element;
}