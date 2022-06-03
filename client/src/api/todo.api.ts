import { Todo } from '../types';
/**
 * ============= API ==============
 */

function httpGET(url: string) {
  return fetch(url);
}

function httpPOST(url: string, todo: Omit<Todo, 'id' | 'createdAt'>) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
}

function httpDELETE(url: string) {
  return fetch(url, {
    method: 'DELETE',
  });
}
function httpPATCH(url: string, todo: Omit<Todo, 'id' | 'createdAt'>) {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
}

export async function fetchAllTodosAPI({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  return (
    await httpGET(`https://localhost:5000/v1/todos?limit=${limit}&page=${page}`)
  ).json();
}

export async function createTodoAPI(todo: Omit<Todo, 'id' | 'createdAt'>) {
  return (await httpPOST(`https://localhost:5000/v1/todos`, todo)).json();
}
export async function deleteTodoAPI({ id }: { id: number }) {
  return (await httpDELETE(`https://localhost:5000/v1/todos/${id}`)).json();
}
export async function editTodoAPI({ todo }: { todo: Todo }) {
  return (
    await httpPATCH(`https://localhost:5000/v1/todos/${todo.id}`, {
      title: todo.title,
      isDone: todo.isDone,
    })
  ).json();
}
