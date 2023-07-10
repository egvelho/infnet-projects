import type { ZodIssue } from "zod";

export type MaybeOutput<Entity> =
  | {
      success: true;
      data: Entity;
    }
  | {
      success: false;
      data: null;
      errors: ZodIssue[];
    };

export interface Repository<Entity> {
  findAll(): Promise<Entity[]>;
  findOne(id: number): Promise<Entity>;
  create(data: Partial<Entity>): Promise<MaybeOutput<Entity>>;
  delete(id: number): Promise<MaybeOutput<Entity>>;
  update(id: number, data: Partial<Entity>): Promise<MaybeOutput<Entity>>;
}
