import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class myntra extends Model {
  @PrimaryKey
  @Column
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
