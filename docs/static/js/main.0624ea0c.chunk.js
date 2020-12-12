(this["webpackJsonpatcoder-tournament"]=this["webpackJsonpatcoder-tournament"]||[]).push([[0],{70:function(e,t,a){e.exports=a(79)},79:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),i=a.n(l),o=a(56),c=a(61),m=a(116),s=a(113),u=a(121),d=a(117),p=a(81),g=a(104),f=a(111),h=a(100),E=a(33),x=a(9),v=a(47),b=a(118),y=a(4),k=a(112),C=a(114),j=a(119),w=a(115),_=a(120),N=a(43),P=a(44),W=a(101),B=a(45),O=a(102),S=a(46),T=a(103),A=a(42),I=Object(h.a)((function(){return{red:{color:N.a[500]},orange:{color:P.a[500]},yellow:{color:W.a[500]},blue:{color:B.a[600]},lightBlue:{color:O.a[200]},green:{color:S.a[400]},brown:{color:T.a[400]},grey:{color:A.a[500]}}})),L=function(e){var t,a=I(),n=e.children,l=e.rating;if(!l)return r.a.createElement("p",null,n);t=l<400?a.grey:l<800?a.brown:l<1200?a.green:l<1600?a.lightBlue:l<2e3?a.blue:l<2400?a.yellow:l<2800?a.orange:a.red;var i=n.length<=13?n:n.slice(0,10)+"...";return r.a.createElement(g.a,{className:t,href:"https://atcoder.jp/users/".concat(n)},i)},D=Object(h.a)({nodeBox:{textShadow:"rgb(34,34,34) 1px 1px 1px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",fontSize:"12px",minWidth:"120px",minHeight:"24px",backgroundColor:"#595a5e"},nameContainer:{padding:"3px",margin:0,textAlign:"center"},rankContainer:{padding:"3px",borderWidth:0,borderRadius:"3px",marginLeft:"auto",fontSize:"10px",minWidth:"24px",backgroundColor:function(e){return e.winner?"#f58540":"#828489"}},nodeText:{padding:"3px",margin:0,textAlign:"center"},rankText:{color:"black",textAlign:"center",textShadow:"none"}}),R=function(e){var t=e.user,a=e.rank,n=e.winner,l=D({winner:n});if(!t)return r.a.createElement("div",{className:l.nodeBox},r.a.createElement("p",null,"..."));var i=r.a.createElement("div",{className:l.nameContainer},e.defendingChampion?r.a.createElement(_.a,{title:"\u524d\u56de\u512a\u52dd\u8005"},r.a.createElement("span",{role:"img","aria-label":"king"},"\ud83d\udc51"," ")):null,r.a.createElement(L,{rating:t.rating},t.user_id));if(!a)return r.a.createElement("div",{className:l.nodeBox},i);var o=a>1e5?"-":a;return r.a.createElement(b.a,{display:"flex",justifyContent:"center",className:l.nodeBox},i,r.a.createElement(b.a,{display:"flex",alignItems:"center",justifyContent:"center",className:l.rankContainer},r.a.createElement("div",{className:l.rankText},o)))},Y=Object(h.a)((function(){return{item:{display:"flex",flexDirection:"row-reverse","& p":{padding:"3px",margin:0,textShadow:"rgb(34, 34, 34) 1px 1px 1px",fontSize:"14px",fontFamily:'"Roboto Light", sans-serif',borderWidth:0,borderRadius:"3px",minWidth:"100px",textAlign:"center"}},itemChildren:{display:"flex",flexDirection:"column",justifyContent:"center"},itemChild:{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1px",marginBottom:"1px",position:"relative","&:before":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:0,transform:"translateX(100%)",width:"calc(".concat("60px"," / 2)"),height:"3px"},"&:after":{content:'""',position:"absolute",backgroundColor:"#fff",top:"50%",right:"calc(-".concat("60px"," / 2)"),height:"calc(50% + ".concat("1px"," * 2)"),width:"3px"},"&:not(:last-child):not(:first-child)":{"&:after":{transform:"translateY(-50%) scaleY(2)"}},"&:last-child":{"&:after":{transform:"translateY(-100%)"}},"&:only-child:after":{display:"none"}},itemParent:{position:"relative",marginLeft:"60px",display:"flex",alignItems:"center","&:after":{position:"absolute",content:'""',width:"calc(".concat("60px"," / 2)"),height:"3px",left:0,top:"50%",backgroundColor:"#fff",transform:"translateX(-100%)"}}}})),z=function e(t){var a,n,l,i,o,c=t.tournament,m=t.depth,s=t.config,u=t.promotedUser,d=Y(),p=null===(a=c.user)||void 0===a?void 0:a.user_id;return 0===c.children.length||s.depthLimit<=m?r.a.createElement(R,{user:c.user,rank:c.rank,defendingChampion:(null===(n=c.user)||void 0===n?void 0:n.user_id)===s.defendingChampion,winner:void 0!==u&&(null===(l=c.user)||void 0===l?void 0:l.user_id)===u}):r.a.createElement("div",{className:d.item},r.a.createElement("div",{className:d.itemParent},r.a.createElement(R,{user:c.user,rank:c.rank,defendingChampion:(null===(i=c.user)||void 0===i?void 0:i.user_id)===s.defendingChampion,winner:void 0!==u&&(null===(o=c.user)||void 0===o?void 0:o.user_id)===u})),r.a.createElement("div",{className:d.itemChildren},c.children.map((function(t,a){return r.a.createElement("div",{key:a,className:d.itemChild},r.a.createElement(e,{tournament:t,promotedUser:p,depth:m+1,config:s}))}))))},F=a(62),J=a(105),M=a(106),H=a(107),U=a(108),X=a(109),G=a(110),q=function(e){var t=e.league,a=Math.max.apply(Math,Object(F.a)(t.map((function(e){return e.results.length}))));return r.a.createElement(J.a,null,r.a.createElement(M.a,null,r.a.createElement(H.a,null,r.a.createElement(U.a,null,r.a.createElement(X.a,{align:"right"},"\u9806\u4f4d"),r.a.createElement(X.a,null,"\u30e6\u30fc\u30b6\u30fc"),Array.from(Array(a).keys()).map((function(e,t){return r.a.createElement(X.a,{key:t,align:"center"},t+1,"\u56de\u6226")})),r.a.createElement(X.a,{align:"right"},"\u52dd\u5229\u6570"),r.a.createElement(X.a,{align:"right"},"\u9806\u4f4d\u5408\u8a08"))),r.a.createElement(G.a,null,e.league.map((function(e){return r.a.createElement(U.a,{key:e.user.user_id},r.a.createElement(X.a,{align:"right"},"".concat(e.provisional_rank).concat(V(e.provisional_rank))),r.a.createElement(X.a,null,r.a.createElement(L,{rating:e.user.rating},e.user.user_id)),Array.from(Array(a).keys()).map((function(t,a){var n=e.results[a];return n?r.a.createElement(X.a,{key:a,align:"center"},r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column"},n.opponent&&r.a.createElement(L,{rating:n.opponent.rating},n.opponent.user_id),r.a.createElement("span",null,K(n.result)),r.a.createElement("span",null,Q(n.result)))):r.a.createElement(X.a,{key:a},a+1,"\u56de\u6226")})),r.a.createElement(X.a,{align:"right"},e.win_count),r.a.createElement(X.a,{align:"right"},e.rank_sum))})))))},K=function(e){switch(e.result){case"Win":case"SkipWin":return"\u25cb";case"Lose":case"SkipLose":return"\xd7";case"NotYet":case"Writer":return"-"}},Q=function(e){switch(e.result){case"Win":case"Lose":var t=e.rank;return"".concat(t).concat(V(t));default:return"-"}},V=function(e){var t=e%10,a=e%100;return 1===t&&11!==a?"st":2===t&&12!==a?"nd":3===t&&13!==a?"rd":"th"},Z=function(e){var t=e.users;return!t||t.length<4?null:r.a.createElement(f.a,null,r.a.createElement(b.a,{m:2},r.a.createElement(p.a,{variant:"h3",align:"center",color:"textPrimary"},"\u512a\u52dd"),r.a.createElement(p.a,{variant:"h3",align:"center",color:"textPrimary"},t[0].user_id)),r.a.createElement(b.a,{m:2},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u6e96\u512a\u52dd"),r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},t[1].user_id)),r.a.createElement(b.a,{m:2},r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},"3\u4f4d\u30bf\u30a4"),r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},t[2].user_id),r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary"},t[3].user_id)))},$=Object(y.a)((function(){return{root:{minWidth:10},selected:{}}}))(k.a),ee=function(e){var t=Object(n.useState)({}),a=Object(v.a)(t,2),l=a[0],i=a[1],o=Object(n.useState)(0),c=Object(v.a)(o,2),m=c[0],u=c[1],d=Object(n.useState)(!1),g=Object(v.a)(d,2),f=g[0],h=g[1],E=Object.keys(l),x=E[m]?l[E[m]].node:null,y=E[m]?l[E[m]].league:null,k=E[m]?l[E[m]].defending_champion:void 0;Object(n.useEffect)((function(){var t;(t=e.seasonId,fetch("./bracket-".concat(t,".json")).then((function(e){return e.json()})).then((function(e){return e}))).then((function(e){i(e)}))}),[e.seasonId]);var _=f?4:100;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null),r.a.createElement(C.a,{container:!0,justify:"center",direction:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u7b2c",e.seasonId,"\u671f"),r.a.createElement(p.a,{variant:"h2",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"AtCoder Beginner Contest Tournament"),"2"===e.seasonId&&r.a.createElement(p.a,{variant:"h5",align:"center",color:"textPrimary",display:"inline",noWrap:!0},"2020/11/22 19:00 JST \u767b\u9332\u3006\u5207"),r.a.createElement(j.a,{variant:"fullWidth",value:m,onChange:function(e,t){return u(t)},centered:!0},E.map((function(e,t){return r.a.createElement($,{label:"".concat(e),key:t})}))),E[m]&&r.a.createElement(Z,{users:l[E[m]].top4}),r.a.createElement(w.a,{onClick:function(){return h(!f)}},f?"\u5168\u3066\u8868\u793a\u3059\u308b":"Top16\u306e\u307f\u8868\u793a\u3059\u308b"),r.a.createElement(b.a,{display:"flex",justifyContent:"center"},x&&r.a.createElement(z,{tournament:x,depth:0,config:{depthLimit:_,defendingChampion:k}})),y&&r.a.createElement(b.a,{display:"flex",justifyContent:"center",flexDirection:"column"},r.a.createElement(p.a,{variant:"h4",align:"center",color:"textPrimary"},"\u9806\u4f4d\u6c7a\u5b9a\u30ea\u30fc\u30b0"),r.a.createElement(q,{league:y}))))},te=Object(c.a)({palette:{type:"dark"}}),ae=Object(h.a)((function(e){return{appBar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbar:{flexWrap:"wrap"},toolbarTitle:{flexGrow:1,textDecoration:"none"},link:{margin:e.spacing(1,1.5)},heroContent:{padding:e.spacing(8,0,6)},cardHeader:{backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[700]},cardPricing:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:e.spacing(2)},footer:Object(o.a)({borderTop:"1px solid ".concat(e.palette.divider),marginTop:e.spacing(8),paddingTop:e.spacing(3),paddingBottom:e.spacing(3)},e.breakpoints.up("sm"),{paddingTop:e.spacing(6),paddingBottom:e.spacing(6)})}})),ne=function(){var e=ae();return r.a.createElement(E.a,null,r.a.createElement(m.a,{theme:te},r.a.createElement(s.a,null),r.a.createElement(u.a,{position:"relative",color:"default",elevation:0,className:e.appBar},r.a.createElement(d.a,{className:e.toolbar},r.a.createElement(p.a,{component:E.b,variant:"h6",color:"inherit",noWrap:!0,className:e.toolbarTitle,to:"/"},"ABC \u30c8\u30fc\u30ca\u30e1\u30f3\u30c8"),r.a.createElement("nav",null,r.a.createElement(g.a,{component:E.b,variant:"button",color:"textPrimary",to:"/tournament/1",className:e.link},"\u7b2c1\u671f"),r.a.createElement(g.a,{component:E.b,variant:"button",color:"textPrimary",to:"/tournament/2",className:e.link},"\u7b2c2\u671f"),r.a.createElement(g.a,{href:"https://github.com/kenkoooo/atcoder-tournament/tree/master/rules",target:"_blank",rel:"noopener noreferrer",variant:"button",color:"textPrimary",className:e.link},"\u30eb\u30fc\u30eb")))),r.a.createElement(f.a,{component:"main",maxWidth:!1},r.a.createElement(x.d,null,r.a.createElement(x.b,{exact:!0,path:"/tournament/:id([0-9]+)",render:function(e){var t=e.match.params.id;return r.a.createElement(ee,{seasonId:null!==t&&void 0!==t?t:2..toString()})}}),r.a.createElement(x.a,{path:"/",to:"/tournament/".concat(2)})))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ne,null)),document.getElementById("root"))}},[[70,1,2]]]);
//# sourceMappingURL=main.0624ea0c.chunk.js.map