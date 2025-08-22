import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class ProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({nullable: true})
    username?: string;
    
    @Column({nullable: true})
    bio?: string;
    
    @Column({nullable: true})
    avatarUrl?: string;
    
    @Column({nullable: true})
    facebookUrl?: string;
    
    @Column({nullable: true})
    xUrl?: string;
}
