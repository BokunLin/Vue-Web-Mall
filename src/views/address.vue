<template>
	<div class="address">
		<top></top>
		<Inav></Inav>
		<div class="container">
			<div class="area" :style="{ 'height': clientHeight+'px' }">
				<h2>
					收货地址管理
				</h2>
				<Row type="flex" class="row" :gutter="10">
					<Col :span="6" v-for="(item, index) in addressList" :key="item._id">
					<div :class="['addressArea', { 'active': index === 0 }]">
						<h6>{{item.name}}</h6>
						<p>{{item.address}}{{item.detail}}</p>
						<p>{{item.phone}}</p>
						<div class="control">
							<Button type="text" size="small" @click="edit(item)">编辑</Button>
							<Button type="text" size="small" @click="remove(item._id)">删除</Button>
						</div>
					</div>
					</Col>
					<Col :span="6">
					<div class="addressArea add" @click="showModal">
						<div class="center">
							<Icon type="plus"></Icon>
							<p>添加新地址</p>
						</div>
					</div>
					</Col>
				</Row>
			</div>
		</div>
		<bottom></bottom>
		<Modal v-model="visible" class="loginModal" title="收货地址" width="700px" @on-ok="subForm">
			<Form ref="form" :model="formData" :label-width="90" :rules="rule">
				<FormItem label="收货人姓名" prop="name">
					<i-input v-model="formData.name"></i-input>
				</FormItem>
				<FormItem label="联系方式" prop="phone">
					<i-input v-model.number="formData.phone"></i-input>
				</FormItem>
				<FormItem label="收货区域" prop="address">
					<Cascader :data="address" :load-data="loadData" v-model="formData.address" placeholder="省 / 市 / 区 / 街道"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop="detail">
					<i-input type="textarea" placeholder="输入详细地址" v-model="formData.detail"></i-input>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
import top from "@/components/top";
import Inav from "@/components/nav";
import bottom from "@/components/footer";
import { 
	getProvinces,
	getCities,
	getAreas,
	getStreets,
	getProvincesLabel,
	getCitiesLabel,
	getAreasLabel,
	getStreetsLabel,
	subAddress,
	editAddress,
	removeAddress,
	getAddress } from "@/api/index";

export default {
  data() {
    return {
      visible: false,
      formData: {
        phone: "",
        name: "",
        detail: "",
        address: []
			},
      rule: {
				name: { required: true, message: '请输入收货人姓名', tigger: 'blur' },
				phone: { required: true, type: "number", message: '请输入收货人联系方式', tigger: 'blur' },
				address: { required: true, type: 'array', message: '请输入收货区域', tigger: 'blur' },
				detail: { required: true, message: '请输入详细收货地址', tigger: 'blur' }
			},
			address: [],
			addressList: [],
      clientHeight: 200
    };
  },
  methods: {
		edit(item) {
			this.formData = JSON.parse(JSON.stringify(item));
			this.visible = true;
		},
		remove(id) {
			removeAddress(id).then(res => {
				this.$Message.success(res.msg);
				this.initData();
			})
		},
		subForm() {
			this.$refs.form.validate(vaild => {
				if (vaild) {
					if (this.formData._id) {
						editAddress(this.formData).then(res => {
							this.$Message.success(res.msg);
							this.initData();
						})
					} else {
						subAddress(this.formData).then(res => {
							this.$Message.success(res.msg);
							this.initData();
						})
					}
				} else {
					this.$Message.error('请完整填写收货信息');
				}
			})
		},
    showModal() {
      this.visible = true;
    },
    initAddress() {
      getProvinces().then(data => {
				this.address = data.data.map(el => {
					el.children = [];
					el.loading = false;
					return el;
				})
      });
		},
		initData() {
			getAddress().then(data => {
				this.addressList = data.data.map(item => {
					item.address.forEach((el, index) => {
						console.log('el', el)
						switch (index) {
						case 0:
							getProvincesLabel(el).then(res => {
								console.log('res', res)
								item.address = res.data.label
							})
							break;
						case 1:
							getCitiesLabel(el).then(res => {
								item.address += res.data.label
							})							
							break;
						case 2:
							getAreasLabel(el).then(res => {
								item.address += res.data.label
							})							
							break;
						case 3:
							getStreetsLabel(el).then(res => {
								item.address += res.data.label
							})							
							break;
						}
					})
					console.log('item', item)
					return item;
				});
			})
		},
    loadData(item, callback) {
			item.loading = true;
			const getAddress = (fn, ...rest) => fn(...rest).then(res => {
				item.children = res.data.map(el => {
					if (item.value < 10000) {
						el.children = [];
						el.loading = false;
					}
					return el;
				})
				item.loading = false;
				callback();
			})
			if (item.value < 100 ) {
				getAddress(getCities, item.value);
			} else if (item.value < 10000) {
				getAddress(getAreas, item.value);
			} else {
				getAddress(getStreets, item.value);
			}
    }
  },
  components: {
    top,
    Inav,
    bottom
  },
  created() {
    this.clientHeight = Math.max(window.innerHeight - 280, 400);
		this.initAddress();
		this.initData();
  }
};
</script>

<style>
.container {
  background-color: #eee;
  padding: 15px 0;
}
.addressArea {
  background: url("/static/images/address.png") 0 0/100% 100% no-repeat;
  height: 111px;
  padding: 5px 10px;
  position: relative;
}
.active {
  background: url("/static/images/address-active.png") 0 0/100% 100% no-repeat;
}
.add {
  text-align: center;
  color: #aaa;
  cursor: pointer;
  transition: all 0.2s;
}
.add:hover {
  background-color: #f6f6f6;
  color: #666;
}
.add .center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.addressArea h6 {
  padding: 5px 0 2px;
  border-bottom: 2px dashed #eee;
}
.addressArea p {
  margin-top: 5px;
}
.control {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.area {
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
  padding: 15px;
}
.area h2 {
  padding: 15px 0;
  border-bottom: 2px solid #eee;
  font-weight: inherit;
}
.row {
  margin-top: 15px;
}
.ivu-col {
  margin-bottom: 10px;
}
</style>