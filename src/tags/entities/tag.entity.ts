import { PostEntity } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => PostEntity, (post) => post.tags)
    posts: PostEntity[];
}
