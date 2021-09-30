import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from 'src/interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get(':id')
  findOne(@Param() params): Todo {
    return this.todosService.findOne(params.id);
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    this.todosService.create(newTodo);
    return newTodo;
  }

  //   @Patch(':id')
  //   updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {

  //   }

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
