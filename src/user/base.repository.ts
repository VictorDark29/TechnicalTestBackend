import { Repository, EntityRepository } from 'typeorm';

@EntityRepository()
export class BaseRepository<T> extends Repository<T> {
  async findAll(): Promise<T[]> {
    return this.find();
  }

  async findOneById(id: number): Promise<T> {
    return this.findOneById(id);
  }

  async createEntity(entity: T): Promise<T> {
    return this.save(entity);
  }

  async updateEntity(id: number, entity: Partial<T>): Promise<T> {
    await this.updateEntity(id, entity);
    return this.findOneById(id);
  }

  async deleteEntity(id: number): Promise<void> {
    await this.delete(id);
  }
}
