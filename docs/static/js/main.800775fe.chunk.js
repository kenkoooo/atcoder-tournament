(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{61:function(e,t,a){e.exports=a(75)},66:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),c=a.n(l),o=a(50),i=a(55),m=a(114),u=a(110),s=a(115),d=a(116),p=a(77),h=a(111),g=a(106),E=a(112),f=a(26),b=a(10),v=(a(66),function(){return r.a.createElement(g.a,{maxWidth:"lg"},r.a.createElement(u.a,null),r.a.createElement(p.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"ABC Tournament \u30eb\u30fc\u30eb"),r.a.createElement(p.a,{variant:"h5",color:"textSecondary",component:"p"},r.a.createElement("ul",null,r.a.createElement("li",null,"ABC \u306e\u7d50\u679c\u3092\u4f7f\u3063\u305f\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u6226\u3067\u3059\u3002"),r.a.createElement("li",null,"\u5404\u8a66\u5408\u306f 1 \u5bfe 1 \u3067\u884c\u308f\u308c\u3001AtCoder \u306e ABC \u7d1a\u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3067\u306e\u9806\u4f4d\u304c\u9ad8\u304b\u3063\u305f\u65b9\u304c\u52dd\u8005\u3068\u306a\u308a\u3001\u6b21\u306e\u8a66\u5408\u306b\u9032\u51fa\u3057\u307e\u3059\u3002"),r.a.createElement("li",null,"ABC\u7d1a\u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3068\u306f\u30ec\u30fc\u30c6\u30a3\u30f3\u30b0\u66f4\u65b0\u5bfe\u8c61\u304c 0 - 1999 \u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3067\u3059\u3002"),r.a.createElement("li",null,"\u540c\u9806\u4f4d\u306e\u5834\u5408\u306f\u30ec\u30fc\u30c8\u304c\u9ad8\u3044\u65b9\u3092\u52dd\u8005\u3068\u3057\u307e\u3059\u3002"),r.a.createElement("li",null,"\u5404\u8a66\u5408\u306e\u5bfe\u8c61\u3068\u306a\u308b ABC \u306f\u4ee5\u4e0b\u306e\u3068\u304a\u308a\u3067\u3059\u3002",r.a.createElement("ul",null,r.a.createElement("li",null,"1 \u56de\u6226 -"," ",r.a.createElement(h.a,{href:"https://atcoder.jp/contests/abc177"},"AtCoder Beginner Contest 177")),r.a.createElement("li",null,"2 \u56de\u6226\u4ee5\u964d - AtCoder \u304b\u3089\u30a2\u30ca\u30a6\u30f3\u30b9\u304c\u3042\u308a\u6b21\u7b2c\u66f4\u65b0\u3057\u307e\u3059\u3002"))))))}),x=a(30),C=a(119),y=a(117),B=a(118),j=a(54),N=a.n(j),O=Object(E.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),k=function(){var e=O(),t=Object(n.useState)(""),a=Object(x.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)("Input"),i=Object(x.a)(o,2),m=i[0],s=i[1];return"Registered"===m?r.a.createElement(b.a,{to:"/"}):r.a.createElement(g.a,{maxWidth:"xs"},r.a.createElement(u.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,{className:e.avatar},r.a.createElement(N.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"Register"),r.a.createElement("form",{className:e.form,noValidate:!0,onSubmit:function(e){e.preventDefault(),fetch("https://atcoder-tournament.herokuapp.com/api/user",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"atcoder_id=".concat(l,"&season_id=").concat(_)}).then((function(){s("Registered")})).catch((function(){s("Failed")}))}},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"AtCoder ID",autoFocus:!0,value:l,onChange:function(e){var t=e.target.value;/^[a-zA-Z0-9\-_]*$/.test(t)&&c(t)}}),r.a.createElement(B.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,disabled:0===l.length},"Register"))))},A=a(113),T=function e(t){return 0===t.node.children.length?r.a.createElement("p",null,t.node.name):r.a.createElement("div",{className:"item"},r.a.createElement("div",{className:"item-parent"},r.a.createElement("p",null,t.node.name)),r.a.createElement("div",{className:"item-children"},t.node.children.map((function(t,a){return r.a.createElement("div",{key:a,className:"item-child"},r.a.createElement(e,{node:t}))}))))},w=function(e){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(T,{node:e.root}))},S=(a(74),Object(E.a)((function(e){return{heroContent:{padding:e.spacing(8,0,6)}}}))),W=function(e){var t=Object(n.useState)([]),a=Object(x.a)(t,2),l=a[0],c=a[1],o=S();Object(n.useEffect)((function(){fetch("https://atcoder-tournament.herokuapp.com/api/users?season_id=".concat(e.season_id)).then((function(e){return e.json()})).then((function(e){return c(e)}))}),[e.season_id]);var i=l.length>0?function(e){for(var t=1;2*t<=e.length;)t*=2;for(var a=[],n=0;n<t;n++)if(t+n<e.length){var r=e[n],l=e[t+n];a.push({name:"...",children:[{name:l,children:[]},{name:r,children:[]}]})}else a.push({name:e[n],children:[]});for(var c=a;c.length>1;){for(var o=[],i=0;i<c.length;i+=2){var m=c[i];if(i+1===c.length)o.push({name:"...",children:[m]});else{var u=c[i+1];o.push({name:"...",children:[m,u]})}}c=o}return c[0]}(l):{name:"loading",children:[]};return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null),r.a.createElement(g.a,{maxWidth:"lg",className:o.heroContent},r.a.createElement(A.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"AtCoder Beginner Contest Tournament"),r.a.createElement(w,{root:i}))))},_=1,P=Object(i.a)({palette:{type:"dark"}}),I=Object(E.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(o.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),D=function(){var e=I();return r.a.createElement(f.a,null,r.a.createElement(m.a,{theme:P},r.a.createElement(u.a,null),r.a.createElement(s.a,{position:"static",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:f.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(h.a,{component:f.b,variant:"button",color:"textPrimary",to:"/submit",className:e.link},"\u767b\u9332"),r.a.createElement(h.a,{component:f.b,variant:"button",color:"textPrimary",to:"/rule",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(g.a,{component:"main",maxWidth:"lg"},r.a.createElement(b.d,null,r.a.createElement(b.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(W,{season_id:null!==t&&void 0!==t?t:_.toString()})}}),r.a.createElement(b.b,{path:"/submit"},r.a.createElement(k,null)),r.a.createElement(b.b,{path:"/rule"},r.a.createElement(v,null)),r.a.createElement(b.a,{path:"/",to:"/tournament/".concat(_)})))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.800775fe.chunk.js.map