export default (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    /** idx */
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    /** 작성자 id */
    id: {
      field: 'id',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    /** 청원 idx */
    petitionIdx: {
      field: 'petitionIdx',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /** 내용 */
    contents: {
      field: 'contents',
      type: DataTypes.STRING(1000),
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
      tableName: 'answer',
      timestamps: false,
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Member, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });

    Answer.belongsTo(models.Petition, {
      foreignKey: 'petitionIdx',
      onDelete: 'CASCADE',
    });
  };

  Answer.getAnswerByPetitionIdx = (idx) => Answer.findOne({
    where: {
      petitionIdx: idx,
    },

    raw: true,
  });

  return Answer;
}
