import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'foot_ball_teams' })
export class FootBallTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;
}
