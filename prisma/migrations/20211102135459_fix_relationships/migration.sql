/*
  Warnings:

  - You are about to drop the `PermissionRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionRole" DROP CONSTRAINT "PermissionRole_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionRole" DROP CONSTRAINT "PermissionRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropTable
DROP TABLE "PermissionRole";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "UsersOnRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "PermissionsOnRole" (
    "roleId" INTEGER NOT NULL,
    "pemissionId" INTEGER NOT NULL,

    CONSTRAINT "PermissionsOnRole_pkey" PRIMARY KEY ("roleId","pemissionId")
);

-- AddForeignKey
ALTER TABLE "UsersOnRole" ADD CONSTRAINT "UsersOnRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRole" ADD CONSTRAINT "UsersOnRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRole" ADD CONSTRAINT "PermissionsOnRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRole" ADD CONSTRAINT "PermissionsOnRole_pemissionId_fkey" FOREIGN KEY ("pemissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
