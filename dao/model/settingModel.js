const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

// 定义数据模型
module.exports = sequelize.define(
  "setting",
  {
    // 在这里定义模型属性
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // 允许为 null，如果 j-site 有默认图
    },
    siteTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qq: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qqQrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // weixin 字段在 j-site mock 中没有直接使用，只用了 weixinQrCode
    // 如果后台管理需要编辑微信号，可以保留，否则可以考虑移除
    weixin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weixinQrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // githubName 在 j-site mock 中没有，但后端模型有，看是否保留
    githubName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favicon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 新增字段以匹配 j-site
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mainSkills: {
      // 存储为 JSON 字符串
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("mainSkills");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("mainSkills", JSON.stringify(value));
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    college: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      // 存储为 JSON 字符串
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("about");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("about", JSON.stringify(value));
      },
    },
    skills: {
      // 存储为 JSON 字符串
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("skills");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("skills", JSON.stringify(value));
      },
    },
  },
  {
    // 这是其他模型参数
    freezeTableName: true,
    createdAt: false, // 如果不填 false，可以使用字符值重新命名
    updatedAt: false,
  }
);
