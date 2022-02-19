import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', name: 'name' })
    name: string;

    @ApiProperty()
    @Column({ type: 'int', name: 'age' })
    age: number

    @ApiProperty()
    @Column({ type: 'varchar', name: 'hobby' })
    hobby: string;
    
    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;
}