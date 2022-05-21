import Document from '../../entities/Document';
import IDocumentRepository from '../../Repositories/IDocumentRepository';

class FakeDocumentRepository implements IDocumentRepository {
  private registers: Document[] = [];

  public async findById(
    id: number,
    userId: number,
  ): Promise<Document | undefined> {
    const user = this.registers.find(
      item => item.id === id && item.userId === userId,
    );
    return user;
  }

  public async search(keyWord: string, userId: number): Promise<Document[]> {
    let registers = [...this.registers];
    if (keyWord !== '') {
      const filter = keyWord.toLowerCase();
      registers = registers.filter(
        item =>
          item.title.toLowerCase().includes(filter) ||
          (item.description && item.description.toLowerCase().includes(filter)),
      );
    }
    registers = registers.filter(item => item.userId === userId);
    return registers;
  }

  public async save(data: { id?: number; userId: number }): Promise<Document> {
    if (data.id) {
      const register = await this.findById(data.id, data.userId);
      if (register) {
        Object.assign(register, {
          id: this.getNextId(),
          ...data,
        });

        return register;
      }
    }

    const register = new Document();
    delete data.id;

    Object.assign(register, {
      id: this.getNextId(),
      ...data,
    });

    this.registers.push(register);

    return register;
  }

  private getNextId(): number {
    if (this.registers.length === 0) return 1;
    return this.registers[this.registers.length - 1].id + 1;
  }

  public async delete(id: number, userId: number): Promise<boolean> {
    const index = this.registers.findIndex(
      item => item.id === id && item.userId === userId,
    );

    if (index < 0) return false;

    this.registers.splice(index, 1);
    return true;
  }
}

export default FakeDocumentRepository;
