(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(16),u=n.n(c),o=n(1),i=n.n(o),s=n(3),l=n(4),b=n(0),j=function(e){var t=e.blog,n=e.onLikeBlog,a=e.onRemoveBlog,c=Object(r.useState)(!1),u=Object(l.a)(c,2),o=u[0],i=u[1],s=function(){i(!o)};return Object(b.jsx)("div",{children:o?Object(b.jsxs)("div",{className:"detail-view",children:[t.title," by ",t.author," on ",t.url," likes ",t.likes,Object(b.jsx)("button",{value:"like",onClick:function(){return n(t.id)},children:"like"}),Object(b.jsx)("button",{value:"delete",onClick:function(){return a(t.id,t)},children:"delete"}),Object(b.jsx)("button",{value:"hide",onClick:s,children:"hide"})]}):Object(b.jsxs)("div",{className:"short-view",children:[t.title," by ",t.author,Object(b.jsx)("button",{value:"view",onClick:s,children:"view"})]})})},f=function(e){var t=e.onLogin,n=Object(r.useState)(""),a=Object(l.a)(n,2),c=a[0],u=a[1],o=Object(r.useState)(""),j=Object(l.a)(o,2),f=j[0],p=j[1],d=function(){var e=Object(s.a)(i.a.mark((function e(n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={username:c,password:f},e.next=4,t(r);case 4:u(""),p("");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(b.jsxs)("form",{onSubmit:d,children:["username ",Object(b.jsx)("input",{type:"text",name:"username",id:"getUsername",value:c,onChange:function(e){var t=e.target;return u(t.value)}}),Object(b.jsx)("br",{})," password ",Object(b.jsx)("input",{type:"text",name:"password",id:"getPassword",value:f,onChange:function(e){var t=e.target;return p(t.value)}}),Object(b.jsx)("input",{type:"submit",name:"submit",id:"submitForm",value:"Submit"})]})},p=a.a.forwardRef((function(e,t){var n=Object(r.useState)(!1),a=Object(l.a)(n,2),c=a[0],u=a[1],o=function(){u(!c)};return Object(r.useImperativeHandle)(t,(function(){return{handleCreateBlogClick:o}})),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{style:{display:c?"None":""},children:Object(b.jsx)("input",{className:"changable-btn",type:"button",value:e.btnLabel,onClick:o})}),Object(b.jsxs)("div",{style:{display:c?"":"None"},className:"show-child",children:[e.children,Object(b.jsx)("input",{type:"button",value:"cancel",onClick:o})]})]})}));p.displayName="Toggable";var d=p,v=function(e){var t=e.onBlogPost,n=Object(r.useState)(""),a=Object(l.a)(n,2),c=a[0],u=a[1],o=Object(r.useState)(""),j=Object(l.a)(o,2),f=j[0],p=j[1],d=Object(r.useState)(""),v=Object(l.a)(d,2),h=v[0],O=v[1],x=function(){var e=Object(s.a)(i.a.mark((function e(n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={title:c,author:h,url:f},e.next=4,t(r);case 4:e.sent&&(u(""),O(""),p(""));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(b.jsxs)("div",{children:["Create new",Object(b.jsxs)("form",{onSubmit:x,children:["title ",Object(b.jsx)("input",{className:"title",value:c,onChange:function(e){var t=e.target;u(t.value)}}),Object(b.jsx)("br",{}),"author ",Object(b.jsx)("input",{className:"author",value:h,onChange:function(e){var t=e.target;O(t.value)}}),Object(b.jsx)("br",{}),"url ",Object(b.jsx)("input",{className:"url",value:f,onChange:function(e){var t=e.target;p(t.value)}}),Object(b.jsx)("br",{}),Object(b.jsx)("input",{type:"submit",value:"create"})]})]})},h=n(6),O=n.n(h),x="/api/blogs",g=null,m={getAll:function(){return O.a.get(x).then((function(e){return e.data}))},create:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,O.a.post(x,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){g="bearer ".concat(e)},likeBlog:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!g){e.next=6;break}return n={headers:{Authorization:g}},e.next=4,O.a.put("".concat(x,"/").concat(t),n);case 4:return r=e.sent,e.abrupt("return",r.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!g){e.next=6;break}return n={headers:{Authorization:g}},e.next=4,O.a.delete("".concat(x,"/").concat(t),n);case 4:return r=e.sent,e.abrupt("return",r.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},w={login:function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},k=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),u=Object(l.a)(c,2),o=u[0],p=u[1],h=Object(r.useState)(""),O=Object(l.a)(h,2),x=O[0],g=O[1];Object(r.useEffect)((function(){m.getAll().then((function(e){return a(e)}))}),[]),Object(r.useEffect)((function(){var e=!0,t=window.localStorage.getItem("loggedUserJSON");if(e&&t){var n=JSON.parse(t);g(n),m.setToken(n.token)}return function(){e=!1}}),[]);var k=Object(r.useRef)(),y=Object(r.useRef)(),S=function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,k.current.handleCreateBlogClick(),e.next=4,w.login(t);case 4:return n=e.sent,g(n),window.localStorage.setItem("loggedUserJSON",JSON.stringify(n)),e.abrupt("return",n);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),p("invalid username or password"),setTimeout((function(){p("")}),3e3);case 15:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(s.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,y.current.handleCreateBlogClick(),e.next=4,m.create(t);case 4:return r=e.sent,a(n.concat(r)),p("a new blog ".concat(r.title," by ").concat(r.author)),setTimeout((function(){p("")}),3e3),e.abrupt("return",r);case 11:e.prev=11,e.t0=e.catch(0),p(e.t0),setTimeout((function(){p("")}),3e3);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(s.a)(i.a.mark((function e(t){var r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.likeBlog(t);case 3:r=e.sent,c=n.map((function(e){return r.id===e.id&&(e.likes+=1),e})),a(c),p("a new blog ".concat(r.title," is liked by ").concat(x.username)),setTimeout((function(){p("")}),3e3),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),p(e.t0),setTimeout((function(){return p("")}),3e3);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(s.a)(i.a.mark((function e(t,r){var c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Remove blog ".concat(r.title," by ").concat(r.author,"?"))){e.next=15;break}return e.prev=2,console.log(r),e.next=6,m.deleteBlog(t);case 6:c=e.sent,console.log(c),a(n.filter((function(e){return e.id!==c.id}))),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),p(e.t0),setTimeout((function(){return p("")}),3e3);case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t,n){return e.apply(this,arguments)}}();return Object(b.jsx)("div",{children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:o}),x?Object(b.jsxs)("div",{children:[Object(b.jsxs)("p",{children:[x.username," logged in"]})," ",Object(b.jsx)("input",{type:"button",value:"logout",onClick:function(){window.localStorage.removeItem("user"),window.localStorage.clear(),g("")}}),Object(b.jsx)(d,{btnLabel:"create blog",ref:y,children:Object(b.jsx)(v,{onBlogPost:C})}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"blogs"}),n.sort((function(e,t){return t.likes-e.likes})).map((function(e){return Object(b.jsx)(j,{blog:e,onLikeBlog:B,onRemoveBlog:N},e.id)}))]})]}):Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Login"}),Object(b.jsx)(d,{btnLabel:"login",ref:k,children:Object(b.jsx)(f,{onLogin:S})})]})]})})};u.a.render(Object(b.jsx)(k,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.615c7751.chunk.js.map