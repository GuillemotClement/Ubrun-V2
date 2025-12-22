import { time } from "drizzle-orm/mysql-core";
import {
	pgTable,
	timestamp,
	text,
	boolean,
	real,
	serial,
	integer,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";

// SCHEMA BETTER AUTH
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});
// =================================================
export const vma = pgTable("vma", {
	id: serial().notNull().primaryKey(),
	value: real().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
});

export const club = pgTable("club", {
	id: serial().notNull().primaryKey(),
	name: varchar().notNull(),
	city: varchar().notNull(),
	sport: varchar().notNull(),
	creatorId: text("creator_id")
		.notNull()
		.references(() => user.id),
	createdAd: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at"),
	deletedAt: timestamp("deleted_at"),
});

export const insertClubSchema = createInsertSchema(club, {
	name: t.String({ minLength: 2, maxLength: 100 }),
	city: t.String({ minLength: 2, maxLength: 100 }),
	sport: t.String({ minLength: 2, maxLength: 100 }),
});
