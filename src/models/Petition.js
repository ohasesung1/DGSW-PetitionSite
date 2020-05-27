import sequelize from 'sequelize';
const Op = sequelize.Op;

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
    /** 블라인드 여부 */
    blind: {
      field: 'blind',
      type: DataTypes.INTEGER(50),
      allowNull: false,
      defaultValue: 0,
    },
    /** 승인 여부 */
    isAllowed: {
      field: 'is_allowed',
      type: DataTypes.INTEGER(50),
      allowNull: false,
      defaultValue: 0,
    },
    /** 동의 갯수 */
    voteCount: {
      field: 'vote_count',
      type: DataTypes.INTEGER(50),
      allowNull: false,
      defaultValue: 0,
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

  // 승인 되지 않은 청원 전체 조회
  Petition.getNotAllowedAllPetitions = () => Petition.findAll({
    where: {
      isAllowed: 0,
    },

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  // 승인 되지 않은 청원 조회
  Petition.getNotAllowedPetitions = (requestPage, limit) => Petition.findAll({
    offset: requestPage,
    limit,

    where: {
      isAllowed: 0,
    },

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  // 승인된 청원 페이지 별 조회 
  Petition.getPetitions = (requestPage, limit) => Petition.findAll({
    offset: requestPage,
    limit,

    order: [
      ['joinDate', 'DESC'],
    ],

    where: {
      isAllowed: 1,
    },

    raw: true,
  });

  // 전체 청원 목록 조회
  Petition.getAllIsAllowPetitions = (requestPage, limit) => Petition.findAll({
    offset: requestPage,
    limit,

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  Petition.searchPetition = (title, page, limit) => Petition.findAll({
    offset: page,
    limit: limit,

    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
    },

    raw: true,
  });

  Petition.searchAllPetition = (title) => Petition.findAll({
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
    },

    raw: true,
  });

  // 전체 청원 목록 페이지 카운트 조회
  Petition.getAllIsAllowPetitionsForCount = () => Petition.findAll({
    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  Petition.getAllPetitionForVoteOrder = (page, limit) => Petition.findAll({
    offset: page,
    limit: limit,

    order: [
      ['voteCount', 'DESC'],
    ],

    raw: true,
  });

  // 승인된 모든 목록 조회
  Petition.getAllPetitions = () => Petition.findAll({
    order: [
      ['joinDate', 'DESC'],
    ],

    where: {
      isAllowed: 1,
    },

    raw: true,
  });

  // 청원 검색
  Petition.findPetition = (idx) => Petition.findOne({
    where: {
      idx,
    },

    raw: true,
  });

  // 카테고리별 청원 전체 조회
  Petition.getAllPetitionsByCategory = (category) => Petition.findAll({
    where: {
      category,
    },

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  // 카테고리별 청원 조회
  Petition.getPetitionsByCategory = (category, requestPage, limit) => Petition.findAll({
    offset: requestPage,
    limit,
    
    where: {
      category,
    },

    order: [
      ['joinDate', 'DESC'],
    ],

    raw: true,
  });

  return Petition;
};
