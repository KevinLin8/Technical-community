import Vue from 'vue'
import VueParticles from 'vue-particles' //粒子背景
import {
  Button,
  Select,
  Row,
  Col,
  Card,
  Message,
  MessageBox,
  Input,
  Option,
  Form,
  DatePicker,
  TimePicker,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  FormItem,
  Alert,
} from 'element-ui'
Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Input)
Vue.use(Option)
Vue.use(Form)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(VueParticles) //粒子背景
