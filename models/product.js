module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    container: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['bottle', 'box', 'bag', 'can']]
      }
    },
    container_capacity: {
      type: DataTypes.STRING
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'user_uuid' });
    Product.belongsToMany(models.User, {
      through: models.Stock,
      foreignKey: 'product_uuid',
      otherKey: 'user_uuid'
    });
  };

  return Product;
};
