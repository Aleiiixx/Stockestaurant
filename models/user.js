module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      encryptedPassword: {
        type: DataTypes.STRING,
        validate: {
          max: 32,
        }
      }
    });

    User.associate = (models) => {
      User.hasMany(models.Product, { foreignKey: 'user_uuid' });
      User.belongsToMany(models.Product, {
        through: models.Stock,
        foreignKey: 'user_uuid',
        otherKey: 'product_uuid'
      });
    };
  
    return User;
};
  