import { Expose } from 'class-transformer';
export class ArticleDto {
  @Expose()
  name: string;
}
