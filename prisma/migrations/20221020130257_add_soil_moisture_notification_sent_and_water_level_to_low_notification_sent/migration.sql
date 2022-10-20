-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "thirstyNotificationSent" BOOLEAN DEFAULT false,
ADD COLUMN     "waterLevelToLowNotificationSent" BOOLEAN DEFAULT false;
