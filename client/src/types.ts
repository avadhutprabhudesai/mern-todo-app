type State = {
  isLoading: boolean;
  error: boolean;
  data: Todo[];
  blocked: number[];
};
type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: string;
};

export { Todo, State };
