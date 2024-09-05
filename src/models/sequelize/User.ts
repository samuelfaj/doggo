import {
	Table,
	Column,
	Model,
	DataType,
	CreatedAt,
	UpdatedAt,
	DeletedAt,
	ForeignKey,
	BelongsTo,
	Index,
} from 'sequelize-typescript';

@Table({
	tableName: 'User',
	timestamps: true,
	paranoid: true,
})
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;
  
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password!: string;
}
