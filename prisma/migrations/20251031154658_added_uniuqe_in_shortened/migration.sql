/*
  Warnings:

  - A unique constraint covering the columns `[shortenUrl]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_shortenUrl_key" ON "Link"("shortenUrl");
