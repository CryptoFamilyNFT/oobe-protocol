import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @name User
 * @description User model for the database
 * @property {number} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {boolean} isActive - User active status
 * @example @Entity()
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    isActive!: boolean;
}