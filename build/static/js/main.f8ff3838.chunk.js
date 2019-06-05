(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,n){e.exports=n.p+"static/media/loading.c5590569.svg"},127:function(e,t,n){e.exports=n(195)},132:function(e,t,n){},133:function(e,t,n){},178:function(e,t){},195:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(47),s=(n(132),n(227)),l=n(33),c=n(67),r=n(13),u=n(14),d=n(19),h=n(18),m=n(20),p=(n(133),n(4)),g=n(224),f=n(226),k=n(117),v=n(223),y=n(116),x=n(202),b=n(230),E=n(228),w=o.a.createContext(void 0),M={childrenGap:10},I=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e)))._isMounted=!1,n._showPanel=function(e){return function(){var t=n.state.showPanel;t[e]=!0,n._isMounted&&n.setState({showPanel:t})}},n._hidePanel=function(e){return function(){var t=n.state.showPanel;t[e]=!1,n._isMounted&&n.setState({showPanel:t})}},n._logout=function(){return function(){n.props.logout()}},n.state={showPanel:{panel:!1,chan:!1}},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e={root:{fontSize:"10px",color:"#aaa",padding:0}},t={imageFit:p.b.contain,width:200,height:200};return o.a.createElement("div",null,o.a.createElement(g.a,{horizontalAlign:"center",padding:10,tokens:M},o.a.createElement(f.a,{variant:"xLarge"},"Chat With React (Connected: ",this.context.count,")"),o.a.createElement(g.a,{horizontalAlign:"center",horizontal:!0,tokens:M},o.a.createElement(k.a,{text:"Channel List",onClick:this._showPanel("chan")}),o.a.createElement(k.a,{text:"Profil Settings",onClick:this._showPanel("panel")}),o.a.createElement(k.a,{text:"Logout",onClick:this._logout()}))),o.a.createElement(v.a,{isOpen:this.state.showPanel.panel,isLightDismiss:!0,headerText:"Profil Settings",onDismiss:this._hidePanel("panel")},o.a.createElement(y.a,Object.assign({},t,{src:this.context.pdp?this.context.pdp:"https://www.freeiconspng.com/uploads/discord-metro-style-icon-0.png",alt:"Profil Photo"})),o.a.createElement(x.a,{styles:e,htmlFor:"idName"},"Name"),o.a.createElement(b.a,{className:"textInput",id:"idName",multiline:!1,resizable:!1,placeholder:"Anonyme",value:this.context.author,onChange:this.context.changeName}),o.a.createElement(x.a,{styles:e,htmlFor:"idProfil"},"Image"),o.a.createElement(b.a,{className:"textInput",id:"idProfil",multiline:!1,resizable:!1,placeholder:"Image Url",value:this.context.pdp,onChange:this.context.changeUrl})),o.a.createElement(v.a,{isOpen:this.state.showPanel.chan,isLightDismiss:!0,headerText:"Channel",onDismiss:this._hidePanel("chan")},o.a.createElement(g.a,{horizontalAlign:"center",padding:10,tokens:M},o.a.createElement(E.a,{className:"channelBlock",href:"/salon/1"},"Salon 1"),o.a.createElement(E.a,{className:"channelBlock",href:"/salon/2"},"Salon 2"),o.a.createElement(E.a,{className:"channelBlock",href:"/salon/3"},"Salon 3"),o.a.createElement(E.a,{className:"channelBlock",href:"/salon/4"},"Salon 4"),o.a.createElement(E.a,{className:"channelBlock",href:"/salon/5"},"Salon 5"))))}}]),t}(o.a.Component);I.contextType=w;var j=n(229),O=n(222),S=n(108),_=n.n(S),T={childrenGap:10},C=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e))).myUploadRef=void 0,n.keyPress=function(e){13===e.keyCode&&n.sendNewMessage()},n.sendNewMessage=function(){n.state.message&&(n.context.sendMessage(n.context.author?n.context.author:"Anonyme",n.state.message,n.context.id,n.context.pdp,"message",null),n.setState({message:void 0}))},n.onChange=function(e,t){n.setState({message:t})},n.clickUpload=function(){n.myUploadRef&&n.myUploadRef.current&&n.myUploadRef.current.click()},n.uploadFile=function(e){if(e){var t=new FormData;t.append("file",e[0]),_.a.post(n.context.endpoint+"/upload",t).then(function(e){var t=n.context.endpoint+"/static/"+e.data.filename.split(" ").join("%20"),a=e.data.originalname;n.context.sendMessage(n.context.author?n.context.author:"Anonyme",t,n.context.id,n.context.pdp,"file",a)})}},n.state={message:void 0},n.myUploadRef=o.a.createRef(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(g.a,{horizontal:!0,horizontalAlign:"center",padding:10,tokens:T},o.a.createElement(g.a.Item,{align:"center"},o.a.createElement(j.a,{iconProps:{iconName:"CirclePlus"},title:"Upload",onClick:this.clickUpload})),o.a.createElement(g.a.Item,{align:"center"},o.a.createElement(b.a,{id:"sendInput",multiline:!1,resizable:!1,placeholder:"Type message...",value:this.state.message,onChange:this.onChange,onKeyUp:this.keyPress})),o.a.createElement(g.a.Item,{align:"center"},o.a.createElement(O.a,{id:"sendButton",text:"Send",onClick:this.sendNewMessage})),o.a.createElement("input",{ref:this.myUploadRef,style:{display:"none"},type:"file",onChange:function(t){return e.uploadFile(t.target.files)}}))}}]),t}(o.a.Component);C.contextType=w;var P=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e))).editMsg=function(e){n.setState({edit:!0,tmp:e,newText:e})},n.keyPress=function(e){13===e.keyCode&&n.validEditMessage(),27===e.keyCode&&n.setState({edit:!1,tmp:null,newText:null})},n.validEditMessage=function(){var e=n.state.newText;n.setState({edit:!1,tmp:null,newText:null}),e?n.context.editMessage(n.props.uid,e):n.context.deleteMessage(n.props.uid)},n.onChange=function(e,t){n.setState({newText:t})},n.state={edit:!1,tmp:null,newText:null},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e,t,n=this,a=this.props,i=a.author,s=a.text,l=a.id,c=a.aid,r=a.date,u=a.uid,d=a.type,h=a.link,m={imageFit:p.b.contain,width:100,height:100},k=s.match(/(^data:image\/([a-zA-Z]*);base64,([^\"]*))|(\.(gif|jpe?g|tiff|png)$)/i);return t="message"===d?this.state.edit?o.a.createElement(b.a,{className:"inputEditContainer",inputClassName:"inputEdit",borderless:!0,multiline:!1,resizable:!1,id:l,value:this.state.newText,onChange:this.onChange,onKeyUp:this.keyPress}):k&&k.length>0?o.a.createElement(y.a,Object.assign({},m,{src:s,alt:"Photo in message"})):o.a.createElement(f.a,{id:l},s):k&&k.length>0?o.a.createElement(y.a,Object.assign({},m,{src:s,alt:h})):o.a.createElement(E.a,{className:"fileLink",href:s},h),c===this.context.id&&"message"===d?e=o.a.createElement(j.a,{"data-automation-id":"test",text:"",splitButtonAriaLabel:"See 2 sample options","aria-roledescription":"split button",style:{height:"35px"},menuProps:{items:[{key:"editMessage",text:"Edit",iconProps:{iconName:"CodeEdit"},onClick:function(){return n.editMsg(s)}},{key:"deleteMessage",text:"Delete",iconProps:{iconName:"Delete"},onClick:function(){return n.context.deleteMessage(u)}}]}}):c===this.context.id&&(e=o.a.createElement(j.a,{"data-automation-id":"test",text:"",splitButtonAriaLabel:"See 1 sample options","aria-roledescription":"split button",style:{height:"35px"},menuProps:{items:[{key:"deleteMessage",text:"Delete",iconProps:{iconName:"Delete"},onClick:function(){return n.context.deleteMessage(u)}}]}})),o.a.createElement("div",null,o.a.createElement(g.a,{horizontal:!0},o.a.createElement(g.a,{id:"messageItem",className:c===this.context.id?"containerItemAuthor":"containerItem",padding:7},o.a.createElement(x.a,{styles:{root:{fontSize:"10px",color:"#ffffff",padding:0}},htmlFor:l},i,"#",c.substring(0,4)," ",r),t),o.a.createElement("div",null,e)))}}]),t}(o.a.Component);P.contextType=w;var A={childrenGap:10},N=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e)))._isMounted=!1,n.myRef=void 0,n.scrollToBottom=function(){n.myRef&&n.myRef.current&&n._isMounted&&n.myRef.current.scrollIntoView({behavior:"smooth"})},n.myRef=o.a.createRef(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.context.list,t=Object.keys(e),n={imageFit:p.b.contain,width:50,height:50,className:"pdpImage"};return o.a.createElement(g.a,{className:"container",tokens:A},t.map(function(t){return o.a.createElement(g.a,{key:t,horizontal:!0,tokens:{childrenGap:5},className:"subContainer"},o.a.createElement(y.a,Object.assign({},n,{src:e[t].pdp?e[t].pdp:"https://www.freeiconspng.com/uploads/discord-metro-style-icon-0.png",alt:"Profil Photo"})),o.a.createElement(P,Object.assign({id:t},e[t])))}),o.a.createElement("div",{style:{float:"left",clear:"both"},ref:this.myRef}))}},{key:"componentDidMount",value:function(){this._isMounted=!0,this.scrollToBottom()}},{key:"componentDidUpdate",value:function(){"new"===this.props.lastEvent&&this._isMounted&&this.scrollToBottom()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}}]),t}(o.a.Component);N.contextType=w;var U=n(109),D=n.n(U),L=n(69),z=n.n(L),R=n(110),B=n.n(R),K=n(115);Object(K.a)();var F=1,W=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e)))._isMounted=!1,n.updateData=function(e){n._isMounted&&n.setState({count:e.count})},n.loadMore=function(){if(n._isMounted){var e=Object.keys(n.state.list).length+5;n.state.socket.emit("history",{len:e})}},n._getHistory=function(e){if(n._isMounted){var t={};e.save.forEach(function(e){var n=F++;t=Object(c.a)({},t,Object(l.a)({},n,{author:e.author,text:e.text,aid:e.aid,pdp:e.pdp,date:e.date,uid:e.uid,type:e.type,link:e.link}))}),n.setState({list:t})}},n._wEditMessage=function(e,t){n._isMounted&&n.state.socket.emit("edit message",{uid:e,text:t})},n._wDeleteMessage=function(e){n._isMounted&&n.state.socket.emit("delete message",{uid:e})},n._editMessage=function(e){if(n._isMounted){var t=n.state.list,a=t,o=Object.keys(t).filter(function(n){return t[n].uid===e.uid});o&&o.length>0&&a[o[0]]&&(a[o[0]].text=e.text,n.setState({list:a,lastEvent:"edit"}))}},n._deleteMessage=function(e){if(n._isMounted){var t=n.state.list,a=t,o=Object.keys(t).filter(function(n){return t[n].uid===e.uid});o&&o.length>0&&a[o[0]]&&(delete a[o[0]],n.setState({list:a,lastEvent:"delete"})),Object.keys(a).length<7&&n.state.socket.emit("history",{len:7})}},n._sendMessage=function(e,t,a,o,i,s){if(n._isMounted){var l=B()().format("hh:mm A").toString();n.state.socket.emit("chat message",{author:e,text:t,aid:a,pdp:o,uid:z()(),date:l,type:i,link:s})}},n._newMessage=function(e){if(n._isMounted){var t=n.state.list,a=F++;n.setState({list:Object(c.a)({},t,Object(l.a)({},a,{author:e.author,text:e.text,aid:e.aid,pdp:e.pdp,date:e.date,uid:e.uid,type:e.type,link:e.link})),lastEvent:"new"})}},n.changeName=function(e,t){n._isMounted&&n.setState({author:t})},n.changeUrl=function(e,t){n._isMounted&&n.setState({pdp:t})},n.state={list:{},lastEvent:"",author:localStorage.getItem("contextAuthorKey"),endpoint:"http://127.0.0.1:4001",socket:null,count:1,id:localStorage.getItem("contextIdKey"),pdp:localStorage.getItem("contextPdpKey")},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t=this.state.id?this.state.id:z()(),n=this.state.author?this.state.author:"",a=this.state.pdp?this.state.pdp:"",o=this.state.endpoint,i=this.props.match.params.salonId,s=D()(o+"/salon"+(i>0&&i<=5?i:"1"));s.on("history",this._getHistory),s.on("chat message",function(t){e._newMessage(t)}),s.on("new on",this.updateData),s.on("new off",this.updateData),s.on("delete message",this._deleteMessage),s.on("edit message",this._editMessage),this._isMounted&&this.setState({socket:s,id:t,pdp:a,author:n})}},{key:"componentDidUpdate",value:function(e,t){localStorage.getItem("isLoggedIn")&&this.state.id!==t.id&&localStorage.setItem("contextIdKey",this.state.id),localStorage.getItem("isLoggedIn")&&this.state.author!==t.author&&localStorage.setItem("contextAuthorKey",this.state.author),localStorage.getItem("isLoggedIn")&&this.state.pdp!==t.pdp&&localStorage.setItem("contextPdpKey",this.state.pdp)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this.state,t=e.list,n=e.author,a=e.count,i=e.id,s=e.pdp,l=e.endpoint;return o.a.createElement("div",{className:"App"},o.a.createElement(w.Provider,{value:{list:t,author:n,count:a,id:i,pdp:s,sendMessage:this._sendMessage,changeName:this.changeName,changeUrl:this.changeUrl,editMessage:this._wEditMessage,deleteMessage:this._wDeleteMessage,endpoint:l}},o.a.createElement(I,{logout:this.props.auth.logout}),o.a.createElement(E.a,{styles:{root:{padding:5}},onClick:this.loadMore},"Load more"),o.a.createElement(N,{lastEvent:this.state.lastEvent}),o.a.createElement(C,null)))}}]),t}(o.a.Component),G=n(111),H=n(25),J=Object(H.a)(),V=function(){function e(){Object(r.a)(this,e),this.auth0=new G.a.WebAuth({domain:"aancel.eu.auth0.com",clientID:"nu9gltRW3Vkjl5rLbIOgZJv6UOyMILtm",redirectUri:"http://localhost:3000/callback",responseType:"token id_token"}),this.accessToken=void 0,this.idToken=void 0,this.expiresAt=void 0,this.userInfo=void 0,this.login=this.login.bind(this),this.logout=this.logout.bind(this),this.handleAuthentication=this.handleAuthentication.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.getAccessToken=this.getAccessToken.bind(this),this.getIdToken=this.getIdToken.bind(this),this.renewSession=this.renewSession.bind(this)}return Object(u.a)(e,[{key:"login",value:function(){this.auth0.authorize()}},{key:"handleAuthentication",value:function(){var e=this;this.auth0.parseHash(function(t,n){n&&n.accessToken&&n.idToken?e.setSession(n):t&&(J.replace("/salon/1"),console.log(t),alert("Error: ".concat(t.error,". Check the console for further details.")))})}},{key:"getAccessToken",value:function(){return this.accessToken}},{key:"getIdToken",value:function(){return this.idToken}},{key:"setSession",value:function(e){var t=this;localStorage.setItem("isLoggedIn","true");var n=1e3*(e.expiresIn?e.expiresIn:1)+(new Date).getTime();this.expiresAt=n,this.accessToken=e.accessToken,this.idToken=e.idToken,e.accessToken&&this.auth0.client.userInfo(e.accessToken,function(e,n){console.log("user",n),t.userInfo=n,localStorage.setItem("contextAuthorKey",n.name),localStorage.setItem("contextPdpKey",n.picture),localStorage.setItem("contextIdKey",n.sub.split("|",2)[1]),J.replace("/salon/1")})}},{key:"renewSession",value:function(){var e=this;this.auth0.checkSession({},function(t,n){n&&n.accessToken&&n.idToken?e.setSession(n):t&&(e.logout(),console.log(t),alert("Could not get a new token (".concat(t.error,": ").concat(t.error_description,").")))})}},{key:"logout",value:function(){this.accessToken=null,this.idToken=null,this.expiresAt=0,localStorage.removeItem("isLoggedIn"),localStorage.removeItem("contextIdKey"),localStorage.removeItem("contextPdpKey"),this.auth0.logout({returnTo:"http://localhost:3000/salon/1"}),J.replace("/salon/1")}},{key:"isAuthenticated",value:function(){var e=this.expiresAt;return!!e&&(new Date).getTime()<e}}]),e}(),Z=n(112),$=n.n(Z),q=function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{style:{position:"absolute",display:"flex",justifyContent:"center",height:"100vh",width:"100vw",top:0,bottom:0,left:0,right:0,backgroundColor:"white"}},o.a.createElement("img",{src:$.a,alt:"loading"}))}}]),t}(a.Component),Q=new V,X=function(){return o.a.createElement(s.b,{history:J},o.a.createElement("div",null,o.a.createElement(s.a,{path:"/salon/:salonId",render:function(e){return console.log(localStorage.getItem("isLoggedIn")),localStorage.getItem("isLoggedIn")||Q.isAuthenticated()||Q.login(),o.a.createElement(W,Object.assign({auth:Q},e))}}),o.a.createElement(s.a,{path:"/callback",render:function(e){return function(e){var t=e.location;/access_token|id_token|error/.test(t.hash)?Q.handleAuthentication():J.replace("/salon/1")}(e),o.a.createElement(q,e)}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(i.render)(o.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[127,1,2]]]);
//# sourceMappingURL=main.f8ff3838.chunk.js.map