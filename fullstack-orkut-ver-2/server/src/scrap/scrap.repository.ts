import { Service } from "typedi";
import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdateScrapDto } from "./dtos/update-scrap.dto";
import { mongodb, Collection, ObjectId } from "../mongodb";
import type { Scrap } from "./scrap.types";

@Service()
export class ScrapRepository {
  constructor() {
    this.scraps = mongodb.collection("scraps");
  }

  scraps: Collection<Scrap>;

  async readScrap(id: string) {
    const scrap = await this.scraps.findOne({
      _id: new ObjectId(id),
    });
    this.prepareJsonEncode(scrap);
    return scrap;
  }

  async listOwnerScraps(ownerId: number) {
    const scraps = await this.scraps.find({
      ownerId,
    });

    const scrapsArray = await scraps.toArray();
    for (let index = 0; index < scrapsArray.length; index++) {
      this.prepareJsonEncode(scrapsArray[index]);
    }

    return scrapsArray;
  }

  async createScrap(createScrapDto: CreateScrapDto) {
    const results = await this.scraps.insertOne(createScrapDto);
    const scrap = await this.scraps.findOne({
      _id: results.insertedId,
    });
    this.prepareJsonEncode(scrap);
    return scrap;
  }

  async updateScrap(id: string, updateScrapDto: UpdateScrapDto) {
    const scrap = await this.scraps.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updateScrapDto,
      },
      {
        returnDocument: "after",
      }
    );
    this.prepareJsonEncode(scrap);
    return scrap;
  }

  async deleteScrap(id: string) {
    const scrap = await this.scraps.findOneAndDelete({
      _id: new ObjectId(id),
    });
    this.prepareJsonEncode(scrap);
    return scrap;
  }

  private prepareJsonEncode(scrap: any) {
    scrap._id = scrap._id.toString();
  }
}
