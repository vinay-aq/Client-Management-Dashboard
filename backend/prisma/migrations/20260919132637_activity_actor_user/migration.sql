-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_actor_id_foreign";

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_actor_id_foreign" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
