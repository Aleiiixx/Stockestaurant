module.exports = (sequelize, DataTypes) => {
  const Barcode = sequelize.define('Barcode', {
    bar_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    product_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  Barcode.associate = (models) => {
    Barcode.belongsTo(models.Product, {
      foreignKey: 'product_uuid',
      targetKey: 'uuid'
    });
  };

  return Barcode;
};
