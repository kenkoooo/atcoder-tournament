(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{75:function(e,t,n){e.exports=n(90)},80:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(10),o=n.n(c),l=n(62),i=n(67),u=n(135),m=n(126),s=n(136),p=n(137),d=n(91),g=n(127),h=n(122),f=n(128),E=n(34),v=n(11),b=(n(80),function(){return r.a.createElement(h.a,{maxWidth:"lg"},r.a.createElement(m.a,null),r.a.createElement(d.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"ABC Tournament \u30eb\u30fc\u30eb"),r.a.createElement(d.a,{variant:"h5",color:"textSecondary",component:"p"},r.a.createElement("ul",null,r.a.createElement("li",null,"ABC \u306e\u7d50\u679c\u3092\u4f7f\u3063\u305f\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u6226\u3067\u3059\u3002"),r.a.createElement("li",null,"\u5404\u8a66\u5408\u306f 1 \u5bfe 1 \u3067\u884c\u308f\u308c\u3001AtCoder \u306e ABC \u7d1a\u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3067\u306e\u9806\u4f4d\u304c\u9ad8\u304b\u3063\u305f\u65b9\u304c\u52dd\u8005\u3068\u306a\u308a\u3001\u6b21\u306e\u8a66\u5408\u306b\u9032\u51fa\u3057\u307e\u3059\u3002"),r.a.createElement("li",null,"ABC\u7d1a\u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3068\u306f\u30ec\u30fc\u30c6\u30a3\u30f3\u30b0\u66f4\u65b0\u5bfe\u8c61\u304c 0 - 1999 \u306e\u30b3\u30f3\u30c6\u30b9\u30c8\u3067\u3059\u3002"),r.a.createElement("li",null,"\u540c\u9806\u4f4d\u306e\u5834\u5408\u306f2020\u5e748\u670829\u65e5 19:00 JST\u6642\u70b9\u3067\u306e\u30ec\u30fc\u30c8\u304c\u9ad8\u3044\u65b9\u3092\u52dd\u8005\u3068\u3057\u307e\u3059\u3002"),r.a.createElement("li",null,"\u5404\u8a66\u5408\u306e\u5bfe\u8c61\u3068\u306a\u308b ABC \u306f\u4ee5\u4e0b\u306e\u3068\u304a\u308a\u3067\u3059\u3002",r.a.createElement("ul",null,r.a.createElement("li",null,"1 \u56de\u6226 -"," ",r.a.createElement(g.a,{href:"https://atcoder.jp/contests/abc177"},"AtCoder Beginner Contest 177")),r.a.createElement("li",null,"2 \u56de\u6226\u4ee5\u964d - AtCoder \u304b\u3089\u30a2\u30ca\u30a6\u30f3\u30b9\u304c\u3042\u308a\u6b21\u7b2c\u66f4\u65b0\u3057\u307e\u3059\u3002"))))))}),y=n(20),j=n(140),x=n(138),C=n(129),O=n(66),w=n.n(O),k=Object(f.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),B=function(){var e=k(),t=Object(a.useState)(""),n=Object(y.a)(t,2),c=n[0],o=n[1],l=Object(a.useState)("Input"),i=Object(y.a)(l,2),u=i[0],s=i[1];return"Registered"===u?r.a.createElement(v.a,{to:"/"}):r.a.createElement(h.a,{maxWidth:"xs"},r.a.createElement(m.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(j.a,{className:e.avatar},r.a.createElement(w.a,null)),r.a.createElement(d.a,{component:"h1",variant:"h5"},"Register"),r.a.createElement("form",{className:e.form,noValidate:!0,onSubmit:function(e){e.preventDefault(),fetch("https://atcoder-tournament.herokuapp.com/api/user",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"atcoder_id=".concat(c,"&season_id=").concat(1)}).then((function(){s("Registered")})).catch((function(){s("Failed")}))}},r.a.createElement(x.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"AtCoder ID",autoFocus:!0,value:c,onChange:function(e){var t=e.target.value;/^[a-zA-Z0-9\-_]*$/.test(t)&&o(t)}}),r.a.createElement(C.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,disabled:0===c.length},"Register"))))},I=n(133),N=n(139),R=n(134),S=n(48),A=n(49),T=n(130),P=n(50),M=n(131),W=n(51),D=n(132),_=n(47),F=Object(f.a)((function(){return{red:{color:S.a[500]},orange:{color:A.a[500]},yellow:{color:T.a[500]},blue:{color:P.a[500]},lightBlue:{color:M.a[500]},green:{color:W.a[500]},brown:{color:D.a[500]},grey:{color:_.a[500]}}})),J=function(e){var t,n=F(),a=e.getRating(e.children);return a?(t=a<400?n.grey:a<800?n.brown:a<1200?n.green:a<1600?n.lightBlue:a<2e3?n.blue:a<2400?n.yellow:a<2800?n.orange:n.red,r.a.createElement("p",null,r.a.createElement(g.a,{className:t,href:"https://atcoder.jp/users/".concat(e.children)},e.children))):r.a.createElement("p",null,e.children)},U=function e(t){return 0===t.node.children.length?r.a.createElement(J,{getRating:t.getRating},t.node.name):r.a.createElement("div",{className:"item"},r.a.createElement("div",{className:"item-parent"},r.a.createElement(J,{getRating:t.getRating},t.node.name)),r.a.createElement("div",{className:"item-children"},t.node.children.map((function(n,a){return r.a.createElement("div",{key:a,className:"item-child"},r.a.createElement(e,{getRating:t.getRating,node:n}))}))))},q=function(e){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(U,{getRating:e.getRating,node:e.root}))},z=function(e,t){return function e(t,n,a,r){var c=a-n-1,o=t.children.map((function(t){return e(t,n+1,a,r)})),l=o.map((function(e){return e.name}));return{name:0===l.length?t.name:r(c,l),children:o}}(e,0,function e(t,n){var a=n;return t.children.forEach((function(t){a=Math.max(e(t,n+1),a)})),a}(e,0),t)},G=function(e){var t=e.atCoderUserIds,n=e.contestResults,a=e.ratingMap,c=t.length>0?function(e){for(var t=1;2*t<=e.length;)t*=2;for(var n=[],a=0;a<t;a++)if(t+a<e.length){var r=e[a],c=e[t+a];n.push({name:"...",children:[{name:c,children:[]},{name:r,children:[]}]})}else n.push({name:e[a],children:[]});for(var o=n;o.length>1;){for(var l=[],i=0;i<o.length;i+=2){var u=o[i];if(i+1===o.length)l.push({name:"...",children:[u]});else{var m=o[i+1];l.push({name:"...",children:[u,m]})}}o=l}return o[0]}(t):{name:"loading",children:[]},o=z(c,(function(e,t){if(!n||n.length<=e)return"...";var r=t.map((function(t){var a;return null!==(a=n[e].get(t))&&void 0!==a?a:1e5})),c=t.map((function(e){var t;return null!==(t=null===a||void 0===a?void 0:a.get(e))&&void 0!==t?t:0}));return t.map((function(e,t){return{userId:e,rating:c[t],rank:r[t]}})).sort((function(e,t){return e.rank===t.rank?t.rating-e.rating:e.rank-t.rank}))[0].userId}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,{root:o,getRating:function(e){return null===a||void 0===a?void 0:a.get(e)}}))},H=n(19),L=n.n(H),V=n(35);function Z(e){return $.apply(this,arguments)}function $(){return($=Object(V.a)(L.a.mark((function e(t){var n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://atcoder-tournament.herokuapp.com/api/users?season_id=".concat(t)).then((function(e){return e.json()}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(){return Q.apply(this,arguments)}function Q(){return(Q=Object(V.a)(L.a.mark((function e(){var t,n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./ratings.json").then((function(e){return e.json()}));case 2:return t=e.sent,n=new Map,t.forEach((function(e){n.set(e.user_id,e.rating)})),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(){return(X=Object(V.a)(L.a.mark((function e(t){var n,a,r,c,o;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([K(),Z(t)]);case 2:return n=e.sent,a=Object(y.a)(n,2),r=a[0],c=a[1],o=[],c.forEach((function(e){var t=r.get(e);t&&o.push({rating:t,userId:e})})),o.sort((function(e,t){return e.rating===t.rating?e.userId.localeCompare(t.userId):t.rating-e.rating})),e.abrupt("return",o.map((function(e){return e.userId})));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(){return(Y=Object(V.a)(L.a.mark((function e(){return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([]));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(89);var ee=Object(f.a)((function(e){return{heroContent:{padding:e.spacing(8,0,6)}}})),te=function(e){var t,n=ee(),c=Object(a.useState)([]),o=Object(y.a)(c,2),l=o[0],i=o[1],u=Object(a.useState)(void 0),s=Object(y.a)(u,2),p=s[0],g=s[1],f=Object(a.useState)(void 0),E=Object(y.a)(f,2),v=E[0],b=E[1],j=Object(a.useState)(0),x=Object(y.a)(j,2),C=x[0],O=x[1];Object(a.useEffect)((function(){(function(e){return X.apply(this,arguments)})(e.seasonId).then((function(e){return i(e)}))}),[e.seasonId]),Object(a.useEffect)((function(){p||K().then((function(e){return g(e)})),v||function(){return Y.apply(this,arguments)}().then((function(e){return b(e)}))}));for(var w=Math.ceil(l.length/128),k=Math.ceil(l.length/Math.max(w,1)),B=[],S=l.length-1;S>=0;){for(var A=[];S>=0&&A.length<k;)A.push(l[S]),S-=1;B.push(A.reverse())}return B.reverse(),r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,null),r.a.createElement(h.a,{maxWidth:"lg",className:n.heroContent},r.a.createElement(I.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(d.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"AtCoder Beginner Contest Tournament"),r.a.createElement(d.a,{component:"h4",variant:"h4",align:"center",color:"textPrimary",gutterBottom:!0},"\u767b\u9332\u7de0\u3081\u5207\u308a : 2020\u5e748\u670829\u65e5 19:00 JST"),r.a.createElement(d.a,{component:"div",variant:"body1",align:"center",color:"textPrimary",gutterBottom:!0},"\u73fe\u5728\u306e\u53c2\u52a0\u4eba\u6570: ".concat(l.length)),r.a.createElement(N.a,{value:C,onChange:function(e,t){return O(t)},centered:!0},B.map((function(e,t){return r.a.createElement(R.a,{label:"CLASS ".concat((n=t,0===n?"A":n<3?"B".concat(n):n<7?"C".concat(n-2):"D".concat(n-6))),key:t});var n}))))),r.a.createElement(G,{atCoderUserIds:null!==(t=B[C])&&void 0!==t?t:[],ratingMap:p,contestResults:v}))},ne=Object(i.a)({palette:{type:"dark"}}),ae=Object(f.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(l.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),re=function(){var e=ae(),t=Date.now()/1e3;return r.a.createElement(E.a,null,r.a.createElement(u.a,{theme:ne},r.a.createElement(m.a,null),r.a.createElement(s.a,{position:"static",color:"default",elevation:0,className:e.appBar},r.a.createElement(p.a,{className:e.toolbar},r.a.createElement(d.a,{component:E.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,t<1598695200&&r.a.createElement(g.a,{component:E.b,variant:"button",color:"textPrimary",to:"/submit",className:e.link},"\u767b\u9332"),r.a.createElement(g.a,{component:E.b,variant:"button",color:"textPrimary",to:"/rule",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(h.a,{component:"main",maxWidth:"lg"},r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(te,{seasonId:null!==t&&void 0!==t?t:1..toString()})}}),r.a.createElement(v.b,{path:"/submit"},r.a.createElement(B,null)),r.a.createElement(v.b,{path:"/rule"},r.a.createElement(b,null)),r.a.createElement(v.a,{path:"/",to:"/tournament/".concat(1)})))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(re,null)),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.60d0949f.chunk.js.map