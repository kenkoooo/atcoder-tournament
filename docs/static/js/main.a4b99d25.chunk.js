(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{101:function(e,t,n){e.exports=n(113)},113:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(11),c=n.n(l),o=n(77),i=n(83),u=n(161),s=n(145),m=n(162),d=n(163),p=n(87),f=n(152),E=n(144),h=n(139),g=n(12),v=n(13),b=n(15),x=n.n(b),y=n(24),k=n(17),C=n(146),j=n(170),O=n(81),_=n.n(O),w=n(37),N="https://abc-api.kenkoooo.com/api",W=function(){var e=Object(y.a)(x.a.mark((function e(t){var n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(N,"/stage"),{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,e.abrupt("return",a.token);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(y.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(N,"/signup"),{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:t})});case 2:return n=e.sent,e.abrupt("return",200===n.status);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){return Object(w.a)("".concat(N,"/verify"),function(){var e=Object(y.a)(x.a.mark((function e(t){var n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,e.abrupt("return",a.user_id);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},A=n(164),T=n(143),P=Object(h.a)((function(e){return{form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),B=function(e){var t=P(),n=Object(a.useState)(""),l=Object(k.a)(n,2),c=l[0],o=l[1];return r.a.createElement("form",{className:t.form,noValidate:!0,onSubmit:function(t){t.preventDefault(),e.onSubmit(c)}},r.a.createElement(A.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"AtCoder ID",autoFocus:!0,value:c,onChange:function(e){var t=e.target.value;/^[a-zA-Z0-9\-_]*$/.test(t)&&o(t)}}),r.a.createElement(T.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,disabled:0===c.length},"\u30ed\u30b0\u30a4\u30f3"))},R=Object(h.a)((function(e){return{submit:{margin:e.spacing(3,0,2)}}})),L=function(e){var t=R();return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"\u672c\u4eba\u78ba\u8a8d\u306e\u305f\u3081\u3001AtCoder \u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3001",r.a.createElement("a",{href:"https://atcoder.jp/settings",target:"_blank"},"\u57fa\u672c\u8a2d\u5b9a\u306e\u30da\u30fc\u30b8"),"\u306e\u300c\u6240\u5c5e\u300d\u3092\u4e00\u6642\u7684\u306b"),r.a.createElement("code",null,e.code),r.a.createElement("p",null,"\u306b\u5909\u66f4\u3057\u3066\u3001\u300c\u78ba\u8a8d\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),r.a.createElement(T.a,{onClick:e.onConfirm,type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"\u78ba\u8a8d"))},D=Object(h.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main}}})),F=function(){var e=D(),t=Object(a.useState)({type:"input"}),n=Object(k.a)(t,2),l=n[0],c=n[1],o=S(),i=Object(v.g)();return o.error||o.data?o.data?(i.push({pathname:"/mypage"}),r.a.createElement("div",null)):r.a.createElement(E.a,{maxWidth:"xs"},r.a.createElement(s.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(j.a,{className:e.avatar},r.a.createElement(_.a,null)),r.a.createElement(p.a,{component:"h1",variant:"h5"},"ABC\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u53c2\u52a0\u767b\u9332\u30da\u30fc\u30b8"),"pending"===l.type&&r.a.createElement(C.a,null),"input"===l.type&&r.a.createElement(B,{onSubmit:function(){var e=Object(y.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c({type:"pending"}),e.next=3,W(t);case 3:n=e.sent,c({type:"verify",token:n,userId:t});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),"verify"===l.type&&r.a.createElement(L,{code:l.token,onConfirm:Object(y.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c({type:"pending"}),e.next=3,I(l.userId);case 3:if(!e.sent){e.next=10;break}return e.next=7,o.revalidate();case 7:c({type:"verification_finished"}),e.next=11;break;case 10:c({type:"failed"});case 11:case"end":return e.stop()}}),e)})))}),"failed"===l.type&&r.a.createElement("p",null,"\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002"),"verification_finished"===l.type&&o.error&&r.a.createElement("p",null,"\u30ed\u30b0\u30a4\u30f3\u60c5\u5831\u306e\u4fdd\u5b58\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30b5\u30fc\u30c9\u30d1\u30fc\u30c6\u30a3\u306eCookie\u3092\u8a31\u53ef\u3059\u308b\u3088\u3046\u306b\u3001\u30d6\u30e9\u30a6\u30b6\u306e\u8a2d\u5b9a\u3092\u5909\u66f4\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002"))):r.a.createElement(E.a,{maxWidth:"xs"},r.a.createElement(s.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,null)))},J=n(147),z=n(148),Y=n(167),M=Object(h.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},submit:{margin:e.spacing(3,0,2)}}})),G=function(){var e=M();return r.a.createElement(E.a,{maxWidth:"xs"},r.a.createElement(s.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,null)))},H=function(){var e=M(),t=Object(v.g)(),n=S(),l=function(){var e="".concat(N,"/data");return Object(w.a)(e,(function(e){return fetch(e,{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return e}))}))}(),c=Object(a.useState)(!1),o=Object(k.a)(c,2),i=o[0],u=o[1],m=Object(a.useState)(!1),d=Object(k.a)(m,2),f=d[0],h=d[1];Object(a.useEffect)((function(){var e;(null===(e=l.data)||void 0===e?void 0:e.participate_next)&&h(!0)}),[l.data]);var g=Object(a.useState)(!1),b=Object(k.a)(g,2),C=b[0],j=b[1];if(Object(a.useEffect)((function(){var e;(null===(e=l.data)||void 0===e?void 0:e.participate_forever)&&j(!0)}),[l.data]),!n.data&&!n.error)return r.a.createElement(G,null);if(!n.data)return t.push({pathname:"/login"}),r.a.createElement("div",null);if(!l.data&&!l.error)return r.a.createElement(G,null);var O=n.data;return r.a.createElement(E.a,{maxWidth:"xs"},r.a.createElement(s.a,null),r.a.createElement("div",{className:e.paper}),r.a.createElement(p.a,{component:"h1",variant:"h5"},O),r.a.createElement(p.a,{component:"h2",variant:"h5"},r.a.createElement(J.a,null,r.a.createElement(z.a,{control:r.a.createElement(Y.a,{checked:f,onChange:function(){return h(!f)}}),label:"\u7b2c".concat(10,"\u671f\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u306b\u53c2\u52a0\u3059\u308b")}),r.a.createElement(z.a,{control:r.a.createElement(Y.a,{checked:C,onChange:function(){return j(!C)}}),label:"\u7b2c".concat(11,"\u671f\u4ee5\u964d\u3082\u53c2\u52a0\u3059\u308b")}))),i?r.a.createElement(G,null):r.a.createElement(T.a,{onClick:Object(y.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),e.next=3,t={participate_next:f,participate_forever:C},fetch("".concat(N,"/save_data"),{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return e.next=5,l.revalidate();case 5:u(!1);case 6:case"end":return e.stop()}var t}),e)}))),type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"\u8a2d\u5b9a\u3092\u4fdd\u5b58"))},U=n(165),X=n(4),Z=n(159),q=n(160),V=n(166),$=n(169),K=n(59),Q=n(61),ee=n(60),te=n(149),ne=n(62),ae=n(150),re=n(63),le=n(151),ce=Object(h.a)((function(){return{red:{fontWeight:"bold",color:ee.a[500]},orange:{fontWeight:"bold",color:Q.a[500]},yellow:{fontWeight:"bold",color:te.a[500]},blue:{fontWeight:"bold",color:ne.a[400]},lightBlue:{fontWeight:"bold",color:ae.a[200]},green:{fontWeight:"bold",color:re.a[400]},brown:{fontWeight:"bold",color:le.a[300]},grey:{fontWeight:"bold",color:K.a[400]}}})),oe=function(e){var t,n=ce(),a=e.children,l=e.rating;return a.startsWith("---non-existing-user")?r.a.createElement(r.a.Fragment,null,"-"):l?(t=l<400?n.grey:l<800?n.brown:l<1200?n.green:l<1600?n.lightBlue:l<2e3?n.blue:l<2400?n.yellow:l<2800?n.orange:n.red,r.a.createElement(f.a,{className:t,component:g.b,to:"/user/".concat(a)},a)):r.a.createElement("p",null,a)},ie=Object(h.a)({nodeBox:{textShadow:"rgb(34,34,34) 1px 1px 1px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",fontSize:"12px",minWidth:"120px",minHeight:"24px",backgroundColor:K.a[800]},nameContainer:{padding:"3px",margin:0,textAlign:"center"},rankContainer:{padding:"3px",borderWidth:0,borderRadius:"3px",marginLeft:"auto",fontSize:"10px",minWidth:"24px",backgroundColor:function(e){return e.winner?Q.a[500]:K.a[400]}},nodeText:{padding:"3px",margin:0,textAlign:"center"},rankText:{color:"black",textAlign:"center",textShadow:"none"}}),ue={heno239:["1","2","5","6"],Tiramister:["3"],SSRS:["4"],snuke:["7"],sansen:["8"]},se=function(e){var t;if(e.defendingChampion)return r.a.createElement($.a,{title:"\u524d\u671f\u738b\u8005"},r.a.createElement("span",{role:"img","aria-label":"king"},"\ud83d\udc51"," "));var n=(null!==(t=ue[e.userId])&&void 0!==t?t:[]).filter((function(t){return t<e.seasonId}));if(n.length>0){var a=n.map((function(e){return"".concat(e,"\u671f")})).join("\u30fb");return r.a.createElement($.a,{title:"\u7b2c".concat(a,"\u738b\u8005")},r.a.createElement("span",{role:"img","aria-label":"king"},"\ud83c\udfc5"," "))}return null},me=function(e){var t=e.user,n=e.rank,a=e.winner,l=Object(v.h)().seasonId,c=ie({winner:a});if(!t)return r.a.createElement("div",{className:c.nodeBox},r.a.createElement("p",null,"..."));var o=r.a.createElement("div",{className:c.nameContainer},r.a.createElement(se,{defendingChampion:e.defendingChampion,userId:t.user_id,seasonId:l}),r.a.createElement(oe,{rating:t.rating},t.user_id));if(!n)return r.a.createElement("div",{className:c.nodeBox},o);var i=n>=1e5?"-":n;return r.a.createElement(U.a,{display:"flex",justifyContent:"center",className:c.nodeBox},o,r.a.createElement(U.a,{display:"flex",alignItems:"center",justifyContent:"center",className:c.rankContainer},r.a.createElement("div",{className:c.rankText},i)))},de=Object(h.a)((function(){return{item:{display:"flex",flexDirection:"row-reverse","& p":{padding:"3px",margin:0,textShadow:"rgb(34, 34, 34) 1px 1px 1px",fontSize:"14px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",minWidth:"100px",textAlign:"center"}},itemChildren:{display:"flex",flexDirection:"column",justifyContent:"center"},itemChild:{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1px",marginBottom:"1px",position:"relative","&:before":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:0,transform:"translateX(100%)",width:"calc(".concat("60px"," / 2)"),height:"3px"},"&:after":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:"calc(-".concat("60px"," / 2)"),height:"calc(50% + ".concat("1px"," * 2)"),width:"3px"},"&:not(:last-child):not(:first-child)":{"&:after":{transform:"translateY(-50%) scaleY(2)"}},"&:last-child":{"&:after":{transform:"translateY(-100%)"}},"&:only-child:after":{display:"none"}},itemParent:{position:"relative",marginLeft:"60px",display:"flex",alignItems:"center","&:after":{position:"absolute",content:'""',width:"calc(".concat("60px"," / 2)"),height:"3px",left:0,top:"50%",backgroundColor:"#fff",transform:"translateX(-100%)"}}}})),pe=function e(t){var n,a,l,c,o,i=t.tournament,u=t.depth,s=t.config,m=t.promotedUser,d=de(),p=null===(n=i.user)||void 0===n?void 0:n.user_id;return 0===i.children.length||s.depthLimit<=u?r.a.createElement(me,{user:i.user,rank:i.rank,defendingChampion:(null===(a=i.user)||void 0===a?void 0:a.user_id)===s.defendingChampion,winner:void 0!==m&&(null===(l=i.user)||void 0===l?void 0:l.user_id)===m}):r.a.createElement("div",{className:d.item},r.a.createElement("div",{className:d.itemParent},r.a.createElement(me,{user:i.user,rank:i.rank,defendingChampion:(null===(c=i.user)||void 0===c?void 0:c.user_id)===s.defendingChampion,winner:void 0!==m&&(null===(o=i.user)||void 0===o?void 0:o.user_id)===m})),r.a.createElement("div",{className:d.itemChildren},i.children.map((function(t,n){return r.a.createElement("div",{key:n,className:d.itemChild},r.a.createElement(e,{tournament:t,promotedUser:p,depth:u+1,config:s}))}))))},fe=n(84),Ee=n(153),he=n(154),ge=n(155),ve=n(156),be=n(157),xe=n(158),ye=function(e){var t=e.entry,n=e.maxResultCount;return r.a.createElement(Ee.a,null,r.a.createElement(he.a,{align:"right"},"".concat(t.provisional_rank).concat(Oe(t.provisional_rank))),r.a.createElement(he.a,null,r.a.createElement(oe,{rating:t.user.rating},t.user.user_id)),Array.from(Array(n).keys()).map((function(e,n){var a=t.results[n];return a?r.a.createElement(he.a,{key:n,align:"center"},r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column"},a.opponent&&r.a.createElement(oe,{rating:a.opponent.rating},a.opponent.user_id),r.a.createElement("span",null,Ce(a.result)),r.a.createElement("span",null,je(a.result)))):r.a.createElement(he.a,{key:n},n+1,"\u56de\u6226")})),r.a.createElement(he.a,{align:"right"},t.win_count),r.a.createElement(he.a,{align:"right"},t.rank_sum.toFixed(2)))},ke=function(e){var t,n=Math.max.apply(Math,Object(fe.a)(e.league.map((function(e){return e.results.length})))),l=e.league.filter((function(e){return!e.user.user_id.startsWith("---non-existing-user")}));return r.a.createElement(ge.a,null,r.a.createElement(ve.a,null,r.a.createElement(be.a,null,r.a.createElement(Ee.a,null,r.a.createElement(he.a,{align:"right"},"\u9806\u4f4d"),r.a.createElement(he.a,null,"\u30e6\u30fc\u30b6\u30fc"),Array.from(Array(n).keys()).map((function(e,t){return r.a.createElement(he.a,{key:t,align:"center"},t+1,"\u56de\u6226")})),r.a.createElement(he.a,{align:"right"},"\u52dd\u5229\u6570"),r.a.createElement(he.a,{align:"right"},(t=e.seasonId,["2","3","4"].includes(t)?"\u9806\u4f4d\u5408\u8a08":"\u9806\u4f4d\u8abf\u548c\u5e73\u5747")))),r.a.createElement(xe.a,null,l.map((function(t,l){return t.provisional_rank===e.promotionRank?r.a.createElement(a.Fragment,{key:l},r.a.createElement(ye,{entry:t,maxResultCount:n}),r.a.createElement(Ee.a,null,r.a.createElement(he.a,{colSpan:n+4},"\u6607\u683c\u30e9\u30a4\u30f3"))):t.provisional_rank===e.dropRank?r.a.createElement(a.Fragment,{key:l},r.a.createElement(Ee.a,null,r.a.createElement(he.a,{colSpan:n+4},"\u6b8b\u7559\u30e9\u30a4\u30f3")),r.a.createElement(ye,{entry:t,maxResultCount:n})):r.a.createElement(ye,{entry:t,maxResultCount:n,key:l})})))))},Ce=function(e){switch(e.result){case"Win":case"SkipWin":return"\u25cb";case"Lose":case"SkipLose":return"\xd7";case"NotYet":case"Writer":return"-"}},je=function(e){switch(e.result){case"Win":case"Lose":var t=e.rank;return"".concat(t).concat(Oe(t));default:return"-"}},Oe=function(e){var t=e%10,n=e%100;return 1===t&&11!==n?"st":2===t&&12!==n?"nd":3===t&&13!==n?"rd":"th"},_e={revalidateOnFocus:!1,revalidateOnReconnect:!1},we=function(){var e=Object(y.a)(x.a.mark((function e(){var t,a,r,l,c,o,i,u;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://abc-api.kenkoooo.com/api/users");case 2:return t=e.sent,e.next=5,t.text();case 5:return a=e.sent,e.next=8,fetch("./bracket-8.json");case 8:return r=e.sent,e.next=11,r.text();case 11:return l=e.sent,e.next=14,fetch("./ratings.json");case 14:return c=e.sent,e.next=17,c.text();case 17:return o=e.sent,e.next=20,n.e(3).then(n.bind(null,175));case 20:return i=e.sent,u=i.construct_tournament(a,o,l),e.abrupt("return",JSON.parse(u));case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){return Object(w.a)("./histories.json",(function(e){return fetch(e).then((function(e){return e.json()})).then((function(e){return e}))}),_e)},We=function(e){var t=e.top4;return t?r.a.createElement(E.a,null,Object.entries(t).map((function(e){var t=Object(k.a)(e,2),n=t[0],a=t[1],l="1"===n?"h3":"2"===n?"h4":"h5",c="1"===n?"\u512a\u52dd":"2"===n?"\u6e96\u512a\u52dd":"".concat(n,"\u4f4d");return r.a.createElement(U.a,{m:2,key:n},r.a.createElement(p.a,{variant:l,align:"center",color:"textPrimary"},c),a.map((function(e){return r.a.createElement(p.a,{variant:l,align:"center",color:"textPrimary",key:e.user_id},e.user_id)})))}))):null},Ie=Object(X.a)((function(){return{root:{minWidth:10},selected:{}}}))(Z.a),Se=function(e){var t=function(e){var t="./bracket-".concat(e,".json");return Object(w.a)(t,(function(t){return"x"===e?we():fetch(t).then((function(e){return e.json()})).then((function(e){return e}))}),_e)}(e.seasonId).data,n=Object(a.useState)(0),l=Object(k.a)(n,2),c=l[0],o=l[1],i=Object(a.useState)(!1),u=Object(k.a)(i,2),m=u[0],d=u[1],f=Object.keys(null!==t&&void 0!==t?t:{}),E=f[c]&&t?t[f[c]]:null,h=null===E||void 0===E?void 0:E.node,g=null===E||void 0===E?void 0:E.league,v=null===E||void 0===E?void 0:E.defending_champion,b=m?4:100;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null),r.a.createElement(q.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u7b2c",e.seasonId,"\u671f"),r.a.createElement(p.a,{variant:"h2",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"AtCoder Beginner Contest Tournament"),r.a.createElement(V.a,{variant:"fullWidth",value:c,onChange:function(e,t){return o(t)},centered:!0},f.map((function(e,t){return r.a.createElement(Ie,{label:"".concat(e),key:t})}))),t?r.a.createElement(r.a.Fragment,null,f[c]&&r.a.createElement(We,{top4:t[f[c]].top4}),r.a.createElement(T.a,{onClick:function(){return d(!m)}},m?"\u5168\u3066\u8868\u793a\u3059\u308b":"Top16\u306e\u307f\u8868\u793a\u3059\u308b"),r.a.createElement(U.a,{display:"flex",justifyContent:"center"},h&&r.a.createElement(pe,{tournament:h,depth:0,config:{depthLimit:b,defendingChampion:v}})),g&&g.length>0&&r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u9806\u4f4d\u6c7a\u5b9a\u30ea\u30fc\u30b0"),r.a.createElement(ke,{seasonId:e.seasonId,league:g,promotionRank:null===E||void 0===E?void 0:E.promotion_rank,dropRank:null===E||void 0===E?void 0:E.drop_rank}))):r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(C.a,null))))},Ae=Object(h.a)((function(e){return{root:{flexGrow:1,maxWidth:800},link:{color:e.palette.grey[50]}}})),Te=function(e){var t,n,a=Ae(),l=e.ranking.map((function(e){var t=Object(k.a)(e,2),n=t[0],a=t[1];return{class:a.class,userId:a.user_id,rank:n}}));l.sort((function(e,t){return e.rank-t.rank}));var c=null===(t=l[0])||void 0===t?void 0:t.userId,o=null===(n=l[1])||void 0===n?void 0:n.userId;return r.a.createElement(Ee.a,null,r.a.createElement(he.a,{variant:"head"},e.season),r.a.createElement(he.a,null,r.a.createElement(p.a,{variant:"h6"},r.a.createElement(f.a,{className:a.link,component:g.b,to:"/user/".concat(c)},c))),r.a.createElement(he.a,null,r.a.createElement(p.a,{variant:"h6"},r.a.createElement(f.a,{className:a.link,component:g.b,to:"/user/".concat(o)},o))),r.a.createElement(he.a,null,r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/tournament/".concat(e.season),className:a.link},"\u7b2c".concat(e.season,"\u671f\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u8868"))))},Pe=function(){var e=Ae(),t=Object(w.a)("./tournaments.json",(function(e){return fetch(e).then((function(e){return e.json()})).then((function(e){return e}))}),_e).data;return t?(t.sort((function(e,t){return t.season.localeCompare(e.season)})),r.a.createElement(E.a,{className:e.root},r.a.createElement(ge.a,null,r.a.createElement(ve.a,null,r.a.createElement(be.a,null,r.a.createElement(Ee.a,null,r.a.createElement(he.a,null,"\u671f"),r.a.createElement(he.a,null,"\u512a\u52dd"),r.a.createElement(he.a,null,"\u6e96\u512a\u52dd"),r.a.createElement(he.a,null,"\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8\u8868"))),r.a.createElement(xe.a,null,t.map((function(e){return r.a.createElement(Te,Object.assign({key:e.season},e))}))))))):r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(C.a,null))},Be=n(115),Re=Object(h.a)((function(e){return{root:{flexGrow:1,maxWidth:800},paper:{padding:e.spacing(2),marginLeft:"auto",marginRight:"auto",marginTop:30},link:{color:"white"}}})),Le=function(e){var t,n,a=Re(),l=e.userId,c=e.opponent,o=e.season,i=e.classId,u=e.result,s=null===(t=e.records[c.user_id])||void 0===t||null===(n=t.find((function(e){return e.class===i&&e.season===o})))||void 0===n?void 0:n.battles.find((function(e){var t;return(null===(t=e.opponent)||void 0===t?void 0:t.user_id)===l})),m=function(e){switch(e.result){case"SkipLose":return"1"===o?null:"\u4e0d\u6226\u6557";case"Win":return("Lose"===(null===s||void 0===s?void 0:s.result.result)?s.result.rank:0)>=1e5||"SkipLose"===(null===s||void 0===s?void 0:s.result.result)||"Writer"===(null===s||void 0===s?void 0:s.result.result)?"\u25cb (\u4e0d\u6226\u52dd)":"\u25cb";case"Lose":return"1"===o&&e.rank>=1e5?null:"\xd7";case"SkipWin":return"\u4e0d\u6226\u52dd";case"Writer":return"Writer";case"NotYet":return null}}(u);return m?"Writer"===m?r.a.createElement(Ee.a,null,r.a.createElement(he.a,null),r.a.createElement(he.a,null,"Writer"),r.a.createElement(he.a,null,r.a.createElement(f.a,{component:g.b,to:"/tournament/".concat(o),className:a.link},"\u7b2c",o,"\u671f ",i,"\u30af\u30e9\u30b9"))):r.a.createElement(Ee.a,null,r.a.createElement(he.a,null,r.a.createElement(oe,{rating:c.rating},c.user_id)),r.a.createElement(he.a,null,m),r.a.createElement(he.a,null,r.a.createElement(f.a,{component:g.b,to:"/tournament/".concat(o),className:a.link},"\u7b2c",o,"\u671f ",i,"\u30af\u30e9\u30b9"))):null},De=function(){var e,t,n,a=Re(),l=Object(v.h)().user_id,c=Ne().data,o=function(){var e=function(){var e=Object(y.a)(x.a.mark((function e(t){var n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(w.a)("./battle_records.json",e,_e)}().data;if(!c||!o)return r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(C.a,null));var i=null!==(e=null===(t=c.find((function(e){return e.user_id===l})))||void 0===t?void 0:t.histories)&&void 0!==e?e:{},u=Object.entries(i).map((function(e){var t=Object(k.a)(e,2),n=t[0],a=t[1];return{season:parseInt(n),result:a}})).sort((function(e,t){return t.season-e.season})),s=u.filter((function(e){return"A"===e.result.class||"A1"===e.result.class})).filter((function(e){return 1===e.result.top_k})).length,m=u.filter((function(e){return"A"===e.result.class||"A1"===e.result.class})).filter((function(e){return 2===e.result.top_k})).length,d=u.filter((function(e){return"A1"===e.result.class})).length,h=(null!==(n=o[l])&&void 0!==n?n:[]).sort((function(e,t){return t.season.localeCompare(e.season)})).flatMap((function(e){var t=e.class,n=e.user,a=e.battles,r=e.season;return Array.from(a).reverse().filter((function(e){return null!==e.opponent})).map((function(e){var a=e.opponent,l=e.result;return{user:n,opponent:a,season:r,classId:t,result:l}}))}));return r.a.createElement(E.a,{className:a.root},r.a.createElement(q.a,{container:!0},r.a.createElement(q.a,{item:!0},r.a.createElement(p.a,{variant:"h2"},r.a.createElement(f.a,{className:a.link,href:"https://atcoder.jp/users/".concat(l)},l)),s>0&&r.a.createElement(p.a,{variant:"h6"},"\u512a\u52dd",s,"\u56de"),m>0&&r.a.createElement(p.a,{variant:"h6"},"\u6e96\u512a\u52dd",m,"\u56de"),d>0&&r.a.createElement(p.a,{variant:"h6"},"A1\u5728\u7c4d",d,"\u671f")),r.a.createElement(q.a,{item:!0,xs:12},u.map((function(e){return r.a.createElement(Be.a,{key:e.season,className:a.paper},r.a.createElement(q.a,{container:!0,spacing:2},r.a.createElement(q.a,{item:!0,xs:6},r.a.createElement(p.a,{variant:"h5"},r.a.createElement(f.a,{component:g.b,to:"/tournament/".concat(e.season),className:a.link},"\u7b2c",e.season,"\u671f ",e.result.class,"\u30af\u30e9\u30b9"))),r.a.createElement(q.a,{item:!0,xs:4,direction:"column",container:!0},r.a.createElement(p.a,{variant:"body1"},"\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement(p.a,{variant:"h4"},(t=e.season,n=e.result.top_k,l=e.result.class,1===n?"A"===l||"A1"===l?"\u7b2c".concat(t,"\u671f\u738b\u8005"):"\u512a\u52dd":2===n?"\u6e96\u512a\u52dd":"\u30d9\u30b9\u30c8".concat(n)))),e.result.final_rank&&r.a.createElement(q.a,{item:!0,xs:!0,direction:"column",container:!0},r.a.createElement(p.a,{variant:"body1"},"\u6700\u7d42\u9806\u4f4d"),r.a.createElement(p.a,{variant:"h4"},e.result.final_rank,"\u4f4d"))));var t,n,l}))),r.a.createElement(q.a,{item:!0,xs:12},r.a.createElement(ge.a,null,r.a.createElement(ve.a,null,r.a.createElement(be.a,null,r.a.createElement(Ee.a,null,r.a.createElement(he.a,null,"\u5bfe\u6226\u76f8\u624b"),r.a.createElement(he.a,null,"\u52dd\u6557"),r.a.createElement(he.a,null,"\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"))),r.a.createElement(xe.a,null,h.map((function(e,t){return r.a.createElement(Le,Object.assign({key:t},e,{userId:l,records:o}))}))))))))},Fe=Object(h.a)((function(){return{link:{color:"white"}}})),Je=function(){var e=Fe(),t=Ne().data;if(!t)return r.a.createElement(U.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(C.a,null));var n=t.map((function(e){var t=e.user_id,n=Object.values(e.histories).filter((function(e){return"A1"===e.class||"A"===e.class})),a=n.filter((function(e){return 1===e.top_k})).length,r=n.filter((function(e){return 2===e.top_k})).length,l=n.filter((function(e){return 4===e.top_k})).length;return{a1Count:n.filter((function(e){return"A1"===e.class})).length,winCount:a,secondCount:r,fourCount:l,userId:t}})).filter((function(e){return e.a1Count+e.winCount+e.secondCount+e.fourCount>0}));return n.sort((function(e,t){return e.winCount!==t.winCount?t.winCount-e.winCount:e.secondCount!==t.secondCount?t.secondCount-e.secondCount:e.fourCount!==t.fourCount?t.fourCount-e.fourCount:e.a1Count!==t.a1Count?t.a1Count-e.a1Count:e.userId.localeCompare(t.userId)})),r.a.createElement(E.a,null,r.a.createElement(ve.a,null,r.a.createElement(be.a,null,r.a.createElement(Ee.a,null,r.a.createElement(he.a,{variant:"head"},"\u30e6\u30fc\u30b6\u30fc"),r.a.createElement(he.a,{variant:"head",align:"center"},"\u512a\u52dd"),r.a.createElement(he.a,{variant:"head",align:"center"},"\u6e96\u512a\u52dd"),r.a.createElement(he.a,{variant:"head",align:"center"},"\u30d9\u30b9\u30c84"),r.a.createElement(he.a,{variant:"head",align:"center"},"A1\u5728\u7c4d"))),r.a.createElement(xe.a,null,n.map((function(t){return r.a.createElement(Ee.a,{key:t.userId},r.a.createElement(he.a,{variant:"head"},r.a.createElement(p.a,{variant:"h6"},r.a.createElement(f.a,{className:e.link,component:g.b,to:"/user/".concat(t.userId)},t.userId))),r.a.createElement(he.a,{align:"center"},t.winCount),r.a.createElement(he.a,{align:"center"},t.secondCount),r.a.createElement(he.a,{align:"center"},t.fourCount),r.a.createElement(he.a,{align:"center"},t.a1Count))})))))},ze=Object(i.a)({palette:{type:"dark"}}),Ye=Object(h.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(o.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),Me=function(){var e=Ye();return r.a.createElement(g.a,null,r.a.createElement(u.a,{theme:ze},r.a.createElement(s.a,null),r.a.createElement(m.a,{position:"relative",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:g.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/tournament/8",className:e.link},"\u7b2c8\u671f"),r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/tournament/7",className:e.link},"\u7b2c7\u671f"),r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/tournament/6",className:e.link},"\u7b2c6\u671f"),r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/past",className:e.link},"\u904e\u53bb\u306e\u958b\u50ac"),r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/record",className:e.link},"\u8a18\u9332"),r.a.createElement(f.a,{component:g.b,variant:"button",color:"textPrimary",to:"/login",className:e.link},"\u30ed\u30b0\u30a4\u30f3"),r.a.createElement(f.a,{href:"https://github.com/kenkoooo/atcoder-tournament/tree/master/rules",target:"_blank",rel:"noopener noreferrer",variant:"button",color:"textPrimary",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(E.a,{component:"main",maxWidth:!1},r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/tournament/:seasonId([0-9]+)",render:function(e){var t=e.match.params.seasonId;return r.a.createElement(Se,{seasonId:null!==t&&void 0!==t?t:9..toString()})}}),r.a.createElement(v.b,{path:"/login"},r.a.createElement(F,null)),r.a.createElement(v.b,{path:"/mypage"},r.a.createElement(H,null)),r.a.createElement(v.b,{path:"/user/:user_id([0-9a-zA-Z_]+)"},r.a.createElement(De,null)),r.a.createElement(v.b,{path:"/past"},r.a.createElement(Pe,null)),r.a.createElement(v.b,{path:"/record"},r.a.createElement(Je,null)),r.a.createElement(v.a,{path:"/",to:"/tournament/".concat(9)})))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Me,null)),document.getElementById("root"))}},[[101,1,2]]]);
//# sourceMappingURL=main.a4b99d25.chunk.js.map