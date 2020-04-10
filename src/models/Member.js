export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    /** 회원 id */
    id: {
      field: 'id',
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    /** 회원 pw */
    pw: {
      field: 'pw',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    /** 회원 권한 등급 */
    accessLevel: {
      field: 'access_level',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    joinDate: {
      field: 'join_date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    }
  }, {
      tableName: 'member',
      timestamps: false,
  });

  // Member.associate = (models) => {
  //   Member.hasMany
  // }

  Member.findMemberForLogin = (id, pw) => Member.findOne({
    where: {
      id,
      pw,
    },

    raw: true,
  });

  Member.findMemberById = (id)=> Member.findOne({
    where: {
      id,
    },

    raw: true,
  });

  return Member;
};
