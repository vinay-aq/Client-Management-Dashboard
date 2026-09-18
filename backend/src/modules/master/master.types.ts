import type { MasterType } from "../../constants/masterTypes.js";

type MasterData = {
  type: MasterType;
  name: string;
  description?: string;
};

type UpdateMasterData = {
  name: string;
  description?: string;
};

export type { MasterData, UpdateMasterData };
