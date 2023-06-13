import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({default:true})
    isActive:boolean;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn({nullable:true})
    updated_at:Date;

    @DeleteDateColumn()
    deleted_at:Date;

    @Column({nullable:true})
    deleted_by:number;
}