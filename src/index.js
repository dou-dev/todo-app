//importando modulos
import './styles.css';

import { TodoList } from './class/index'
import { crearTodoHtml } from './js/componentes';

//instancia de la clase todolist
export const todoList = new TodoList(); 

//retorno y llama los elementos internamente
todoList.todos.forEach( crearTodoHtml ); 