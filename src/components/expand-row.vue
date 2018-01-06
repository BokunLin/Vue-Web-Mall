<template>
    <div>
        <Row class="expand-row">
            <Col span="7">
                <span class="expand-key">下单状态:</span>
                <span class="expand-value state">{{row.mess.state}}</span>
            </Col>
        </Row>
         <row>
            <col>
              <span class="expand-key">下单时间:</span>
              <span class="expand-value ">{{row.mess.time}}</span>
            </col>
          </Row>
           <row>
            <col>
              <span class="expand-key">支付方式:</span>
              <span class="expand-value ">{{row.mess.mode}}</span>
            </col> 
          </Row>
          <row>
            <col>
              <span class="expand-key">收获地址:</span>
              <span class="expand-value ">{{row.mess.address}}</span>
            </col>
          </Row>
          <row>
            <col>
              <span class="expand-key">订单总额:</span>
              <span class="expand-value red">{{row.mess.ordertotal}}</span>
            </col>
          </Row>
          <Row>
            <i-button class="but">确认收货</i-button>
          </Row>
    </div>
</template>
<script>
  export default{
     props: {
            row: Object
        }   
  }
</script>

<style>
  .state{
    color: orange;
  }
  .red{
    color: red;
  }
  .but{
    margin-top: 20px;
  }
  .expand-value{
    margin-left: 5px;
  }
  .ivu-table-expanded-cell{
    background-color: #fff !important;
  }
</style>