(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),l=a.n(o),i=a(45),c=a(76),m=a(150),u=a(136),s=a(151),d=a(152),p=a(104),f=a(141),g=a(135),h=a(134),E=a(43),v=a(12),y=a(38),x=a(60),b=a(153),k=a(133),C=a(158),j=a(137),_=a(74),w=a.n(_),O=function(e){var t=S();return r.a.createElement("form",{className:t.form,noValidate:!0,onSubmit:function(t){t.preventDefault(),e.register(e.state)}},r.a.createElement(b.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"AtCoder ID",autoFocus:!0,value:e.state.userId,onChange:function(t){var a=t.target.value;/^[a-zA-Z0-9\-_]*$/.test(a)&&e.setState(Object(x.a)(Object(x.a)({},e.state),{},{userId:a}))}}),r.a.createElement(k.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,disabled:0===e.state.userId.length},"\u767b\u9332"))},N=function(e){var t=S();return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"\u672c\u4eba\u78ba\u8a8d\u306e\u305f\u3081\u3001AtCoder \u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3001\u6240\u5c5e\u3092\u4e00\u6642\u7684\u306b"),r.a.createElement("code",null,e.state.code),r.a.createElement("p",null,"\u306b\u5909\u66f4\u3057\u3066\u3001\u300c\u78ba\u8a8d\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),r.a.createElement(k.a,{onClick:e.confirm,type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"\u78ba\u8a8d"))},S=Object(h.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),I=function(){var e=S(),t=Object(n.useState)({type:"Input",userId:""}),a=Object(y.a)(t,2),o=a[0],l=a[1];return r.a.createElement(g.a,{maxWidth:"xs"},r.a.createElement(u.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,{className:e.avatar},r.a.createElement(w.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"\u7b2c3\u671f"),r.a.createElement(p.a,{component:"h1",variant:"h5"},"ABC\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u53c2\u52a0\u767b\u9332"),"Input"===o.type&&r.a.createElement(O,{state:o,setState:l,register:function(e){l({type:"Pending"}),fetch("https://atcoder-auth.kenkoooo.com/api/authorize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e.userId})}).then((function(e){return e.json()})).then((function(t){l({type:"Verify",userId:e.userId,secret:t.secret,code:t.verification_code})})).catch((function(){l({type:"Failed"})}))}}),"Verify"===o.type&&r.a.createElement(N,{state:o,confirm:function(){return e=o,l({type:"Pending"}),void fetch("https://atcoder-auth.kenkoooo.com/api/confirm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e.userId,secret:e.secret})}).then((function(e){return e.json()})).then((function(t){var a=t.token;return fetch("https://atcoder-tournament.herokuapp.com/api/user",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"user_id=".concat(e.userId,"&token=").concat(a)})})).then((function(){l({type:"Registered"})})).catch((function(){l({type:"Failed"})}));var e}}),"Failed"===o.type&&r.a.createElement("p",null,"\u767b\u9332\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u672c\u4eba\u78ba\u8a8d\u306b\u5931\u6557\u3057\u305f\u304b\u3001\u65e2\u306b\u767b\u9332\u6e08\u307f\u3067\u3059\u3002"),"Registered"===o.type&&r.a.createElement("p",null,"\u767b\u9332\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002"),"Pending"===o.type&&r.a.createElement(j.a,null)))},P=a(154),T=a(4),W=a(148),B=a(149),R=a(155),A=a(157),F=a(56),L=a(57),D=a(138),z=a(58),J=a(139),Y=a(59),M=a(140),V=a(55),H=Object(h.a)((function(){return{red:{color:F.a[500]},orange:{color:L.a[500]},yellow:{color:D.a[500]},blue:{color:z.a[600]},lightBlue:{color:J.a[200]},green:{color:Y.a[400]},brown:{color:M.a[400]},grey:{color:V.a[500]}}})),U=function(e){var t,a=H(),n=e.children,o=e.rating;if(!o)return r.a.createElement("p",null,n);t=o<400?a.grey:o<800?a.brown:o<1200?a.green:o<1600?a.lightBlue:o<2e3?a.blue:o<2400?a.yellow:o<2800?a.orange:a.red;var l=n.length<=13?n:n.slice(0,10)+"...";return r.a.createElement(f.a,{className:t,href:"https://atcoder.jp/users/".concat(n)},l)},X=Object(h.a)({nodeBox:{textShadow:"rgb(34,34,34) 1px 1px 1px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",fontSize:"12px",minWidth:"120px",minHeight:"24px",backgroundColor:"#595a5e"},nameContainer:{padding:"3px",margin:0,textAlign:"center"},rankContainer:{padding:"3px",borderWidth:0,borderRadius:"3px",marginLeft:"auto",fontSize:"10px",minWidth:"24px",backgroundColor:function(e){return e.winner?"#f58540":"#828489"}},nodeText:{padding:"3px",margin:0,textAlign:"center"},rankText:{color:"black",textAlign:"center",textShadow:"none"}}),q=function(e){var t=e.user,a=e.rank,n=e.winner,o=X({winner:n});if(!t)return r.a.createElement("div",{className:o.nodeBox},r.a.createElement("p",null,"..."));var l=r.a.createElement("div",{className:o.nameContainer},e.defendingChampion?r.a.createElement(A.a,{title:"\u524d\u56de\u512a\u52dd\u8005"},r.a.createElement("span",{role:"img","aria-label":"king"},"\ud83d\udc51"," ")):null,r.a.createElement(U,{rating:t.rating},t.user_id));if(!a)return r.a.createElement("div",{className:o.nodeBox},l);var i=a>1e5?"-":a;return r.a.createElement(P.a,{display:"flex",justifyContent:"center",className:o.nodeBox},l,r.a.createElement(P.a,{display:"flex",alignItems:"center",justifyContent:"center",className:o.rankContainer},r.a.createElement("div",{className:o.rankText},i)))},G=Object(h.a)((function(){return{item:{display:"flex",flexDirection:"row-reverse","& p":{padding:"3px",margin:0,textShadow:"rgb(34, 34, 34) 1px 1px 1px",fontSize:"14px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",minWidth:"100px",textAlign:"center"}},itemChildren:{display:"flex",flexDirection:"column",justifyContent:"center"},itemChild:{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1px",marginBottom:"1px",position:"relative","&:before":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:0,transform:"translateX(100%)",width:"calc(".concat("60px"," / 2)"),height:"3px"},"&:after":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:"calc(-".concat("60px"," / 2)"),height:"calc(50% + ".concat("1px"," * 2)"),width:"3px"},"&:not(:last-child):not(:first-child)":{"&:after":{transform:"translateY(-50%) scaleY(2)"}},"&:last-child":{"&:after":{transform:"translateY(-100%)"}},"&:only-child:after":{display:"none"}},itemParent:{position:"relative",marginLeft:"60px",display:"flex",alignItems:"center","&:after":{position:"absolute",content:'""',width:"calc(".concat("60px"," / 2)"),height:"3px",left:0,top:"50%",backgroundColor:"#fff",transform:"translateX(-100%)"}}}})),Z=function e(t){var a,n,o,l,i,c=t.tournament,m=t.depth,u=t.config,s=t.promotedUser,d=G(),p=null===(a=c.user)||void 0===a?void 0:a.user_id;return 0===c.children.length||u.depthLimit<=m?r.a.createElement(q,{user:c.user,rank:c.rank,defendingChampion:(null===(n=c.user)||void 0===n?void 0:n.user_id)===u.defendingChampion,winner:void 0!==s&&(null===(o=c.user)||void 0===o?void 0:o.user_id)===s}):r.a.createElement("div",{className:d.item},r.a.createElement("div",{className:d.itemParent},r.a.createElement(q,{user:c.user,rank:c.rank,defendingChampion:(null===(l=c.user)||void 0===l?void 0:l.user_id)===u.defendingChampion,winner:void 0!==s&&(null===(i=c.user)||void 0===i?void 0:i.user_id)===s})),r.a.createElement("div",{className:d.itemChildren},c.children.map((function(t,a){return r.a.createElement("div",{key:a,className:d.itemChild},r.a.createElement(e,{tournament:t,promotedUser:p,depth:m+1,config:u}))}))))},$=a(77),K=a(142),Q=a(143),ee=a(144),te=a(145),ae=a(146),ne=a(147),re=function(e){var t=e.entry,a=e.maxResultCount;return r.a.createElement(K.a,null,r.a.createElement(Q.a,{align:"right"},"".concat(t.provisional_rank).concat(ce(t.provisional_rank))),r.a.createElement(Q.a,null,r.a.createElement(U,{rating:t.user.rating},t.user.user_id)),Array.from(Array(a).keys()).map((function(e,a){var n=t.results[a];return n?r.a.createElement(Q.a,{key:a,align:"center"},r.a.createElement(P.a,{display:"flex",justifyContent:"center",flexDirection:"column"},n.opponent&&r.a.createElement(U,{rating:n.opponent.rating},n.opponent.user_id),r.a.createElement("span",null,le(n.result)),r.a.createElement("span",null,ie(n.result)))):r.a.createElement(Q.a,{key:a},a+1,"\u56de\u6226")})),r.a.createElement(Q.a,{align:"right"},t.win_count),r.a.createElement(Q.a,{align:"right"},t.rank_sum))},oe=function(e){var t=e.league,a=Math.max.apply(Math,Object($.a)(t.map((function(e){return e.results.length}))));return r.a.createElement(ee.a,null,r.a.createElement(te.a,null,r.a.createElement(ae.a,null,r.a.createElement(K.a,null,r.a.createElement(Q.a,{align:"right"},"\u9806\u4f4d"),r.a.createElement(Q.a,null,"\u30e6\u30fc\u30b6\u30fc"),Array.from(Array(a).keys()).map((function(e,t){return r.a.createElement(Q.a,{key:t,align:"center"},t+1,"\u56de\u6226")})),r.a.createElement(Q.a,{align:"right"},"\u52dd\u5229\u6570"),r.a.createElement(Q.a,{align:"right"},"\u9806\u4f4d\u5408\u8a08"))),r.a.createElement(ne.a,null,e.league.map((function(t){return t.provisional_rank===e.promotionRank?r.a.createElement(n.Fragment,{key:t.user.user_id},r.a.createElement(re,{entry:t,maxResultCount:a}),r.a.createElement(K.a,null,r.a.createElement(Q.a,{colSpan:a+4},"\u6607\u683c\u30e9\u30a4\u30f3"))):t.provisional_rank===e.dropRank?r.a.createElement(n.Fragment,{key:t.user.user_id},r.a.createElement(K.a,null,r.a.createElement(Q.a,{colSpan:a+4},"\u6b8b\u7559\u30e9\u30a4\u30f3")),r.a.createElement(re,{entry:t,maxResultCount:a})):r.a.createElement(re,{entry:t,maxResultCount:a,key:t.user.user_id})})))))},le=function(e){switch(e.result){case"Win":case"SkipWin":return"\u25cb";case"Lose":case"SkipLose":return"\xd7";case"NotYet":case"Writer":return"-"}},ie=function(e){switch(e.result){case"Win":case"Lose":var t=e.rank;return"".concat(t).concat(ce(t));default:return"-"}},ce=function(e){var t=e%10,a=e%100;return 1===t&&11!==a?"st":2===t&&12!==a?"nd":3===t&&13!==a?"rd":"th"},me=function(e){var t=e.users;return!t||t.length<4?null:r.a.createElement(g.a,null,r.a.createElement(P.a,{m:2},r.a.createElement(p.a,{variant:"h3",align:"center",color:"textPrimary"},"\u512a\u52dd"),r.a.createElement(p.a,{variant:"h3",align:"center",color:"textPrimary"},t[0].user_id)),r.a.createElement(P.a,{m:2},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u6e96\u512a\u52dd"),r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},t[1].user_id)),r.a.createElement(P.a,{m:2},r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},"3\u4f4d\u30bf\u30a4"),r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},t[2].user_id),r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},t[3].user_id)))},ue=Object(T.a)((function(){return{root:{minWidth:10},selected:{}}}))(W.a),se=function(e){var t=Object(n.useState)({}),a=Object(y.a)(t,2),o=a[0],l=a[1],i=Object(n.useState)(0),c=Object(y.a)(i,2),m=c[0],s=c[1],d=Object(n.useState)(!1),f=Object(y.a)(d,2),g=f[0],h=f[1],E=Object.keys(o),v=E[m]?o[E[m]]:null,x=null===v||void 0===v?void 0:v.node,b=null===v||void 0===v?void 0:v.league,C=null===v||void 0===v?void 0:v.defending_champion;Object(n.useEffect)((function(){var t;(t=e.seasonId,fetch("./bracket-".concat(t,".json")).then((function(e){return e.json()})).then((function(e){return e}))).then((function(e){l(e)}))}),[e.seasonId]);var j=g?4:100;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null),r.a.createElement(B.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u7b2c",e.seasonId,"\u671f"),r.a.createElement(p.a,{variant:"h2",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"AtCoder Beginner Contest Tournament"),"2"===e.seasonId&&r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"2020/11/22 19:00 JST \u767b\u9332\u3006\u5207"),r.a.createElement(R.a,{variant:"fullWidth",value:m,onChange:function(e,t){return s(t)},centered:!0},E.map((function(e,t){return r.a.createElement(ue,{label:"".concat(e),key:t})}))),E[m]&&r.a.createElement(me,{users:o[E[m]].top4}),r.a.createElement(k.a,{onClick:function(){return h(!g)}},g?"\u5168\u3066\u8868\u793a\u3059\u308b":"Top16\u306e\u307f\u8868\u793a\u3059\u308b"),r.a.createElement(P.a,{display:"flex",justifyContent:"center"},x&&r.a.createElement(Z,{tournament:x,depth:0,config:{depthLimit:j,defendingChampion:C}})),b&&r.a.createElement(P.a,{display:"flex",justifyContent:"center",flexDirection:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u9806\u4f4d\u6c7a\u5b9a\u30ea\u30fc\u30b0"),r.a.createElement(oe,{league:b,promotionRank:null===v||void 0===v?void 0:v.promotion_rank,dropRank:null===v||void 0===v?void 0:v.drop_rank}))))},de=Object(c.a)({palette:{type:"dark"}}),pe=Object(h.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(i.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),fe=function(){var e=pe();return r.a.createElement(E.a,null,r.a.createElement(m.a,{theme:de},r.a.createElement(u.a,null),r.a.createElement(s.a,{position:"relative",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:E.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(f.a,{component:E.b,variant:"button",color:"textPrimary",to:"/tournament/1",className:e.link},"\u7b2c1\u671f"),r.a.createElement(f.a,{component:E.b,variant:"button",color:"textPrimary",to:"/tournament/2",className:e.link},"\u7b2c2\u671f"),r.a.createElement(f.a,{href:"https://github.com/kenkoooo/atcoder-tournament/tree/master/rules",target:"_blank",rel:"noopener noreferrer",variant:"button",color:"textPrimary",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(g.a,{component:"main",maxWidth:!1},r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(se,{seasonId:null!==t&&void 0!==t?t:2..toString()})}}),r.a.createElement(v.b,{path:"/register"},r.a.createElement(I,null)),r.a.createElement(v.a,{path:"/",to:"/tournament/".concat(2)})))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(fe,null)),document.getElementById("root"))},90:function(e,t,a){e.exports=a(101)}},[[90,1,2]]]);
//# sourceMappingURL=main.2475853b.chunk.js.map