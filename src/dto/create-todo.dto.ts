export class CreateTodoDto {
  readonly id: number;
  readonly title: string;
  readonly description?: string;
  readonly status: boolean;
}
