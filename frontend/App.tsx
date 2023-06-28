// hatchify-app/frontend/App.tsx
import { hatchifyReact, MuiProvider, createJsonapiClient } from "@hatchifyjs/react";
import { Todo } from "../schemas/Todo";
import { User } from "../schemas/User";

export const hatchedReact = hatchifyReact(
  { Todo, User },
  createJsonapiClient("http://hatchify-grid-demo.bitovi-sandbox.com:3000/api", {
    Todo: { endpoint: "todos" },
    User: { endpoint: "users" },
  })
);

const TodoList = hatchedReact.components.Todo.List;

const App: React.FC = () => {
  return (
    <MuiProvider>
      <TodoList />
    </MuiProvider>
  )
};

export default App;