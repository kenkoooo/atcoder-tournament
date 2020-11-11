(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{81:function(e,t,n){e.exports=n(94)},94:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),i=n.n(o),c=n(39),l=n(70),u=n(137),s=n(129),m=n(138),d=n(139),p=n(97),f=n(134),h=n(128),g=n(127),b=n(38),x=n(11),E=n(27),v=n(54),y=n(140),k=n(126),C=n(143),j=n(130),O=n(68),w=n.n(O),N=function(e){var t=S();return r.a.createElement("form",{className:t.form,noValidate:!0,onSubmit:function(t){t.preventDefault(),e.register(e.state)}},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"AtCoder ID",autoFocus:!0,value:e.state.userId,onChange:function(t){var n=t.target.value;/^[a-zA-Z0-9\-_]*$/.test(n)&&e.setState(Object(v.a)(Object(v.a)({},e.state),{},{userId:n}))}}),r.a.createElement(k.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,disabled:0===e.state.userId.length},"\u767b\u9332"))},I=function(e){var t=S();return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"\u672c\u4eba\u78ba\u8a8d\u306e\u305f\u3081\u3001AtCoder \u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3001\u6240\u5c5e\u3092\u4e00\u6642\u7684\u306b"),r.a.createElement("code",null,e.state.code),r.a.createElement("p",null,"\u306b\u5909\u66f4\u3057\u3066\u3001\u300c\u78ba\u8a8d\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),r.a.createElement(k.a,{onClick:e.confirm,type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"\u78ba\u8a8d"))},S=Object(g.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),B=function(){var e=S(),t=Object(a.useState)({type:"Input",userId:""}),n=Object(E.a)(t,2),o=n[0],i=n[1];return r.a.createElement(h.a,{maxWidth:"xs"},r.a.createElement(s.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,{className:e.avatar},r.a.createElement(w.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"\u7b2c2\u671f"),r.a.createElement(p.a,{component:"h1",variant:"h5"},"ABC\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u53c2\u52a0\u767b\u9332"),"Input"===o.type&&r.a.createElement(N,{state:o,setState:i,register:function(e){i({type:"Pending"}),fetch("https://atcoder-auth.kenkoooo.com/api/authorize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e.userId})}).then((function(e){return e.json()})).then((function(t){i({type:"Verify",userId:e.userId,secret:t.secret,code:t.verification_code})})).catch((function(){i({type:"Failed"})}))}}),"Verify"===o.type&&r.a.createElement(I,{state:o,confirm:function(){return e=o,i({type:"Pending"}),void fetch("https://atcoder-auth.kenkoooo.com/api/confirm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e.userId,secret:e.secret})}).then((function(e){return e.json()})).then((function(t){var n=t.token;return fetch("https://atcoder-tournament.herokuapp.com/api/user",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"user_id=".concat(e.userId,"&token=").concat(n)})})).then((function(){i({type:"Registered"})})).catch((function(){i({type:"Failed"})}));var e}}),"Failed"===o.type&&r.a.createElement("p",null,"\u767b\u9332\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u672c\u4eba\u78ba\u8a8d\u306b\u5931\u6557\u3057\u305f\u304b\u3001\u65e2\u306b\u767b\u9332\u6e08\u307f\u3067\u3059\u3002"),"Registered"===o.type&&r.a.createElement("p",null,"\u767b\u9332\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002"),"Pending"===o.type&&r.a.createElement(j.a,null)))},T=n(135),_=n(142),A=n(136),P=n(141),W=n(48),L=n(49),R=n(131),F=n(50),D=n(132),z=n(51),U=n(133),J=n(47),V=Object(g.a)((function(){return{red:{color:W.a[500]},orange:{color:L.a[500]},yellow:{color:R.a[500]},blue:{color:F.a[600]},lightBlue:{color:D.a[200]},green:{color:z.a[400]},brown:{color:U.a[400]},grey:{color:J.a[500]}}})),Y=function(e){var t,n=V(),a=e.children,o=e.rating;if(!o)return r.a.createElement("p",null,a);t=o<400?n.grey:o<800?n.brown:o<1200?n.green:o<1600?n.lightBlue:o<2e3?n.blue:o<2400?n.yellow:o<2800?n.orange:n.red;var i=a.length<=13?a:a.slice(0,10)+"...";return r.a.createElement(f.a,{className:t,href:"https://atcoder.jp/users/".concat(a)},i)},H=Object(g.a)({nodeBox:{textShadow:"rgb(34,34,34) 1px 1px 1px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",fontSize:"12px",minWidth:"120px",minHeight:"24px",backgroundColor:"#595a5e"},nameContainer:{padding:"3px",margin:0,textAlign:"center"},rankContainer:{padding:"3px",borderWidth:0,borderRadius:"3px",marginLeft:"auto",fontSize:"10px",minWidth:"24px",backgroundColor:function(e){return e.winner?"#f58540":"#828489"}},nodeText:{padding:"3px",margin:0,textAlign:"center"},rankText:{color:"black",textAlign:"center",textShadow:"none"}}),M=function(e){var t=e.user,n=e.rank,a=e.winner,o=H({winner:a});if(!t)return r.a.createElement("div",{className:o.nodeBox},r.a.createElement("p",null,"..."));if(!n)return r.a.createElement("div",{className:o.nodeBox},r.a.createElement("div",{className:o.nameContainer},r.a.createElement(Y,{rating:t.rating},t.user_id)));var i=n>1e5?"-":n;return r.a.createElement(P.a,{display:"flex",justifyContent:"center",className:o.nodeBox},r.a.createElement("div",{className:o.nameContainer},r.a.createElement(Y,{rating:t.rating},t.user_id)),r.a.createElement(P.a,{display:"flex",alignItems:"center",justifyContent:"center",className:o.rankContainer},r.a.createElement("div",{className:o.rankText},i)))},X=Object(g.a)((function(){return{item:{display:"flex",flexDirection:"row-reverse","& p":{padding:"3px",margin:0,textShadow:"rgb(34, 34, 34) 1px 1px 1px",fontSize:"14px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",minWidth:"100px",textAlign:"center"}},itemChildren:{display:"flex",flexDirection:"column",justifyContent:"center"},itemChild:{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1px",marginBottom:"1px",position:"relative","&:before":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:0,transform:"translateX(100%)",width:"calc(".concat("60px"," / 2)"),height:"3px"},"&:after":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:"calc(-".concat("60px"," / 2)"),height:"calc(50% + ".concat("1px"," * 2)"),width:"3px"},"&:not(:last-child):not(:first-child)":{"&:after":{transform:"translateY(-50%) scaleY(2)"}},"&:last-child":{"&:after":{transform:"translateY(-100%)"}},"&:only-child:after":{display:"none"}},itemParent:{position:"relative",marginLeft:"60px",display:"flex",alignItems:"center","&:after":{position:"absolute",content:'""',width:"calc(".concat("60px"," / 2)"),height:"3px",left:0,top:"50%",backgroundColor:"#fff",transform:"translateX(-100%)"}}}})),q=function e(t){var n,a,o,i=X(),c=null===(n=t.tournament.user)||void 0===n?void 0:n.user_id;return 0===t.tournament.children.length||t.depthLimit<=t.depth?r.a.createElement(M,{user:t.tournament.user,rank:t.tournament.rank,winner:void 0!==t.promotedUser&&(null===(a=t.tournament.user)||void 0===a?void 0:a.user_id)===t.promotedUser}):r.a.createElement("div",{className:i.item},r.a.createElement("div",{className:i.itemParent},r.a.createElement(M,{user:t.tournament.user,rank:t.tournament.rank,winner:void 0!==t.promotedUser&&(null===(o=t.tournament.user)||void 0===o?void 0:o.user_id)===t.promotedUser})),r.a.createElement("div",{className:i.itemChildren},t.tournament.children.map((function(n,a){return r.a.createElement("div",{key:a,className:i.itemChild},r.a.createElement(e,{tournament:n,promotedUser:c,depth:t.depth+1,depthLimit:t.depthLimit}))}))))},G=n(55),Z=n.n(G),$=n(69),K=function(e){return"2"===e?function(){return Q.apply(this,arguments)}():fetch("./bracket-".concat(e,".json")).then((function(e){return e.json()})).then((function(e){return e}))};function Q(){return(Q=Object($.a)(Z.a.mark((function e(){var t,n,a,r;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=fetch("https://atcoder-tournament.herokuapp.com/api/users").then((function(e){return e.json()})).then((function(e){return e})),n=fetch("./ratings.json").then((function(e){return e.json()})).then((function(e){return e})).then((function(e){var t=new Map;return e.forEach((function(e){t.set(e.user_id,e.rating)})),t})),e.next=4,n;case 4:return a=e.sent,e.next=7,t;case 7:return r=e.sent.map((function(e){var t;return{user_id:e,rating:null!==(t=a.get(e))&&void 0!==t?t:0}})),e.abrupt("return",ee(r));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ee=function(e){var t={A:[],B1:[],B2:[],C1:[],C2:[],C3:[]},n=[];e.forEach((function(e){var a=["kort0n","heno239","LayCurse","snuke"].indexOf(e.user_id);-1!==a?n.push({firstRank:a,user:e}):e.rating>=2e3?t.A.push(e):e.rating>=1600?t.B1.push(e):e.rating>=1200?t.B2.push(e):e.rating>=800?t.C1.push(e):e.rating>=400?t.C2.push(e):t.C3.push(e)})),n.sort((function(e,t){return e.firstRank-t.firstRank}));var a={};return Object.entries(t).forEach((function(e){var t=Object(E.a)(e,2),r=t[0],o=t[1];if("A"===r){var i=n.map((function(e){return e.user}));a[r]=te(o,i,0)}else a[r]=te(o,[],0)})),a},te=function e(t,n,a){if(t.sort((function(e,t){return e.rating!==t.rating?t.rating-e.rating:e.user_id.localeCompare(t.user_id)})),1===t.length)return{user:t[0],rank:null,children:[]};if(4===a)return{user:null,rank:null,children:t.map((function(e){return{user:e,rank:null,children:[]}}))};if(2===a&&n.length>0)return{user:null,rank:null,children:[{user:n[0],rank:null,children:[]},e(t,[],a+1)]};var r=[],o=[];1===a&&n.length>0?t.forEach((function(e,t){t%6===0||t%6===5?o.push(e):r.push(e)})):t.forEach((function(e,t){t%4===0||t%4===3?o.push(e):r.push(e)}));var i=[],c=[];return n.forEach((function(e,t){t%4===0||t%4===3?c.push(e):i.push(e)})),{user:null,rank:null,children:[e(o,c,a+1),e(r,i,a+1)]}},ne=function(e){var t=Object(a.useState)({}),n=Object(E.a)(t,2),o=n[0],i=n[1],c=Object(a.useState)(0),l=Object(E.a)(c,2),u=l[0],m=l[1],d=Object(a.useState)(!1),f=Object(E.a)(d,2),h=f[0],g=f[1],b=Object.keys(o);return Object(a.useEffect)((function(){K(e.seasonId).then((function(e){i(e)}))}),[e.seasonId]),r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null),r.a.createElement(T.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u7b2c",e.seasonId,"\u671f"),r.a.createElement(p.a,{variant:"h2",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"AtCoder Beginner Contest Tournament"),r.a.createElement(_.a,{value:u,onChange:function(e,t){return m(t)},centered:!0},b.map((function(e,t){return r.a.createElement(A.a,{label:"CLASS ".concat(e),key:t})}))),r.a.createElement(k.a,{onClick:function(){return g(!h)}},h?"\u5168\u3066\u8868\u793a\u3059\u308b":"Top16\u306e\u307f\u8868\u793a\u3059\u308b"),r.a.createElement(P.a,{display:"flex",justifyContent:"center"},b[u]&&r.a.createElement(q,{tournament:o[b[u]],depth:0,depthLimit:h?4:100}))))},ae=Object(l.a)({palette:{type:"dark"}}),re=Object(g.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(c.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),oe=function(){var e=re();return r.a.createElement(b.a,null,r.a.createElement(u.a,{theme:ae},r.a.createElement(s.a,null),r.a.createElement(m.a,{position:"relative",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:b.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(f.a,{component:b.b,variant:"button",color:"textPrimary",to:"/tournament/2",className:e.link},"\u7b2c2\u671f"),r.a.createElement(f.a,{component:b.b,variant:"button",color:"textPrimary",to:"/register",className:e.link},"\u767b\u9332"),r.a.createElement(f.a,{href:"https://github.com/kenkoooo/atcoder-tournament/tree/master/rules",target:"_blank",rel:"noopener noreferrer",variant:"button",color:"textPrimary",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(h.a,{component:"main",maxWidth:!1},r.a.createElement(x.d,null,r.a.createElement(x.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(ne,{seasonId:null!==t&&void 0!==t?t:1..toString()})}}),r.a.createElement(x.b,{path:"/register"},r.a.createElement(B,null)),r.a.createElement(x.a,{path:"/",to:"/tournament/".concat(1)})))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(oe,null)),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.71ebe6f8.chunk.js.map