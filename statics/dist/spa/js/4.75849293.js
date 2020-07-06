(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"58e6":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t._m(0),t._m(1),e("div",{staticClass:"row justify-center q-px-xs-sm"},[e("div",{staticClass:"col-xs-12 col-sm-6"},[e("div",{staticClass:"q-my-sm"},[e("label",{attrs:{for:""}},[t._v("Title")]),e("q-input",{attrs:{filled:"",color:"secondary",rules:[function(t){return!!t||"Title is required"}]},model:{value:t.title,callback:function(s){t.title=s},expression:"title"}})],1),e("div",{staticClass:"q-my-sm"},[e("label",{attrs:{for:""}},[t._v("Description")]),e("div",{staticClass:"q-pa-mda"},[e("q-input",{attrs:{filled:"",type:"textarea",color:"secondary",rules:[function(t){return!!t||"Description is required"}]},model:{value:t.desc,callback:function(s){t.desc=s},expression:"desc"}})],1)]),e("div",{staticClass:"q-my-sm"},[e("label",{attrs:{for:""}},[t._v("Tags (separated by commas)")]),e("q-input",{attrs:{filled:"",color:"secondary"},model:{value:t.tags,callback:function(s){t.tags=s},expression:"tags"}})],1),e("div",[e("q-btn",{attrs:{color:"secondary",label:"post a question"},on:{click:t.postQuestion}})],1)])])])},a=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row justify-center"},[e("div",{staticClass:"col-md-8"},[e("h4",{},[t._v("Expert Advice")]),e("p",[t._v("Get answer to difficult questions.")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row justify-center"},[e("div",{staticClass:"col-md-8"},[e("h4",{staticClass:"q-my-md"},[t._v("Ask a question")])])])}],o={data:function(){return{title:"",desc:"",tags:""}},methods:{postQuestion:function(){var t=this;""===this.title||""===this.desc?this.$store.dispatch("showAlert","Title and Description is required"):this.$axios.post("api/ask",{title:this.title,desc:this.desc,tags:this.tags},{headers:{Authorization:"Bearer ".concat(this.$store.getters.getAuthToken)}}).then((function(s){console.log(s.data),t.$store.dispatch("showInfo",s.data.msg),t.$router.push("/")})).catch((function(s){console.log(s),t.$store.dispatch("showAlert",s.response.data.msg)}))}}},c=o,n=e("2877"),r=e("27f9"),l=e("9c40"),d=e("eebe"),u=e.n(d),p=Object(n["a"])(c,i,a,!1,null,null,null);s["default"]=p.exports;u()(p,"components",{QInput:r["a"],QBtn:l["a"]})}}]);