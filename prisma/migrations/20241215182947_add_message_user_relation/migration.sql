/*
  Warnings:

  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- First, add the type column which has a default value
ALTER TABLE "Message" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'text';

-- Then, add the userId column as nullable first
ALTER TABLE "Message" ADD COLUMN "userId" TEXT;

-- Update existing messages to use the chat's userId
UPDATE "Message" m
SET "userId" = c."userId"
FROM "Chat" c
WHERE m."chatId" = c.id;

-- Now make userId required
ALTER TABLE "Message" ALTER COLUMN "userId" SET NOT NULL;

-- Create index
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- Add foreign key constraint
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
