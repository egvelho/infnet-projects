import { ForbiddenError } from "routing-controllers";
import { Service } from "typedi";
import { ScrapRepository } from "./scrap.repository";
import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdateScrapDto } from "./dtos/update-scrap.dto";
import { UserRepository } from "../user/user.repository";

@Service()
export class ScrapService {
  constructor(
    private readonly scrapRepository: ScrapRepository,
    private readonly userRepository: UserRepository
  ) {}

  async readScrap(id: string) {
    const scrap = this.scrapRepository.readScrap(id);
    return scrap;
  }

  async listOwnerScraps(ownerId: number) {
    const scraps = await this.scrapRepository.listOwnerScraps(ownerId);
    return scraps;
  }

  async createScrap(createScrapDto: CreateScrapDto) {
    const isFriend = await this.userRepository.checkIsFriend(
      createScrapDto.creatorId,
      createScrapDto.ownerId
    );

    if (!isFriend) {
      throw new ForbiddenError(
        "Você precisa ser amigo do usuário para enviar um scrap."
      );
    }

    const scrap = await this.scrapRepository.createScrap(createScrapDto);
    return scrap;
  }

  async updateScrap(id: string, updateScrapDto: UpdateScrapDto) {
    const scrap = await this.scrapRepository.readScrap(id);

    if (scrap?.creatorId !== updateScrapDto.creatorId) {
      throw new ForbiddenError("Esse scrap não é teu rapá!");
    }

    const updatedScrap = await this.scrapRepository.updateScrap(
      id,
      updateScrapDto
    );
    return updatedScrap;
  }

  async deleteScrap(id: string, userId: number) {
    const scrap = await this.scrapRepository.readScrap(id);

    if (scrap?.creatorId !== userId && scrap?.ownerId !== userId) {
      throw new ForbiddenError("Esse scrap não é teu rapá!");
    }

    const deletedScrap = await this.scrapRepository.deleteScrap(id);
    return deletedScrap;
  }
}
