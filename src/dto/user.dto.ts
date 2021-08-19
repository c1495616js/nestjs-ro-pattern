import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { ArticleDto } from './article.dto';
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => ArticleDto)
  articles?: ArticleDto[];
}
