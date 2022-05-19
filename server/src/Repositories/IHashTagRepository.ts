/* eslint-disable @typescript-eslint/interface-name-prefix */
import HashTag from '../entities/HashTag';

export default interface IHashTagRepository {
  findByDescription(
    description: string,
    userId: number,
  ): Promise<HashTag | undefined>;
  save(description: string, userId: number): Promise<HashTag>;
}
