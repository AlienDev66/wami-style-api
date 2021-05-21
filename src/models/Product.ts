import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  color: string;

  @Column()
  main_detail: string;

  @Column()
  description: string;

  @Column()
  specification: string;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "product_id" })
  images: Image[];
}
