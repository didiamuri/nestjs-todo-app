import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from 'src/interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Todos app',
      description: 'Create NestJs todos app',
      status: true,
    },
    {
      id: 2,
      title: 'Eat',
      description: 'Eating out at lunch',
      status: true,
    },
    {
      id: 3,
      title: 'bread',
      description: 'Buy bread',
      status: false,
    },
  ];

  findOne(id: string) {
    return {
      statusCode: 200,
      statusText: 'success',
      item: this.todos.find((todo) => todo.id === Number(id))
    }
  }

  findAll(): any {
    return {
      statusCode: 200,
      statusText: 'success',
      items: this.todos,
    };
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
    return {
      statusCode: 201,
      statusText: 'success',
      item: todo,
    };
  }

  update(id: string, todo: Todo) {
    // retrieve the todo to update
    const todoToUpdate = this.todos.find((t) => t.id === Number(id));
    if (!todoToUpdate) {
      new NotFoundException();
    }
    // apply to granulary update a single proprerty
    if (todo.hasOwnProperty('status')) {
      todoToUpdate.status = todo.status;
    }
    if (todo.title) {
      todoToUpdate.title = todo.title;
    }
    if (todo.description) {
      todoToUpdate.description = todo.description;
    }
    const updatedTodos = this.todos.map((t) =>
      t.id !== +id ? t : todoToUpdate,
    );
    this.todos = [...updatedTodos];
    return {
      statusCode: 200,
      statusText: 'Updated todo success',
      item: todoToUpdate,
    };
  }

  delete(id: string) {
    const nbOfTodosBeforeDelete = this.todos.length;
    this.todos = [...this.todos.filter((t) => t.id !== +id)];
    if (this.todos.length < nbOfTodosBeforeDelete) {
      return {
        statusCode: 200,
        message: 'Todo deleted success',
        teletedItem: 1,
      };
    } else {
      return {
        statusCode: 200,
        message: 'Todo deleted falled',
        teletedItem: 0,
      };
    }
  }
}
