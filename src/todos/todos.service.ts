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
    return this.todos.find((todo) => todo.id === Number(id));
  }

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
    return todo;
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
  }
}
