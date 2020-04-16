export default (sequelize, DataTypes) => {
  const Petition = sequelize.define('petition', {
    /** idx */
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    /** 제목 */
    title: {
      field: 'title',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    /** 작성자 id */
    id: {
      field: 'id',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    /** 내용 */
    contents: {
      field: 'contents',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    /** 카테고리 */
    category: {
      field: 'category',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    /** 작성 날짜 */
    joinDate: {
      field: 'join_date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    }
  }, {
      tableName: 'petition',
      timestamps: false,
  });

  Petition.associate = (models) => {
    Petition.belongsTo(models.Member, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  Petition.getPetitions = (requestPage, limit) => Petition.findAll({
    offset: requestPage,
    limit,

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  Petition.getAllPetitions = () => Petition.findAll({
    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  Petition.findPetition = (idx) => Petition.findOne({
    where: {
      idx,
    },

    raw: true,
  });

  return Petition;
};
