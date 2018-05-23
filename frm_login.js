/**
 * 登录模块
 * @description 用于快速构建登录模块
 *  - app.webUrl 后台接口
 *  - dependence common.js app.js strategies.js md5.min.js PubiSub.js 文件引入即可直接即可
 *  regiBtn 前往注册页面
 *  forgetBtn 前往忘记密码页面
 *  phone 填写手机号的输入框
 *  pwd 填写密码的输入框
 *  以上在html页面存在即可(全部以id的形式绑定)
 * @author 
 */
let Url = app.webUrl;
apiready = function() {
  appInit();
}

let login = (function() {
  Event.listen('loginSucc', data => {
      login.eventProcc(data)
  });
  return {
      eventProcc: function( data ) {
          //将登录成功之后所要做的事写在这里
      }
  }
})();

function appInit() {
  api.parseTapmode();
  setHtmlAttr();
  let regiBtn = document.querySelector('#regiBtn'),
      forgetBtn = document.querySelector('#forgetBtn'),
      comfirm = document.querySelector('#signBtn');

  regiBtn.addEventListener('click', openRegi);
  forgetBtn.addEventListener('click', openForget);
  comfirm.addEventListener('click', getFormMsg);
}

// 校验当前所填信息的合规性
function getFormMsg() {
  var errorMsg = ValidataFunc();
  if ( errorMsg ) {
    PopUp(errorMsg);
    return false;
  }
  isPhoneExist(comfirmLogin);
}


// 登录功能
function comfirmLogin() {
  let Phone = document.querySelector('#phone').value,
      Pwd = M.encryption(document.querySelector('#pwd').value);
  api.ajax({
      url: `${app.webUrl}/api/User/user_login`,
      method: 'get',
      data: {
          values: {
              mobile: Phone,
              password: Pwd
          }
      }
  }, function(ret, err) {
    if ( ret && ret.status == 0) {
      Event.trigger('loginSucc', ret)
    } else {
      PopUp('服务错误, 请稍后重试')
    }
  })
}


// 提交修改信息的验证规则
var ValidataFunc = function () {
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
  var errorMsg = validator.start();
  return errorMsg
}



// 打开忘记密码页面
function openForget() {
  api.openWin({
      name: 'frm_forget',
      url: './frm_forget.html',
  });
}

// 打开注册页面
function openRegi() {
  api.openWin({
      name: 'frm_regi',
      url: './frm_regi.html',
  });
}


// 设置登录页面一些相关属性
function setHtmlAttr() {
  api.setFrameAttr({
      name: 'login',
      bounces: false,
      softInputMode: 'pan',
  });
  api.setStatusBarStyle({
      style: 'light',
  });
  api.addEventListener({
      name: 'keyback'
  }, function(ret, err) {
      PopUp('再按一次退出')
      api.addEventListener({
          name: 'keyback'
      }, function(ret, err) {
          api.closeWidget({
              silent: true
          })
      })
      cycle();
  });
  function cycle() {
      setTimeout(() => {
          api.addEventListener({
              name: 'keyback'
          }, function(ret, err) {
              PopUp('再按一次退出')
              api.addEventListener({
                  name: 'keyback'
              }, function(ret, err) {
                  api.closeWidget({
                      silent: true
                  })
              })
              cycle();
          })
      }, 1000)
  };
}

// 信息提示框
function PopUp(msg) {
    api.toast({
        msg,
        duration: 2000,
        location: 'middle'
    });
}
