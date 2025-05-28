"use strict";

var _require = require("validate.js"),
    validate = _require.validate;

var _require2 = require("../utils/errors"),
    ValidationError = _require2.ValidationError,
    UnknownError = _require2.UnknownError;

var fs = require("fs");

var _require3 = require("../dao/messageDao"),
    addMessageDao = _require3.addMessageDao,
    findMessageByPageDao = _require3.findMessageByPageDao,
    deleteMessageDao = _require3.deleteMessageDao;

var _require4 = require("../dao/blogDao"),
    findBlogByIdDao = _require4.findBlogByIdDao;

var _require5 = require("../utils/tool"),
    formatResponse = _require5.formatResponse,
    handleDataPattern = _require5.handleDataPattern;

var dir = "./public/static/avatar";
/**
 * 读取一个目录下有多少个文件
 * @param {*} dir 目录地址
 */

function readDirLength(dir) {
  return regeneratorRuntime.async(function readDirLength$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve) {
            fs.readdir(dir, function (err, files) {
              if (err) throw new UnknownError();
              resolve(files);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
} // 新增评论或者留言


module.exports.addMessageService = function _callee(newMessage) {
  var messageRule, validateResult, files, randomIndex, data, blogData;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // 数据验证规则
          messageRule = {
            nickname: {
              presence: {
                allowEmpty: false
              },
              type: "string"
            },
            content: {
              presence: {
                allowEmpty: false
              },
              type: "string"
            },
            blogId: {
              presence: {
                allowEmpty: false
              },
              type: "string"
            }
          }; // 进行数据验证

          validateResult = validate.validate(newMessage, messageRule);
          console.log(validateResult);

          if (validateResult) {
            _context2.next = 24;
            break;
          }

          newMessage.blogId = newMessage.blogId ? newMessage.blogId : null;
          newMessage.createDate = Date.now(); // 有一个头像的地址，该头像是随机生成的
          // 读取 static 下面的 avatar 目录

          _context2.next = 8;
          return regeneratorRuntime.awrap(readDirLength(dir));

        case 8:
          files = _context2.sent;
          // 随机摇一个文件出来
          randomIndex = Math.floor(Math.random() * files.length);
          newMessage.avatar = "/static/avatar/" + files[randomIndex]; // 接下来开始新增

          _context2.next = 13;
          return regeneratorRuntime.awrap(addMessageDao(newMessage));

        case 13:
          data = _context2.sent;

          if (!newMessage.blogId) {
            _context2.next = 21;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(findBlogByIdDao(newMessage.blogId));

        case 17:
          blogData = _context2.sent;
          blogData.commentNumber++;
          _context2.next = 21;
          return regeneratorRuntime.awrap(blogData.save());

        case 21:
          return _context2.abrupt("return", formatResponse(0, "", data));

        case 24:
          throw new ValidationError("数据验证失败");

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // 分页获取评论获取留言


module.exports.findMessageByPageService = function _callee2(pageInfo) {
  var data, rows;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(findMessageByPageDao(pageInfo));

        case 2:
          data = _context3.sent;
          rows = handleDataPattern(data.rows);
          return _context3.abrupt("return", formatResponse(0, "", {
            total: data.count,
            rows: rows
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // 删除留言或者评论


module.exports.deleteMessageService = function _callee3(id) {
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(deleteMessageDao(id));

        case 2:
          return _context4.abrupt("return", formatResponse(0, "", true));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};