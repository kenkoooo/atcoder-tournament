(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{76:function(e,t,n){e.exports=n(86)},86:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(14),o=n.n(l),c=n(61),i=n(67),u=n(127),s=n(123),m=n(128),d=n(129),p=n(88),f=n(114),E=n(121),g=n(110),h=n(11),v=n(10),x=n(20),b=n(130),k=n(4),y=n(122),C=n(124),j=n(131),_=n(125),w=n(126),O=n(132),N=n(46),I=n(47),W=n(111),A=n(48),R=n(112),S=n(49),B=n(113),T=n(45),P=Object(g.a)((function(){return{red:{fontWeight:"bold",color:N.a[500]},orange:{fontWeight:"bold",color:I.a[500]},yellow:{fontWeight:"bold",color:W.a[500]},blue:{fontWeight:"bold",color:A.a[600]},lightBlue:{fontWeight:"bold",color:R.a[200]},green:{fontWeight:"bold",color:S.a[600]},brown:{fontWeight:"bold",color:B.a[400]},grey:{fontWeight:"bold",color:T.a[500]}}})),L=function(e){var t,n=P(),a=e.children,l=e.rating;if(!l)return r.a.createElement("p",null,a);t=l<400?n.grey:l<800?n.brown:l<1200?n.green:l<1600?n.lightBlue:l<2e3?n.blue:l<2400?n.yellow:l<2800?n.orange:n.red;var o=a.length<=13?a:a.slice(0,10)+"...";return r.a.createElement(f.a,{className:t,component:h.b,to:"/user/".concat(a)},o)},D=Object(g.a)({nodeBox:{textShadow:"rgb(34,34,34) 1px 1px 1px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",fontSize:"12px",minWidth:"120px",minHeight:"24px",backgroundColor:"#595a5e"},nameContainer:{padding:"3px",margin:0,textAlign:"center"},rankContainer:{padding:"3px",borderWidth:0,borderRadius:"3px",marginLeft:"auto",fontSize:"10px",minWidth:"24px",backgroundColor:function(e){return e.winner?"#f58540":"#828489"}},nodeText:{padding:"3px",margin:0,textAlign:"center"},rankText:{color:"black",textAlign:"center",textShadow:"none"}}),F=function(e){var t=e.user,n=e.rank,a=e.winner,l=D({winner:a});if(!t)return r.a.createElement("div",{className:l.nodeBox},r.a.createElement("p",null,"..."));var o=r.a.createElement("div",{className:l.nameContainer},e.defendingChampion?r.a.createElement(O.a,{title:"\u524d\u56de\u512a\u52dd\u8005"},r.a.createElement("span",{role:"img","aria-label":"king"},"\ud83d\udc51"," ")):null,r.a.createElement(L,{rating:t.rating},t.user_id));if(!n)return r.a.createElement("div",{className:l.nodeBox},o);var c=n>1e5?"-":n;return r.a.createElement(b.a,{display:"flex",justifyContent:"center",className:l.nodeBox},o,r.a.createElement(b.a,{display:"flex",alignItems:"center",justifyContent:"center",className:l.rankContainer},r.a.createElement("div",{className:l.rankText},c)))},z=Object(g.a)((function(){return{item:{display:"flex",flexDirection:"row-reverse","& p":{padding:"3px",margin:0,textShadow:"rgb(34, 34, 34) 1px 1px 1px",fontSize:"14px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",minWidth:"100px",textAlign:"center"}},itemChildren:{display:"flex",flexDirection:"column",justifyContent:"center"},itemChild:{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1px",marginBottom:"1px",position:"relative","&:before":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:0,transform:"translateX(100%)",width:"calc(".concat("60px"," / 2)"),height:"3px"},"&:after":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:"calc(-".concat("60px"," / 2)"),height:"calc(50% + ".concat("1px"," * 2)"),width:"3px"},"&:not(:last-child):not(:first-child)":{"&:after":{transform:"translateY(-50%) scaleY(2)"}},"&:last-child":{"&:after":{transform:"translateY(-100%)"}},"&:only-child:after":{display:"none"}},itemParent:{position:"relative",marginLeft:"60px",display:"flex",alignItems:"center","&:after":{position:"absolute",content:'""',width:"calc(".concat("60px"," / 2)"),height:"3px",left:0,top:"50%",backgroundColor:"#fff",transform:"translateX(-100%)"}}}})),Y=function e(t){var n,a,l,o,c,i=t.tournament,u=t.depth,s=t.config,m=t.promotedUser,d=z(),p=null===(n=i.user)||void 0===n?void 0:n.user_id;return 0===i.children.length||s.depthLimit<=u?r.a.createElement(F,{user:i.user,rank:i.rank,defendingChampion:(null===(a=i.user)||void 0===a?void 0:a.user_id)===s.defendingChampion,winner:void 0!==m&&(null===(l=i.user)||void 0===l?void 0:l.user_id)===m}):r.a.createElement("div",{className:d.item},r.a.createElement("div",{className:d.itemParent},r.a.createElement(F,{user:i.user,rank:i.rank,defendingChampion:(null===(o=i.user)||void 0===o?void 0:o.user_id)===s.defendingChampion,winner:void 0!==m&&(null===(c=i.user)||void 0===c?void 0:c.user_id)===m})),r.a.createElement("div",{className:d.itemChildren},i.children.map((function(t,n){return r.a.createElement("div",{key:n,className:d.itemChild},r.a.createElement(e,{tournament:t,promotedUser:p,depth:u+1,config:s}))}))))},G=n(68),J=n(115),M=n(116),H=n(117),U=n(118),X=n(119),Z=n(120),q=function(e){var t=e.entry,n=e.maxResultCount;return r.a.createElement(J.a,null,r.a.createElement(M.a,{align:"right"},"".concat(t.provisional_rank).concat($(t.provisional_rank))),r.a.createElement(M.a,null,r.a.createElement(L,{rating:t.user.rating},t.user.user_id)),Array.from(Array(n).keys()).map((function(e,n){var a=t.results[n];return a?r.a.createElement(M.a,{key:n,align:"center"},r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column"},a.opponent&&r.a.createElement(L,{rating:a.opponent.rating},a.opponent.user_id),r.a.createElement("span",null,Q(a.result)),r.a.createElement("span",null,V(a.result)))):r.a.createElement(M.a,{key:n},n+1,"\u56de\u6226")})),r.a.createElement(M.a,{align:"right"},t.win_count),r.a.createElement(M.a,{align:"right"},t.rank_sum))},K=function(e){var t=e.league,n=Math.max.apply(Math,Object(G.a)(t.map((function(e){return e.results.length}))));return r.a.createElement(H.a,null,r.a.createElement(U.a,null,r.a.createElement(X.a,null,r.a.createElement(J.a,null,r.a.createElement(M.a,{align:"right"},"\u9806\u4f4d"),r.a.createElement(M.a,null,"\u30e6\u30fc\u30b6\u30fc"),Array.from(Array(n).keys()).map((function(e,t){return r.a.createElement(M.a,{key:t,align:"center"},t+1,"\u56de\u6226")})),r.a.createElement(M.a,{align:"right"},"\u52dd\u5229\u6570"),r.a.createElement(M.a,{align:"right"},"\u9806\u4f4d\u5408\u8a08"))),r.a.createElement(Z.a,null,e.league.map((function(t){return t.provisional_rank===e.promotionRank?r.a.createElement(a.Fragment,{key:t.user.user_id},r.a.createElement(q,{entry:t,maxResultCount:n}),r.a.createElement(J.a,null,r.a.createElement(M.a,{colSpan:n+4},"\u6607\u683c\u30e9\u30a4\u30f3"))):t.provisional_rank===e.dropRank?r.a.createElement(a.Fragment,{key:t.user.user_id},r.a.createElement(J.a,null,r.a.createElement(M.a,{colSpan:n+4},"\u6b8b\u7559\u30e9\u30a4\u30f3")),r.a.createElement(q,{entry:t,maxResultCount:n})):r.a.createElement(q,{entry:t,maxResultCount:n,key:t.user.user_id})})))))},Q=function(e){switch(e.result){case"Win":case"SkipWin":return"\u25cb";case"Lose":case"SkipLose":return"\xd7";case"NotYet":case"Writer":return"-"}},V=function(e){switch(e.result){case"Win":case"Lose":var t=e.rank;return"".concat(t).concat($(t));default:return"-"}},$=function(e){var t=e%10,n=e%100;return 1===t&&11!==n?"st":2===t&&12!==n?"nd":3===t&&13!==n?"rd":"th"},ee=n(55),te=n.n(ee),ne=n(66),ae=n(50),re=function(){var e=Object(ne.a)(te.a.mark((function e(){var t,a,r,l,o,c,i,u;return te.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://atcoder-tournament.herokuapp.com/api/users");case 2:return t=e.sent,e.next=5,t.text();case 5:return a=e.sent,e.next=8,fetch("./bracket-4.json");case 8:return r=e.sent,e.next=11,r.text();case 11:return l=e.sent,e.next=14,fetch("./ratings.json");case 14:return o=e.sent,e.next=17,o.text();case 17:return c=e.sent,e.next=20,n.e(3).then(n.bind(null,137));case 20:return i=e.sent,u=i.construct_tournament(a,l,c,"SSRS"),e.abrupt("return",JSON.parse(u));case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=function(){return Object(ae.a)("./histories.json",(function(e){return fetch(e).then((function(e){return e.json()})).then((function(e){return e}))}),{revalidateOnFocus:!1,revalidateOnReconnect:!1})},oe=function(){return Object(ae.a)("./tournaments.json",(function(e){return fetch(e).then((function(e){return e.json()})).then((function(e){return e}))}),{revalidateOnFocus:!1,revalidateOnReconnect:!1})},ce=function(e){var t=e.top4;return t?r.a.createElement(E.a,null,Object.entries(t).map((function(e){var t=Object(x.a)(e,2),n=t[0],a=t[1],l="1"===n?"h3":"2"===n?"h4":"h5",o="1"===n?"\u512a\u52dd":"2"===n?"\u6e96\u512a\u52dd":"".concat(n,"\u4f4d");return r.a.createElement(b.a,{m:2,key:n},r.a.createElement(p.a,{variant:l,align:"center",color:"textPrimary"},o),a.map((function(e){return r.a.createElement(p.a,{variant:l,align:"center",color:"textPrimary",key:e.user_id},e.user_id)})))}))):null},ie=Object(k.a)((function(){return{root:{minWidth:10},selected:{}}}))(y.a),ue=function(e){var t=function(e){var t="./bracket-".concat(e,".json");return Object(ae.a)(t,(function(t){return"x"===e?re():fetch(t).then((function(e){return e.json()})).then((function(e){return e}))}),{revalidateOnFocus:!1,revalidateOnReconnect:!1})}(e.seasonId).data,n=Object(a.useState)(0),l=Object(x.a)(n,2),o=l[0],c=l[1],i=Object(a.useState)(!1),u=Object(x.a)(i,2),m=u[0],d=u[1],f=Object.keys(null!==t&&void 0!==t?t:{}),E=f[o]&&t?t[f[o]]:null,g=null===E||void 0===E?void 0:E.node,h=null===E||void 0===E?void 0:E.league,v=null===E||void 0===E?void 0:E.defending_champion,k=m?4:100;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null),r.a.createElement(C.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u7b2c",e.seasonId,"\u671f"),r.a.createElement(p.a,{variant:"h2",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"AtCoder Beginner Contest Tournament"),r.a.createElement(j.a,{variant:"fullWidth",value:o,onChange:function(e,t){return c(t)},centered:!0},f.map((function(e,t){return r.a.createElement(ie,{label:"".concat(e),key:t})}))),t?r.a.createElement(r.a.Fragment,null,f[o]&&r.a.createElement(ce,{top4:t[f[o]].top4}),r.a.createElement(_.a,{onClick:function(){return d(!m)}},m?"\u5168\u3066\u8868\u793a\u3059\u308b":"Top16\u306e\u307f\u8868\u793a\u3059\u308b"),r.a.createElement(b.a,{display:"flex",justifyContent:"center"},g&&r.a.createElement(Y,{tournament:g,depth:0,config:{depthLimit:k,defendingChampion:v}})),h&&h.length>0&&r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u9806\u4f4d\u6c7a\u5b9a\u30ea\u30fc\u30b0"),r.a.createElement(K,{league:h,promotionRank:null===E||void 0===E?void 0:E.promotion_rank,dropRank:null===E||void 0===E?void 0:E.drop_rank}))):r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(w.a,null))))},se=n(89),me=Object(g.a)((function(e){return{root:{flexGrow:1,maxWidth:800},paper:{padding:e.spacing(2),marginLeft:"auto",marginRight:"auto",marginTop:30},caption:{marginRight:20,minWidth:80},link:{color:"white"}}})),de=function(e){var t=me(),n=e.ranking.map((function(e){var t=Object(x.a)(e,2);return{rank:t[0]+1,userId:t[1].user_id}})).sort((function(e,t){return e.rank-t.rank})).slice(0,4);return r.a.createElement(se.a,{className:t.paper},r.a.createElement(C.a,{container:!0,spacing:2},r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(p.a,{variant:"h3"},r.a.createElement(f.a,{component:h.b,to:"/tournament/".concat(e.season),className:t.link},"\u7b2c",e.season,"\u671f"))),r.a.createElement(C.a,{item:!0,xs:6,direction:"column",spacing:2},n.map((function(e){return 1===e.rank?r.a.createElement(b.a,{display:"flex",alignItems:"center"},r.a.createElement(p.a,{className:t.caption,variant:"h4"},"\u512a\u52dd"),r.a.createElement(p.a,{variant:"h2"},e.userId)):2===e.rank?r.a.createElement(b.a,{display:"flex",alignItems:"center"},r.a.createElement(p.a,{className:t.caption,variant:"h6"},"\u6e96\u512a\u52dd"),r.a.createElement(p.a,{variant:"h4"},e.userId)):r.a.createElement(b.a,{display:"flex",alignItems:"center"},r.a.createElement(p.a,{className:t.caption,variant:"h6"},"\u7b2c",e.rank,"\u4f4d"),r.a.createElement(p.a,{variant:"h5"},e.userId))})),e.expandable&&r.a.createElement(b.a,{marginTop:2},r.a.createElement(f.a,{className:t.link,component:h.b,to:"/ranking/".concat(e.season)},"\u5168\u3066\u306e\u30e9\u30f3\u30ad\u30f3\u30b0\u3092\u8868\u793a")))))},pe=function(){var e=me(),t=oe().data;return t?(t.sort((function(e,t){return t.season.localeCompare(e.season)})),r.a.createElement(E.a,{className:e.root},r.a.createElement(p.a,{variant:"h2"},"\u904e\u53bb\u306e\u958b\u50ac"),r.a.createElement(E.a,null,t.map((function(e){return r.a.createElement(de,Object.assign({key:e.season},e))}))))):r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(w.a,null))},fe=Object(g.a)((function(){return{link:{color:"white"},table:{maxWidth:800}}})),Ee=function(){var e,t=fe(),n=Object(v.g)().seasonId,a=oe().data;if(!a)return r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(w.a,null));var l=null===(e=a.find((function(e){return e.season===n&&e.expandable})))||void 0===e?void 0:e.ranking;return l?(l.sort((function(e,t){return e[0]-t[0]})),r.a.createElement(b.a,{display:"flex",justifyContent:"center"},r.a.createElement(H.a,{className:t.table},r.a.createElement(U.a,null,r.a.createElement(X.a,null,r.a.createElement(J.a,null,r.a.createElement(M.a,null,"\u7dcf\u5408\u9806\u4f4d"),r.a.createElement(M.a,null,"\u30af\u30e9\u30b9"),r.a.createElement(M.a,null,"\u30af\u30e9\u30b9\u5185\u9806\u4f4d"),r.a.createElement(M.a,null,"\u30e6\u30fc\u30b6\u30fc\u540d"))),r.a.createElement(Z.a,null,l.map((function(e){var n=Object(x.a)(e,2),a=n[0],l=n[1];return r.a.createElement(J.a,{key:a},r.a.createElement(M.a,null,a+1),r.a.createElement(M.a,null,l.class),r.a.createElement(M.a,null,l.rank),r.a.createElement(M.a,null,r.a.createElement(p.a,{variant:"h6"},r.a.createElement(f.a,{className:t.link,component:h.b,to:"/user/".concat(l.user_id)},l.user_id))))}))))))):r.a.createElement("p",null,"not found")},ge=Object(g.a)((function(e){return{root:{flexGrow:1,maxWidth:800},paper:{padding:e.spacing(2),marginLeft:"auto",marginRight:"auto",marginTop:30},link:{color:"white"}}})),he=function(){var e,t,n=ge(),a=Object(v.g)().user_id,l=le().data;if(!l)return r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(w.a,null));var o=null!==(e=null===(t=l.find((function(e){return e.user_id===a})))||void 0===t?void 0:t.histories)&&void 0!==e?e:{},c=Object.entries(o).map((function(e){var t=Object(x.a)(e,2),n=t[0],a=t[1];return{season:parseInt(n),result:a}})).sort((function(e,t){return t.season-e.season})),i=c.filter((function(e){return"A"===e.result.class||"A1"===e.result.class})).filter((function(e){return 1===e.result.top_k})).length,u=c.filter((function(e){return"A"===e.result.class||"A1"===e.result.class})).filter((function(e){return 2===e.result.top_k})).length,s=c.filter((function(e){return"A1"===e.result.class})).length;return r.a.createElement(E.a,{className:n.root},r.a.createElement(C.a,{container:!0},r.a.createElement(C.a,{item:!0},r.a.createElement(p.a,{variant:"h2"},r.a.createElement(f.a,{className:n.link,href:"https://atcoder.jp/users/".concat(a)},a)),i>0&&r.a.createElement(p.a,{variant:"h6"},"\u512a\u52dd",i,"\u56de"),u>0&&r.a.createElement(p.a,{variant:"h6"},"\u6e96\u512a\u52dd",u,"\u56de"),s>0&&r.a.createElement(p.a,{variant:"h6"},"A1\u5728\u7c4d",s,"\u671f")),r.a.createElement(C.a,{item:!0,xs:12},c.map((function(e){return r.a.createElement(se.a,{key:e.season,className:n.paper},r.a.createElement(C.a,{container:!0,spacing:2},r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(p.a,{variant:"h5"},r.a.createElement(f.a,{component:h.b,to:"/tournament/".concat(e.season),className:n.link},"\u7b2c",e.season,"\u671f ",e.result.class,"\u30af\u30e9\u30b9"))),r.a.createElement(C.a,{item:!0,xs:4,direction:"column"},r.a.createElement(p.a,{variant:"body1"},"\u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement(p.a,{variant:"h4"},(t=e.season,a=e.result.top_k,l=e.result.class,1===a?"A"===l||"A1"===l?"\u7b2c".concat(t,"\u671f\u738b\u8005"):"\u512a\u52dd":2===a?"\u6e96\u512a\u52dd":"\u30d9\u30b9\u30c8".concat(a)))),e.result.final_rank&&r.a.createElement(C.a,{item:!0,xs:!0,direction:"column"},r.a.createElement(p.a,{variant:"body1"},"\u6700\u7d42\u9806\u4f4d"),r.a.createElement(p.a,{variant:"h4"},e.result.final_rank,"\u4f4d"))));var t,a,l})))))},ve=Object(g.a)((function(){return{link:{color:"white"}}})),xe=function(){var e=ve(),t=le().data;if(!t)return r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},r.a.createElement(w.a,null));var n=t.map((function(e){var t=e.user_id,n=Object.values(e.histories).filter((function(e){return"A1"===e.class||"A"===e.class})),a=n.filter((function(e){return 1===e.top_k})).length,r=n.filter((function(e){return 2===e.top_k})).length,l=n.filter((function(e){return 4===e.top_k})).length;return{a1Count:n.filter((function(e){return"A1"===e.class})).length,winCount:a,secondCount:r,fourCount:l,userId:t}})).filter((function(e){return e.a1Count+e.winCount+e.secondCount+e.fourCount>0}));return n.sort((function(e,t){return e.winCount!==t.winCount?t.winCount-e.winCount:e.secondCount!==t.secondCount?t.secondCount-e.secondCount:e.fourCount!==t.fourCount?t.fourCount-e.fourCount:e.a1Count!==t.a1Count?t.a1Count-e.a1Count:e.userId.localeCompare(t.userId)})),r.a.createElement(E.a,null,r.a.createElement(U.a,null,r.a.createElement(X.a,null,r.a.createElement(J.a,null,r.a.createElement(M.a,{variant:"head"},"\u30e6\u30fc\u30b6\u30fc"),r.a.createElement(M.a,{variant:"head",align:"center"},"\u512a\u52dd"),r.a.createElement(M.a,{variant:"head",align:"center"},"\u6e96\u512a\u52dd"),r.a.createElement(M.a,{variant:"head",align:"center"},"\u30d9\u30b9\u30c84"),r.a.createElement(M.a,{variant:"head",align:"center"},"A1\u5728\u7c4d"))),r.a.createElement(Z.a,null,n.map((function(t){return r.a.createElement(J.a,{key:t.userId},r.a.createElement(M.a,{variant:"head"},r.a.createElement(p.a,{variant:"h6"},r.a.createElement(f.a,{className:e.link,component:h.b,to:"/user/".concat(t.userId)},t.userId))),r.a.createElement(M.a,{align:"center"},t.winCount),r.a.createElement(M.a,{align:"center"},t.secondCount),r.a.createElement(M.a,{align:"center"},t.fourCount),r.a.createElement(M.a,{align:"center"},t.a1Count))})))))},be=Object(i.a)({palette:{type:"dark"}}),ke=Object(g.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(c.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),ye=function(){var e=ke();return r.a.createElement(h.a,null,r.a.createElement(u.a,{theme:be},r.a.createElement(s.a,null),r.a.createElement(m.a,{position:"relative",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:h.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(f.a,{component:h.b,variant:"button",color:"textPrimary",to:"/tournament/5",className:e.link},"\u7b2c5\u671f"),r.a.createElement(f.a,{component:h.b,variant:"button",color:"textPrimary",to:"/tournament/4",className:e.link},"\u7b2c4\u671f"),r.a.createElement(f.a,{component:h.b,variant:"button",color:"textPrimary",to:"/tournament/3",className:e.link},"\u7b2c3\u671f"),r.a.createElement(f.a,{component:h.b,variant:"button",color:"textPrimary",to:"/past",className:e.link},"\u904e\u53bb\u306e\u958b\u50ac"),r.a.createElement(f.a,{component:h.b,variant:"button",color:"textPrimary",to:"/record",className:e.link},"\u8a18\u9332"),r.a.createElement(f.a,{href:"https://github.com/kenkoooo/atcoder-tournament/tree/master/rules",target:"_blank",rel:"noopener noreferrer",variant:"button",color:"textPrimary",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(E.a,{component:"main",maxWidth:!1},r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(ue,{seasonId:null!==t&&void 0!==t?t:5..toString()})}}),r.a.createElement(v.b,{path:"/user/:user_id([0-9a-zA-Z_]+)"},r.a.createElement(he,null)),r.a.createElement(v.b,{path:"/past"},r.a.createElement(pe,null)),r.a.createElement(v.b,{path:"/record"},r.a.createElement(xe,null)),r.a.createElement(v.b,{path:"/ranking/:seasonId([0-9]+)"},r.a.createElement(Ee,null)),r.a.createElement(v.a,{path:"/",to:"/tournament/".concat(5)})))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ye,null)),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.8264cd88.chunk.js.map