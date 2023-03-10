import { Todo, TodoList } from "../class";
import { todoList } from "../index.js";

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo).completado ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo).completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild )
    
    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup',(event)=>{
    //evento que escucha el teclado
    if (event.keyCode === 13 && txtInput.value.length>0){

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo)
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento   = event.target.parentElement.parentElement;//referencia al li
    const todoId         = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');// si visible está presente la elimina, de lo contrario la añade
    }else if(nombreElemento.includes('button')){//hay que borrar el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', ()=> {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>=0; i--){
        const element = divTodoList.children[i];

        if(element.classList.contains('completed')){
            divTodoList.removeChild(element)
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) {return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for( const element of divTodoList.children ){
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if (completado){
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado){
                    element.classList.add('hidden');
                }
                break;
        }
    }
})