# 天漢直銷


## 公共說明
以 /api/app 開頭的接口為不需要權限的接口，其餘都需要登錄权限

登錄权限的验證方式：
用户登錄成功後，将返回token字段，该字段由前端存储在localstorage，後續调用接口时，将该token放入請求头，key为token，value为登錄後返回的token
退出也需要调用退出接口，退出後，前端将缓存到本地的token清除

關於請求
請求方式为json請求，除上传头像等上传文件的接口使用form enctype="multipart/form-data" 請求
若未强调是否是必填字段则默认是必填字段


關於语言 目前支持  在请求的url链接中加入语言参数 ?lang=tch 为空 默认是tch
tch 中文繁体 默认
en 英文
vi 越南
sch 中文简体

關於返回
返回統一结构为
```json
{
  "code":0,
  "msg":"success",
  "data":{}
}
```
返回结构的code为0代表無错误
返回结构的code为1代表有错误,大多數情况下可直接弹出msg
返回结构的code为403代表token已过期，需要重新登錄

簡訊邮件验證码，在调试測試模式下統一为111111

/api/app开头为不需要权限验證的接口
/api/index开头为需要权限验證的接口

# 接口列表

### 功能：註冊获取手机验證码
### 接口地址
/api/app/sendSms
### 請求方式
Post
#####  request：
```json
{
  "mobile": "091235555"  //手机号
 "quyu": "86",//手机区号
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"發送成功",
  "data":{}
}
```
### 功能：註冊
### 接口地址
/api/app/register
### 請求方式
Post
#####  request：
```json
{
  
  
   "mobile": "0912222",//台灣的標準手機號 
   "username": "耶穌",  //用户名
   "quyu": "86",  //手机区号
   "share_code": "09234234",//推薦碼  非必填
  
   "nickname": 1,//昵称
  
   "password": "123456", //vip>0時必傳密码
   "sms_code": "2222",// 簡訊驗證碼
   
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"註冊成功",
  "data":{
  }
}
```



### 功能：獲取忘記密码獲取手機验證码
### 接口地址
/api/app/sendForgetSms
### 請求方式
Post
#####  request：
```json
{
  "mobile": "091235555"  //手机号
  "quyu": "86",//手机区号
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"發送成功",
  "data":{}
}
```

### 功能：獲取忘記密码提交
### 接口地址
/api/app/forget
### 請求方式
Post
#####  request：
```json
{
  "mobile": "091235555"  //手机号
  "password": "1222",//新密碼 至少8位
  "sms_code": "1222",//發送後的驗證碼
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"重置成功",
  "data":{}
}
```



### 功能：登錄
### 接口地址
/api/app/login
### 請求方式
Post
#####  request：
```json
{
  
  "password": "123456", //密码
   "username": "0912345678",  //用户名 v
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"登錄成功",
  "data":{
        "token": "werr34r43r34553",
  }
}
```


### 功能：註冊成為愛用者者時需要選擇套餐和年費商品
### 接口地址
/api/app/getGoodsList
### 請求方式
POST
#####  request：
```json
{
    "page": 1,
    "size": 20
  
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"ok",
  "data":{
                "total": 10,//总條數
                "data": [
                      {
                  "id": 1,//商品的id购买時要傳這個
                  "name": "商品名稱",
                  "total": "100",//买一份的总收益
                   "day_rate": "100",//一天的收益
                   "day": "10",//一共需要投资多少天
                   "rate": "10",//年化報酬率%
                   "today": "2023-03-27",//今天的日期
                   "end": "2024-03-27",//今天投资 什么时候结束
                   "money": "20",//一份单价
                   "status": 1,//状态 1有货 其他缺货
                 }
            ],
   }
}
```





### 功能：獲取系统配置 提现配置 奖金返利配置
### 接口地址
/api/index/getSysConf
### 請求方式
Post
#####  request：
```json
{
}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",
 "data": {
              "first_reward_10000": "100",//直接推薦返%
               "second_reward_10000": "100",//间接推薦返%
              "withdraw_rate": "100",//提現手續費 固定金额
              "withdraw_min": "100",//最小提現金額,
}
}
```

















# 下面是需权限验證的接口



### 功能：下单购买
### 接口地址
/api/index/addOrder
### 請求方式
Post
#####  request：
```json
{
 "id": 1,//商品列表的id
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"購買成功",
  "data":{}
}
```


### 功能：退出登陆 前端清楚本地token
### 接口地址
/api/index/logout
### 請求方式
Post
#####  request：
```json
{
 
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"success",
  "data":{}
}
```




### 功能：獲取當前用户信息
### 接口地址
/api/index/getUserInfo
### 請求方式
Post
#####  request：
```json
{
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"success",
  "data":{
           
             "nickname": "0912345678"//用户昵称
             "username": "0912345678"//用户账号
             "share_code": "0912345678" //邀請码 可顯示为拼上前端當前地址 顯示为二维码
             "create_time": "2021-01-01 12:00:00" //註冊時間
             "total": "100",//总共花了多少钱 大于0就是已开通
             "mobile": "手機號",
             "data_status": 1,//用戶是否有效 1有效 其他無效
            
             "usdt": "100",//錢包余額
          
             "pname": "你好",//上級名稱         
            "re_num":10,//直推人数
             "re2_num": 1,//间推人数 总数量就是两个相加
             
   }
}
```


### 功能：獲取订单的统计数据
### 接口地址
/api/index/getOrderStatistic
### 請求方式
Post
#####  request：
```json
{
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"success",
  "data":{
           
             "benjin": "100"//总质押金额
             "shouyi": "1000"//累计收益
             "shouyi_today": "100" //今天的收益
             
   }
}
```

### 功能：獲取 直推 间推 订单的统计数据
### 接口地址
/api/index/getRecOrderStatistic
### 請求方式
Post
#####  request：
```json
{
}
```
#####  resp：

```json
{
  "code":0,
  "msg":"success",
  "data":{
           
             "first": "100"//直推人数
             "first_today": "1000"//今天新注册直推人数
             "second": "100"//间推人数
             "second_today": "1000"//今天新注册间推人数
             "total": "100"//总推人数 直推人数+间推人数
             "total_today": "1000"//今天新注册总推人数  直推人数+间推人数
             "rec_buy_amount": "100"//直推的人总共买了多少钱的订单
             "pid_sum": "1000"//直推的人买的订单 当前用户收到多少奖励
             "ppid_sum": "1000"//间推的人买的订单 当前用户收到多少奖励
             
   }
}
```


### 功能：獲取訂單列表
### 接口地址
/api/index/getOrderList
### 請求方式
Post
#####  request：
```json
{
"direct": 1,//想获取的订单类型 0获取自己的 1获取自己直推人的订单  2获取自己间推人的订单 
"type": 1,//0 全部   1進行中 2結束
"time_type": 1,//1全部 2七日 3時間區間
  "start":"2021-12-12",//type=3有效 开始日期 非必填 
  "end":"2021-12-12",//type=3有效   结束日期 非必填  
 "page": 1,
 "size": 20
}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",
  "data":{
       "total": 10,//总條數
       "data": [
            {
                "id":1,//訂單id
                "sn":"訂單編號",
                "pname":"产品名称",
                 "created_time": "2012-12-12 12:12:12",//下单时间
                 "end_time": "2012-12-12 12:12:12",//质押结束時間 
               "status": 1,//1进行中 其他 结束
                    "day": 1,//质押天数
                    "rate": 10,//年化報酬率
                    "amount": 100,//订单金额
                    "win": 100,//挖礦所得收益
                    }
               ]//列表
 }

}
```







### 功能：獲取交易类别 和getMoneyLog接口的type做映射
### 接口地址
/api/index/getTransSubType
### 請求方式
Post
#####  request：
```json
{

}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",
 "data":[
          {
                "i": 1,//类型id
                "name": "充值",//交易项目名稱
                 
           }
          ]//列表 目前有  也可以寫死
          //1 => '充值',
          //2 => '提現',
          //3 => '提現手續費',
          //5 => '提現退回',
          //7 => '購買產品',
          //8 => '產品到期贖回',
          //9 => '每日收益',
          //14 => '推薦一代獎勵',
          //15 => '推薦二代獎勵',
          //24 => '系統',
}
```

### 功能：獲取提現記錄
### 接口地址
/api/index/getWithdrawList
### 請求方式
Post
#####  request：
```json
{
"status": 0,//狀態 1待審核 2已通過並撥款 3駁回  通過就是撥發 
 "start":"2021-12-12",//开始日期 非必填
  "end":"2021-12-12",//结束日期 非必填
 "page": 1,
 "size": 20
}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",
 "data":{
             "total": 10,//总條數
             "data": [
              {
                    "id": 1,//流水id
                    "sn": "w4534535435345",//編号
                     "created_time": "2012-12-12 12:00:00",//创建時間
                     "status": 1,//'1 待审核即审核中 確认中  2已付款即通过 3拒绝，未通过
                     "amount": "1000",//总金額
                     "shouxu_fee": "10",//手續費
                     "infact_amount": 1,//实际打款金額
                     "bank_name": "銀行名稱",
                    "bank_branch": "銀行分行",
                      "bank_num": "銀行卡號",
                      "bank_account": "銀行戶名",
                      "remark": "status==3時會有此原因",
               },
              
              ]//列表
}
}

```




### 功能：獲取钱包明细 記錄 
### 接口地址
/api/index/getMoneyLog
### 請求方式
Post
#####  request：
```json
{
"time_type": 1,//1全部 2七日 3時間區間
  "start":"2021-12-12",//type=3有效 开始日期 非必填 
  "end":"2021-12-12",//type=3有效   结束日期 非必填  
 "page": 1,
 "size": 20,
  "sub_type_arr":[],//交易类别 []就是全部 就是 getTransSubType的i  目前用不到

}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",
 "data": {
              "total": 10,//总條數
              "data":[
              {
                     "id": 1,//流水id
                      "created_time": "2012-12-12 12:00:00",//创建時間
                      "amount": "1000",//發生金額  可能需要大于0小于0判断顯示颜色 
             "sub_typer":1,//交易类别  就是 getTransSubType的i
                     "balance": "100",//剩余金额
                      "sub_type":1,//就是 getTransSubType的i 
                       "remark": "備註信息，原因",
               },
              ]//列表
}
}
```


### 功能：提现获取手机验證码
### 接口地址
/api/app/sendWdSms
### 請求方式
Post
#####  request：
```json
{

}
```
#####  resp：

```json
{
  "code":0,
  "msg":"發送成功",
  "data":{}
}
```


### 功能：提現提交
### 接口地址
/api/index/withdraw
### 請求方式
Post
#####  request：
```json
{
 "num": "100",//数量
  "address":"T3545435435455",//地址  T开头 34位
  "sms_code": "12234",//手机验证码
}
```
#####  resp：

```json
{
 "code":0,
 "msg":"success",//可能失敗 直接彈出此語句
 "data": {
         
    }
}
```
