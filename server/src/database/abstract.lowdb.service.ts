import { NotFoundException } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { v1 as uuid } from 'uuid';

export abstract class AbstractLowDbService<T> {
  private db: lowdb.LowdbAsync<T>;

  constructor(protected dataStore: string, private entity: string) {
    this.initDatabase(dataStore);
  }

  getAll(): T[] {
    return this.getDataStore().value();
  }

  getById(id: string): T {
    const entity: T = this.findByProp('id', id);

    if (!entity) {
      throw new NotFoundException(`${this.entity} with ID "${id}" not found`);
    }

    return entity;
  }

  create(payload: T): T {
    const entity: T = { ...payload, id: uuid() };
    this.getDataStore().push(entity).write();
    return entity;
  }

  update(id: string, payload: T): T {
    const entity: T = this.getById(id);
    this.getDataStore().find({ id  }).assign(payload).write();
    return entity;
  }

  delete(id: string): T {
    const entity = this.getById(id);
    this.getDataStore().remove({ id }).write();
    return entity;
  }

  protected getDataStore(dataStore: string = this.dataStore) {
    return this.db.get(dataStore);
  }

  protected findByProp(key: string, value: any): T {
    return this.getDataStore().find({ [key]: value }).value();
  }

  private initDatabase(dataStore: string): void {
    const adapter = new FileSync('db.json');
    this.db = lowdb(adapter);

    if (!this.db.get(dataStore).value()) {
      this.db.set(dataStore, []).write();
    }
  }
}
