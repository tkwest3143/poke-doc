import { seriesMasterType } from "./interface/seriesMaster";

export class SeriesMaster {
  constructor(private prop: seriesMasterType) {}
  get id() {
    return this.prop.id;
  }
  get name() {
    return this.prop.name;
  }
  get maxEffortValue() {
    return this.prop.max_effort_value;
  }
  get maxIndividualValue() {
    return this.prop.max_individual_value;
  }
  get seriesMasterType() {
    return this.prop;
  }
}
