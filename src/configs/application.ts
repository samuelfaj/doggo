import sequelize from '@configs/sequelize';

export default {
  init: async (options?: { sequelize?: boolean; mongoose?: boolean }) => {
    await Promise.all([
      options?.sequelize === false ? null : sequelize.authenticate(),
    ]);
  },
  close: async (options?: { sequelize?: boolean; mongoose?: boolean }) => {
    await Promise.all([
      options?.sequelize === false ? null : sequelize.close(),
    ]);
  },
};
