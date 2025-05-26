import { createSequelizeInstance } from "../../src/infrastructure/databases/Sequelice";

describe("Sequelize DB Connection", () => {
  let originalEnv: string | undefined;

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it("should include SSL dialectOptions in production", async () => {
    process.env.NODE_ENV = 'production';

    const sequelize = createSequelizeInstance();
    const sslOptions = (sequelize.options.dialectOptions as any).ssl;

    expect(sslOptions).toBeDefined();
    expect(sslOptions.require).toBe(true);
    expect(sslOptions.rejectUnauthorized).toBe(false);

    await sequelize.close();
  });

  it("should use empty dialectOptions in development", async () => {
    process.env.NODE_ENV = 'development';

    const sequelize = createSequelizeInstance();

    expect(sequelize.options.dialectOptions).toEqual({}); // se cubre el else {}

    await sequelize.close();
  });
});
