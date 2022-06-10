import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from 'src/interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Get()
  @HttpCode(200)
  findAll(): Todo {
    return this.todosService.findAll();
  }

  @Post()
  @HttpCode(201)
  createTodo(@Body() newTodo: CreateTodoDto) {
    return this.todosService.create(newTodo);
  }

  @Patch(':id')
  @HttpCode(200)
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteTodo(@Param() params) {
    return this.todosService.delete(params.id);
  }

  // Get and pass in a particular parameter token to the decorator
  /*
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(id);
  }
  */

  // Using Promise
  /*
  @Get()
  async findAll(): Promise<CreateTodoDto[]> {
    return await this.todosService.findAll();
  }
  */

  // Using Observable
  /*
  @Get()
  findAll(): Observable<CreateTodoDto[]> {
    return of(this.todosService.findAll());
  }
  */
}
