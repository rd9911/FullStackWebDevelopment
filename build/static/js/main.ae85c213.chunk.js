(this["webpackJsonppart2-2"]=this["webpackJsonppart2-2"]||[]).push([[0],{40:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(16),o=n.n(a),r=n(7),u=n(3),i=n(5),s=n(0),l=function(e){var t=e.contact,n=e.deleteClick;return Object(s.jsxs)("div",{children:[Object(s.jsxs)("li",{children:[t.name," ",t.number]},Object(i.a)()),Object(s.jsx)("button",{onClick:n,children:"Delete"})]})},d=function(e){var t=e.value,n=e.onChange;return Object(s.jsx)("input",{value:t,onChange:n})},j=function(e){var t=e.value,n=e.onChange;return Object(s.jsx)("input",{value:t,onChange:n})},b=function(e){var t=e.value,n=e.onChange;return Object(s.jsx)("input",{value:t,onChange:n})},h=n(4),f=n.n(h),O="/api/persons",v={getAll:function(){return f.a.get(O).then((function(e){return e.data})).catch((function(e){console.log(e)}))},create:function(e){var t={method:"post",url:"".concat(O),data:e,headers:{"Content-Type":"application/json"},json:!0};return f()(t).then((function(e){return console.log(e.data),e.data})).catch((function(e){console.log(e)}))},deleteContact:function(e){return f.a.delete("".concat(O,"/").concat(e)).then((function(e){return e.data}))},update:function(e,t){return f.a.put("".concat(O,"/").concat(e),t).then((function(e){return e.data}))}},m={outline:"solid red",fontColor:"red",outlineWidth:"auto"},p=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(""),h=Object(u.a)(o,2),f=h[0],O=h[1],p=Object(c.useState)(""),g=Object(u.a)(p,2),x=g[0],C=g[1],y=Object(c.useState)(""),S=Object(u.a)(y,2),w=S[0],k=S[1],A=Object(c.useState)(""),D=Object(u.a)(A,2),T=D[0],E=D[1],J=Object(c.useState)(!0),B=Object(u.a)(J,2),I=B[0],N=B[1];Object(c.useEffect)((function(){v.getAll().then((function(e){return a(e)})).catch((function(e){console.log(e)}))}),[]);var P=I?n:n.filter((function(e){return-1!==e.name.indexOf(w)}));return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),""===T?"":Object(s.jsx)("div",{style:m.messageToUser,children:Object(s.jsx)("h1",{style:{fontColor:"red"},children:T})}),Object(s.jsxs)("div",{children:["Search a name ",Object(s.jsx)(d,{value:w,onChange:function(e){k(e.target.value),N(!1)}})]}),Object(s.jsx)("h2",{children:"Add a new contact"}),Object(s.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),!1===(u=f,!!n.find((function(e){return e.name===u})))){var t={name:f,number:x};v.create(t).then((function(e){console.log(e),a(n.concat(e)),O(""),C(""),E("".concat(e.name," is added."))}))}else if(window.confirm("".concat(f," is already exist. Thus, we can replace ").concat(f,"'s number. Do you want to replace his number?"))){var c=n.find((function(e){return e.name===f})),o=Object(r.a)(Object(r.a)({},c),{},{number:x});v.update(c.id,o).then((function(e){a(n.map((function(t){return t.id===c.id?e:t}))),console.log(n),C(""),O(""),E("".concat(e.name,"'s number is changed"))})).catch((function(e){404===e.response.status&&E("".concat(c.name,"'s data have already removed."))}))}var u},action:"/api/persons",method:"post",children:[Object(s.jsxs)("div",{children:["name ",Object(s.jsx)(j,{value:f,onChange:function(e){O(e.target.value)}})]}),Object(s.jsxs)("div",{children:["number ",Object(s.jsx)(b,{value:x,onChange:function(e){C(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]}),Object(s.jsx)("h2",{children:I?"Numbers":"Result"}),Object(s.jsxs)("div",{children:["debug: ",f]}),Object(s.jsxs)("ul",{children:[console.log(P),P.map((function(e){return Object(s.jsx)(l,{contact:e,deleteClick:function(){return t=e.id,console.log(t),void v.deleteContact(t).then((function(e){a(n.filter((function(e){return e.id!==t})))}));var t}},Object(i.a)())}))]})]})};o.a.render(Object(s.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.ae85c213.chunk.js.map