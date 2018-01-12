<template>
  <div class="footer">
    <Row class="row" type="flex" :gutter="10">
      <Col :span="6">
        <img src="/static/images/1995-footer.png">
      </Col>
      <Col :span="12" class="center">
        <span>
          <Icon size="26" type="email"></Icon>
          <input v-model="email" type="text" placeholder="输入邮箱获取订阅..." @keyup.enter="sendEmail">
          <Icon size="26" type="arrow-right-c" @click.native="sendEmail"></Icon>
        </span>
        <h3>&copy;2018 | CapMall Designed with by Wedyon</h3>
      </Col>
      <Col :span="6">
        <div>
          <div class="icons">
            <img src="/static/images/wechat.png" alt="">
            <img src="/static/images/QQ.png" alt="">
            <img src="/static/images/weibo.png" alt="">
            <img src="/static/images/facebook.png" alt="">
          </div>
          <div class="icons">
            <img src="/static/images/zhifubao.png" alt="">
            <img src="/static/images/weixinpay.png" alt="">
            <img src="/static/images/UnionPay.png" alt="">
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    sendEmail() {
      if (this.email === '') {
        this.$Message.error('请输入邮箱');
      } else {
        this.email = '';
        this.$Message.success('订阅成功');
      }
    }
  }
};
</script>

<style lang="scss">
.footer {
  border: 1px solid #444;
  background-color: #222;
  text-align: center;
  height: 160px;
  .row {
    height: 100%;
    .center {
      & > span {  
        width: 70%;
        background-color: #333;
        display: inline-block;
        margin: 40px 0 30px;
        padding: 6px 15px;
        border-radius: 40px;
        input {
          margin: 0 5px;
          width: 85%;
          vertical-align: super;
          color: #aaa;
          font-size: 16px;
          border: none;
          background-color: #333;
        }
      }
      h3 {
        font-size: 16px;
        color: #666;
        font-weight: initial;
      }
    }
    .ivu-col {
      background-color: #222;
      height: 100%;
      &:first-child {
        border-right: 1px solid #444;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:last-child {
        &>div {
          height: 100%;
          border-left: 1px solid #444;
        }
        .icons {
          display: flex;
          height: 50%;
          width: 100%;
          align-items: center;
          justify-content: space-around;
          img {
            width: 40px;
            height: 40px;
          }
          &:first-child {
            border-bottom: 1px solid #444;
          }
        }
      }
    }
  }
}
</style>
