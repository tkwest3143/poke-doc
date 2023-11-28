import { SaveData } from "@/domain";

export class User {
  constructor(
    private prop: {
      name: string;
      save_data: SaveData[];
    }
  ) {}
}
