export const todos = [];

export const addTodo = (
  title,
  description,
  completed = false,
  userId = undefined,
) => {
  const todo = {
    id: crypto.randomUUID(),
    title,
    description,
    completed,
    createdAt: new Date(),
  };

  if (userId !== undefined && userId !== null) {
    todo.userId = userId;
  }

  todos.push(todo);

  return todo;
};

export const getTodos = ({ completed, q } = {}) => {
  let sonuc = todos;

  // --- completed filtresi ---
  // completed bir string: "true", "false" ya da undefined.
  // Sadece bu iki değerden biriyse filtre uygula; başka bir şey
  // geldiyse (ör. ?completed=belki) filtreyi yok say.
  if (completed === "true" || completed === "false") {
    const beklenen = completed === "true";   // string → boolean
    sonuc = sonuc.filter((todo) => todo.completed === beklenen);
  }

  // --- q araması ---
  if (typeof q === "string" && q.trim() !== "") {
    const arama = q.toLowerCase();
    sonuc = sonuc.filter(
      (todo) =>
        todo.title.toLowerCase().includes(arama) ||
        todo.description.toLowerCase().includes(arama),
    );
  }

  return sonuc;
};

export const getTodoById = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return;
  }
  return todo;
};

export const getTodosByUserId = (userId) => {
  return todos.filter((todo) => todo.userId === userId);
};

export const replaceTodo = (id,title,description,completed) => {
  const i = todos.findIndex((todo) => todo.id === id);

  if (i === -1){
    return;
  }

  todos[i] = {
    id: todos[i].id,
    title,
    description,
    completed,
    userId: todos[i].userId,
    createdAt: todos[i].createdAt,
  };

  return todos[i];
};

export const updateTodo = (id, alanlar) => {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo){
    return;
  }

  if (alanlar.title !== undefined){
    todo.title = alanlar.title;
  }

  if (alanlar.description !== undefined){
    todo.description = alanlar.description;
  }

  if (alanlar.completed !== undefined){
    todo.completed = alanlar.completed;
  }

  return todo;
};

export const deleteTodo = (id) => {
  const i = todos.findIndex((todo) => todo.id === id);
  
  if (i === -1){
    return false;
  }

  todos.splice(i, 1);
  return true;
};