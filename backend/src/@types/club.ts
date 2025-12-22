import type { InferInsertModel, InferSelectModel } from "drizzle-orm/table";
import { club } from "../db/schema";

export type Club = InferSelectModel<typeof club>;
export type NewClub = InferInsertModel<typeof club>;
