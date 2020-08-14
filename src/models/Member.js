import sequelize from 'sequelize';
const Op = sequelize.Op;

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
    /** 학년 */
    grade: {
      field: 'grade',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /** 학반 */
    studentClass: {
      field: 'studentClass',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /** 번호 */
    number: {
      field: 'number',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    certification: {
      field: 'certification_check',
      type: DataTypes.BOOLEAN,
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

  Member.getOrderMember = () => Member.findAll({
    order: [
      ['grade', 'ASC'],
      ['studentClass', 'ASC'],
      ['number', 'ASC'],
    ],

    where: {
      [Op.or]: [{accessLevel: 1}, {accessLevel: 2}],
    },

    raw: true,
  });

  Member.deleteAuth = (memberId) => Member.update({
    accessLevel: 2,
  }, {
    where: {
      id: memberId,
    },

    raw: true,
  });

  Member.searchMember = (searchWord) => Member.findAll({
    where: {
      [Op.or]: [
        {
          id: {
             [Op.like]: "%" + searchWord + "%" 
          }
        },{
          name: {
            [Op.like]: "%" + searchWord + "%" 
          }
        }
      ],

      accessLevel: {
        [Op.ne]: 0, 
      },
    },

    raw: true,
  });

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

  Member.grantAuth = (memberId)=> Member.update({
    accessLevel: 1,
  }, {
    where: {
      id: memberId,
    },

    raw: true,
  });

  return Member;
};
