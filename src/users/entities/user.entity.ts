import { PostEntity } from "src/posts/entities/post.entity";
import { ProfileEntity } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => PostEntity, (post) => post.author, { cascade: true })
    posts: PostEntity[];
}
