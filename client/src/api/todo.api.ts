import { PaginationQuery, Todo, TodoUpdate } from '../types';
/**
 * ============= API ==============
 */

const API_URL = '/v1';

function httpGET(url: string) {
  return fetch(url);
}

function httpPOST(url: string, todo: Todo) {
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
function httpPATCH(url: string, todo: TodoUpdate) {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
}

export async function fetchAllTodosAPI({ limit, page }: PaginationQuery) {
  return (await httpGET(`${API_URL}/todos?limit=${limit}&page=${page}`)).json();
}

export async function createTodoAPI(todo: Todo) {
  return (await httpPOST(`${API_URL}/todos`, todo)).json();
}
export async function deleteTodoAPI({ id }: { id: number }) {
  return (await httpDELETE(`${API_URL}/todos/${id}`)).json();
}
export async function editTodoAPI(id: number, update: TodoUpdate) {
  return (await httpPATCH(`${API_URL}/todos/${id}`, update)).json();
}
