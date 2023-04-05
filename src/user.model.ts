import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table
export class myntra extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column
  productId: string;

  @Column
  ProductLink: string;

  @Column
  category: string;

  @Column
  discount: string;

  @Column
  autoUpdateTime: Date;
}
