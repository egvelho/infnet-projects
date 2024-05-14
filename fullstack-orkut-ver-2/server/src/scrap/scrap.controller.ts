import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Authorized,
  CurrentUser,
  Body,
} from "routing-controllers";
import { Service } from "typedi";
import { ScrapService } from "./scrap.service";
import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdateScrapDto } from "./dtos/update-scrap.dto";
import type { User } from "../user/user.types";

@Service()
@JsonController("/scraps")
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @Authorized()
  @Get("/owner/:ownerId")
  async listOwnerScraps(
    @Param("ownerId") ownerId: number,
    @CurrentUser() user: User
  ) {
    const scraps = await this.scrapService.listOwnerScraps(ownerId);
    return scraps;
  }

  @Get("/:scrapId")
  @Authorized()
  async readScrap(@Param("scrapId") scrapId: string) {
    const scrap = await this.scrapService.readScrap(scrapId);
    return scrap;
  }

  @Post()
  @Authorized()
  async createScrap(
    @Body() createScrapDto: CreateScrapDto,
    @CurrentUser() user: User
  ) {
    createScrapDto.creatorId = user.id;
    const scrap = await this.scrapService.createScrap(createScrapDto);
    return scrap;
  }

  @Put("/:scrapId")
  @Authorized()
  async updateScrap(
    @Param("scrapId") scrapId: string,
    @Body() updateScrapDto: UpdateScrapDto,
    @CurrentUser() user: User
  ) {
    updateScrapDto.creatorId = user.id;
    const scrap = this.scrapService.updateScrap(scrapId, updateScrapDto);
    return scrap;
  }

  @Delete("/:scrapId")
  @Authorized()
  async deleteScrap(
    @Param("scrapId") scrapId: string,
    @CurrentUser() user: User
  ) {
    const scrap = await this.scrapService.deleteScrap(scrapId, user.id);
    return scrap;
  }
}
