import { cultureModule } from "./culture/index.js";
import { dashboardModule } from "./dashboard/index.js";
import { gamesModule } from "./games/index.js";
import { playingModule } from "./playing/index.js";
import { postureModule } from "./posture/index.js";
import { rhythmModule } from "./rhythm/index.js";
import { songModule } from "./song/index.js";
import { structureModule } from "./structure/index.js";
import { teacherToolsModule } from "./teacher-tools/index.js";

export const moduleList = [
  dashboardModule,
  structureModule,
  cultureModule,
  postureModule,
  playingModule,
  rhythmModule,
  songModule,
  gamesModule,
  teacherToolsModule,
];

export const modulesById = Object.fromEntries(moduleList.map((module) => [module.id, module]));
export const defaultModuleId = "dashboard";
