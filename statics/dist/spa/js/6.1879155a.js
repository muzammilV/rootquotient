(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{bdde:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t._m(0),e("div",{staticClass:"row q-px-xs-md q-px-sm-md q-px-md-xl q-px-xl"},[e("div",{staticClass:"col-2"},[t._v(t._s(t.views))]),e("div",{staticClass:"col-8 q-px-md"},[e("div",[e("b",[t._v(t._s(t.title))])]),e("div",{staticClass:"text-body1",staticStyle:{width:"100%","text-align":"justify","word-break":"break-all"}},[e("p",[t._v(t._s(t.desc))]),e("b",[t._v("Answers")])])])]),e("div",{staticClass:"row q-px-xs-md q-px-sm-md q-px-md-xl q-px-xl"},[e("div",{staticClass:"col-2"}),e("div",{staticClass:"col-8 q-px-md"},[e("div",{staticClass:"text-body1",staticStyle:{width:"100%","text-align":"justify","word-break":"break-all"}},[t.noans?e("div",{staticClass:"text-center"},[e("b",[t._v("No Answers Submitter yet!!")])]):t._l(t.answers,(function(s,a){return e("div",{key:s._id,staticClass:"q-pa-xs"},[t._v(t._s(a+1)+"."+t._s(s.answer))])}))],2)])]),e("div",{staticClass:"row justify-center q-pa-xs-md q-pa-sm-md q-pa-md-xl q-pa-xl"},[e("div",{staticClass:"col-6 col-xs-12 col-sm-12 col-md-6"},[e("h6",{staticClass:"q-my-sm"},[t._v("ANSWERS")]),e("q-input",{attrs:{color:"secodary",outlined:"",type:"textarea",label:"Answer"},model:{value:t.newans,callback:function(s){t.newans=s},expression:"newans"}}),e("q-btn",{staticClass:"q-mt-xs",attrs:{color:"secondary",label:"POst answer"},on:{click:t.onSubmittingAns}})],1)])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row q-pa-xs-md q-pa-sm-md q-pa-md-xl q-pa-xl text-weight-bold"},[e("div",{staticClass:"col-2"},[t._v("Views")]),e("div",{staticClass:"col-8 q-px-md"},[t._v("Questions")])])}],n={name:"SingleQuestion",data:function(){return{id:"",title:"",views:"",desc:"",answers:[],newans:"",noans:!0}},beforeMount:function(){var t=this;this.$route.query.id?(this.id=this.$route.query.id,this.$axios.get("api/ask/single?id=".concat(this.$route.query.id,"&page=1")).then((function(s){console.log(s.data),s.data.answers.length>0&&(t.answers=s.data.answers,t.noans=!1),t.title=s.data.questions.title,t.desc=s.data.questions.desc,t.views=s.data.questions.views})).catch((function(t){}))):(this.$store.dispatch("showAlert","Invalid URL"),this.$router.push("/"))},methods:{onSubmittingAns:function(){var t=this;this.$store.getters.getAuth?this.$axios.post("api/ask/answer",{questionId:this.id,answer:this.newans},{headers:{Authorization:"Bearer ".concat(this.$store.getters.getAuthToken)}}).then((function(s){t.$router.go()})).catch((function(t){console.log(t)})):this.$store.dispatch("showAlert","Please login to ans")}}},o=n,l=e("2877"),c=e("27f9"),d=e("9c40"),r=e("eebe"),u=e.n(r),p=Object(l["a"])(o,a,i,!1,null,null,null);s["default"]=p.exports;u()(p,"components",{QInput:c["a"],QBtn:d["a"]})}}]);