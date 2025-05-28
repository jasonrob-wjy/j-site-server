const settingModel = require("./model/settingModel");

// 查询全局设置
module.exports.findSettingDao = async function () {
  const res = await settingModel.findOne();
  res.dataValues.skills = JSON.parse(res.dataValues.skills);
  res.dataValues.mainSkills = JSON.parse(res.dataValues.mainSkills);
  res.dataValues.about = JSON.parse(res.dataValues.about);
  return res;
};

// 修改全局设置
module.exports.updateSettingDao = async function (newSettingInfo) {
  await settingModel.update(newSettingInfo, {
    where: {
      id: 1,
    },
  });
  const res = await settingModel.findOne();
  res.dataValues.skills = JSON.parse(res.dataValues.skills);
  res.dataValues.mainSkills = JSON.parse(res.dataValues.mainSkills);
  res.dataValues.about = JSON.parse(res.dataValues.about);
  return res;
};
