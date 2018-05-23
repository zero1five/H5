/**
 * 忘记密码模块
 * @description 用于快速构建忘记密码功能模块
 *  - app.webUrl 后台接口
 *  - dependence common.js app.js strategies.js md5.min.js 文件引入即可直接即可
 *  sendVerify 用于发送验证码的按钮
 *  sign 用于登录的按钮
 *  phone 填写手机号的输入框
 *  pwd 填写密码的输入框
 *  VerifyCode 填写验证码的输入框
 *  以上在html页面存在即可(全部以id的形式绑定)
 * @author
 */

let Url = app.webUrl;
apiready = function() {
  appInit();
}

function appInit() {
  api.parseTapmode();
  api.setFrameAttr({
      name: 'forget',
      bounces: false,
      softInputMode: 'pan',
  });
  let sendVerify = document.querySelector('#sendVerify'),
      sign = document.querySelector('.sign');

  sendVerify.addEventListener('click', getVerifyCode);
  sign.addEventListener('click', getFormMsg);
}

// 测试手机格式是否合格并发送验证码
function getVerifyCode() {
  var errorMsg = ValidataFunc_one();
  if ( errorMsg ) {
    PopUp(errorMsg);
    return false;
  }
  isPhoneExist(sendRequest);
}

// 发送修改后的用户信息
function getFormMsg() {
  var errorMsg = ValidataFunc_two();
  if ( errorMsg ) {
    PopUp(errorMsg);
    return false;
  }
  isPhoneExist(sendModiInfo);
}

// 提交修改信息的验证规则
var ValidataFunc_two = function () {
  var validator = new Validator();
  /********* 添加校验规则 ***********/
  validator.add(document.querySelector('#phone'), [{
    strategy: 'isMobile',
    errorMsg: '请填写正确的手机号'
  },{
    strategy: 'isNonEmpty',
    errorMsg: '请填写正确的手机号'
  }]);
  validator.add(document.querySelector('#pwd'), [{
    strategy: 'isCode',
    errorMsg: '请输入6-20位的密码'
  }]);
  validator.add(document.querySelector('#VerifyCode'), [{
    strategy: 'isNonEmpty',
    errorMsg: '验证码不能为空'
  }]);
  var errorMsg = validator.start();
  return errorMsg
}

// 交给submit验证码的策略方法
var ValidataFunc_one = function () {
  var validator = new Validator();
  /********* 添加校验规则 ***********/
  validator.add(document.querySelector('#phone'), [{
    strategy: 'isMobile',
    errorMsg: '请填写正确的手机号'
  }]);
  var errorMsg = validator.start();
  return errorMsg
}


/* 确认修改发送请求 */
function sendModiInfo() {
    let Phone = document.querySelector('#phone').value,
        Pwd = M.encryption(document.querySelector('#pwd').value),
        auth = document.querySelector('#VerifyCode').value;

    api.ajax({
        url: `${Url}/api/User/change_password`,
        method: 'get',
        data: {
          values: {
            mobile: Phone,
            password: Pwd,
            auth: auth
          }
        }
    }, function(ret, err) {
        if (ret.status == 0) {
            PopUp(ret.desc);
            setTimeout(() => {
                M.back();
            }, 1000);
        } else if (ret.status == 1) {
            PopUp(ret.desc);
        }
    })
}

/* 检查当前账号是否存在 */
function isPhoneExist( fn ) {
  let value = document.querySelector('#phone').value;
  api.ajax({
      url: `${Url}/api/User/select_mobile`,
      method: 'get',
      data: {
          values: {
            mobile: value
          }
      }
  }, function(ret, err) {
      if (ret && ret.status == 1) {
        fn();
      } else {
        PopUp('当前手机号还未注册')
      }
  });
};

/* 验证码发送请求 */
function sendRequest() {
    let value = document.querySelector('#phone').value;
    api.ajax({
        url: `${Url}/api/Verification/verification`,
        method: 'get',
        data: {
            values: {
              mobile: value
            }
        }
    }, function(ret, err) {
        if (ret.status == 0) {
          sendVerify.removeEventListener('click', getVerifyCode);
          PopUp('发送成功');
          active();
        }
        if (ret.status == 2 ) {
          PopUp('发送失败,最近已经发送');
        }
        if (ret.status == 1) {
          PopUp('服务错误, 请稍后重试');
        } else if ( ret.des == '发送失败' && ret.val.status == "210") {
          PopUp('指定时间内发送数量超限');
        }
    });
};

/* 信息提示框 */
function PopUp(msg) {
    api.toast({
        msg,
        duration: 2000,
        location: 'middle'
    });
}

/* 验证码的获取按钮的特效 */
function active() {
    let Countdown = 60,
        startCount = null,
        SingleTimer = null,
        sendVerify = document.querySelector('#sendVerify');

    SingleTimer = setTimeout(function () {
        sendVerify.value = Countdown + 's';
        sendVerify.classList.add('checked');
        startCount = setInterval(function () {
            Countdown--;
            sendVerify.value = Countdown + 's';

            if (Countdown === 0) {
                clearInterval(startCount);
                sendVerify.value = '获取验证码';
                sendVerify.classList.remove('checked');
                sendVerify.addEventListener('click', getVerifyCode);
            }
        }, 1000);
    }, 0);
}
