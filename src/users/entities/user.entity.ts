import { PostEntity } from "src/posts/entities/post.entity";
import { ProfileEntity } from "src/profile/entities/profile.entity";
import { TagEntity } from "src/tags/entities/tag.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => ProfileEntity, { cascade: true })
    @JoinColumn()
    profile: ProfileEntity;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @OneToMany(() => PostEntity, (post) => post.author, { cascade: true })
    posts: PostEntity[];
}
