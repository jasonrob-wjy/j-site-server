// 该文件负责对数据库进行一个初始化操作
const sequelize = require("./dbConnect"); // 数据库连接实例

const adminModel = require("./model/adminModel"); // 数据模型
const bannerModel = require("./model/bannerModel");
const blogTypeModel = require("./model/blogTypeModel");
const blogModel = require("./model/blogModel");
const demoModel = require("./model/demoModel");
const messageModel = require("./model/messageModel");
const aboutModel = require("./model/aboutModel");
const settingModel = require("./model/settingModel");

const md5 = require("md5");

(async function () {
  // 定义模型之间的关联关系

  // 博客和博客分类之间的关联
  blogTypeModel.hasMany(blogModel, {
    foreignKey: "categoryId",
    targetKey: "id",
  });
  blogModel.belongsTo(blogTypeModel, {
    foreignKey: "categoryId",
    targetKey: "id",
    as: "category",
  });

  // 博客和博客评论之间存在关联关系
  blogModel.hasMany(messageModel, { foreignKey: "blogId", target: "id" });
  messageModel.belongsTo(blogModel, {
    foreignKey: "blogId",
    target: "id",
    as: "blog",
  });

  // 将数据模型和表进行同步
  await sequelize.sync({
    alter: true,
  });

  // 同步完成之后，有一些表是需要一些初始化数据
  // 我们需要先查询这张表有没有内容，没有内容我们才初始化数据
  const adminCount = await adminModel.count();
  if (!adminCount) {
    // 进入此 if，说明该表没有数据，我们进行一个初始化
    await adminModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("初始化管理员数据完毕...");
  }

  // banner 进行初始化操作
  const bannerCount = await bannerModel.count();
  if (!bannerCount) {
    await bannerModel.bulkCreate([
      {
        midImg: "/static/images/bg1_mid.jpg",
        bigImg: "/static/images/bg1_big.jpg",
        title: "塞尔达旷野之息",
        description: "2017年年度游戏，期待续作",
      },
      {
        midImg: "/static/images/bg2_mid.jpg",
        bigImg: "/static/images/bg2_big.jpg",
        title: "塞尔达四英杰",
        description: "四英杰里面你最喜欢的又是谁呢",
      },
      {
        midImg: "/static/images/bg3_mid.jpg",
        bigImg: "/static/images/bg3_big.jpeg",
        title: "日本街道",
        description: "动漫中经常出现的日本农村街道，一份独特的恬静",
      },
    ]);
    console.log("初始化首页标语数据...");
  }

  // 进行一些数据初始化
  const aboutCount = await aboutModel.count(); // 首先进行查询看有没有数据
  if (!aboutCount) {
    // 如果没有数据就进行初始化
    await aboutModel.create({
      url: "https://oss.duyiedu.com/demo-summary/网页简历/index.html",
    });
    console.log("初始化关于我数据...");
  }

  // 全局设置数据初始化
  const settingCount = await settingModel.count(); // 首先进行查询看有没有数据
  if (!settingCount) {
    // 如果没有数据就进行初始化
    await settingModel.create({
      siteTitle: "Jansonrob's Blog",
      avatar: "/static/uploads/164779115797917478382462546356.JPG",
      userName: "Jsonsonrob",
      subTitle: "前端架构师",
      mainSkills: ["Vue.js", "React.js", "TypeScript", "Node.js", "Devops"],
      location: "成都",
      qq: "tencent://message/?Menu=yes&uin=434520840&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45",
      qqQrCode: "/static/uploads/qq17478383653513479.png",
      weixinQrCode: "/static/uploads/weixin17478384027101000.png",
      mail: "mailto:jansonrob52@gmail.com",
      icp: "黑ICP备17001719号",
      github: "https://github.com/jasonrob-wjy",
      favicon: "/static/favicon.ico", // 更新为正确的路径
      college: "电子科技大学",
      education: "信息与软件工程学院 网络安全专业（本科）",

      about: [
        {
          title: "技术能力与经验",
          content:
            "我是一名专注于构建高性能、高用户体验的前端开发工程师，拥有6年行业经验。擅长运用 HTML5、CSS3、JavaScript（ES6+） 搭建响应式界面，精通 Vue生态（包括Vue3 Composition API、Pinia），并熟练使用 Webpack/Vite 优化构建流程。对工程化实践 有深入探索，曾主导多个项目从技术选型到部署的全流程开发。",
        },
        {
          title: "综合品质",
          content:
            "具备出色的团队合作精神和领导能力，能够有效地协调团队资源，推动项目顺利进行。具有强烈的责任心和自我驱动力，能够在压力下保持高效的工作状态。对新技术有敏锐的洞察力，乐于学习和分享，不断提升个人技术栈。",
        },
        {
          title: "职业向往",
          content:
            "对前端开发充满热情，期望在前端领域不断深造，追求技术的极致。希望加入一个充满活力、注重技术发展的团队，与同行共同成长，为用户创造更加优质的互联网体验。",
        },
      ],
      skills: [
        "Vue.js",
        "Webpack",
        "TypeScript",
        "Node.js",
        "Devops",
        "工程化",
        "Vite",
        "React.js",
        "Java",
        "SpringBoot",
        "MyBaits",
        "Mysql",
        "Redis",
        "Nginx",
        "Docker",
        "k8s",
        "Shell",
        "Express",
        "Koa",
        "Oauth2",
      ],
      mainSkills: ["Vue.js", "Webpack", "TypeScript", "Node.js", "Devops"],
    });
    console.log("初始化全局设置数据...");
  }

  console.log("数据库数据已经准备完毕....");
})();
