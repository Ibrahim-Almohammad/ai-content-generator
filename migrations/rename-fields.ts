import { sql } from "drizzle-orm";

export async function up(db: any) {
    await db.execute(sql`ALTER TABLE user RENAME COLUMN user_id TO userId`);
    await db.execute(sql`ALTER TABLE user RENAME COLUMN total_credit TO totalCredit`);
}

export async function down(db: any) {
    await db.execute(sql`ALTER TABLE user RENAME COLUMN userId TO user_id`);
    await db.execute(sql`ALTER TABLE user RENAME COLUMN totalCredit TO total_credit`);
}
