import { PrismaClient } from "@prisma/client";

/**
 * 创建了一个 Prisma 客户端的实例，命名为 client。
 * 它首先尝试从 global 对象中获取名为 prismadb 的变量，如果该变量存在，就使用它作为客户端实例
 * 否则，它会创建一个新的 Prisma 客户端实例。
 */
 
const client = global.prismadb || new PrismaClient();

/**
 * 在生产环境下将 client 实例设置为全局的 prismadb 变量。
 * 这是为了确保在生产环境中只创建一个数据库连接，以减少资源消耗和提高性能。
 * 如果 prismadb 变量不存在，它会将 client 实例赋值给它。
 */
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
