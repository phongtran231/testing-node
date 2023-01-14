import { FootBallTeam } from './foot-ball-team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const tableName = 'foot_ball_matches';

@Entity({ name: tableName })
export class FootBallMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  on_time: Date;

  @Column()
  home_team_id: number;

  @Column()
  guest_team_id: number;

  @Column()
  home_score: number;

  @Column()
  guest_score: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  @OneToOne(() => FootBallTeam)
  @JoinColumn({ referencedColumnName: 'id', name: 'home_team_id' })
  homeTeam: FootBallTeam;

  @OneToOne(() => FootBallTeam)
  @JoinColumn({ referencedColumnName: 'id', name: 'guest_team_id' })
  guestTeam: FootBallTeam;
}
