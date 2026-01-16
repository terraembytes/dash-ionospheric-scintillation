import type { DataParamsFilter } from "./DataParamsFilter";

export interface DataParamsFilterCut extends DataParamsFilter {
    hourRange: number | null,
    dateChoosed: string | null
  }