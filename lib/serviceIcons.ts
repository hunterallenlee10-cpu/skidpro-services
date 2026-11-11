import {
  Building2,
  CloudLightning,
  HardHat,
  Route,
  Ruler,
  Snowflake,
  Tractor,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import type { ServiceId } from "./business";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "land-clearing": Tractor,
  "tree-removal": TreePine,
  "gravel-driveways": Route,
  "building-pads": Building2,
  grading: Ruler,
  "debris-cleanup": CloudLightning,
  "snow-plowing": Snowflake,
  "contract-work": HardHat,
};
