(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){e.exports=a.p+"static/media/bow-and-arrow.476dc3d6.png"},16:function(e,t,a){},28:function(e,t,a){e.exports=a(79)},34:function(e,t,a){},38:function(e,t,a){},77:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),s=a.n(o),l=(a(34),a(36),a(2)),c=a(3),i=a(5),m=a(4),u=a(6),d=(a(38),a(10)),h=a(14),g=a.n(h),E=a(9),p=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).onLogoutButton=function(){var e={method:"DELETE",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/logout",e),localStorage.removeItem("ErosToken"),a.props.logout()},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"fixed-top container-fluid px-4 py-2 d-inline-flex w-100",style:{backgroundColor:"#0F0E08"}},r.a.createElement("div",{className:"row justify-content-between w-100"},r.a.createElement("div",{className:"col-xl-11 col-lg-10 col-sm-9 col-xs-9 d-inline-flex"},r.a.createElement("img",{src:g.a,height:"60px",alt:"Eros Logo"}),r.a.createElement("h2",{className:"text-light pt-2 px-4"},"Eros Server Manager ")),r.a.createElement("div",{className:"col-xl-1 col-lg-2 col-sm-3 col-xs-3 pt-2 float-right"},r.a.createElement("button",{onClick:this.onLogoutButton,className:"btn btn-danger w-100"},"Logout"))))}}]),t}(n.Component),f=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).tabSelect=function(e){document.querySelectorAll(".nav-link").forEach(function(e){e.classList.remove("active"),e.classList.add("text-primary")}),e.target.classList.add("active"),a.props.changeRoute(e.target.getAttribute("value"))},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("ul",{className:"nav nav-tabs nav-fill bg-dark",style:{cursor:"pointer"}},r.a.createElement("li",{className:"nav-item"},r.a.createElement("p",{onClick:this.tabSelect,className:"nav-link active",value:"inventory"},"Inventory")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("p",{onClick:this.tabSelect,className:"nav-link text-primary",value:"settings"},"Settings")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("p",{onClick:this.tabSelect,className:"nav-link text-primary",value:"admin"},"Admin Settings"))))}}]),t}(n.Component),v=a(27),N=function(e){var t=e.loading,a=e.errorMsg,n=e.color;return r.a.createElement("div",{className:"container pt-2"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement(v.ClipLoader,{loading:t,color:n}),r.a.createElement("h6",{className:"text-danger text-monospace"},a)))},b=a(15),S=a.n(b),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onEditNotesBtn=function(){if(a.state.editNoteMode){var e=document.querySelector("#notes").value;a.updateItem({notes:e}).then(function(){a.setState({editNoteMode:!1})})}else a.setState({editNoteMode:!0})},a.onActiveSwitch=function(e){a.updateItem({active:e})},a.onRebootBtn=function(){a.setState({loading:!0,errorMsg:""});var e=a.state.item._id,t={method:"POST",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/reboot/".concat(e),t).then(function(e){if(200!==e.status)throw new Error;a.setState({loading:!1,errorMsg:"Reboot successful!"})}).catch(function(e){a.setState({loading:!1,errorMsg:"Error:  Unable to reboot server"})})},a.onDeleteBtn=function(){a.setState({loading:!0,errorMsg:""});var e=a.state.item._id,t={method:"DELETE",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/item/".concat(e),t).then(function(e){if(200!==e.status)throw new Error;a.setState({loading:!1}),a.props.deleteItem()}).catch(function(e){a.setState({loading:!1,errorMsg:"Error:  Unable to delete item"})})},a.openDeleteModal=function(){a.setState({deleteModal:!0})},a.closeDeleteModal=function(){a.setState({deleteModal:!1})},a.updateItem=function(e){var t=a.state.item;a.setState({loading:!0,errorMsg:""});var n=t._id,r={method:"PATCH",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken"),"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch(E.a+"/item/".concat(n),r).then(function(e){if(200!==e.status)throw new Error;return e.json()}).then(function(e){a.setState({loading:!1,item:e.item}),a.props.updateChanges(e.item)}).catch(function(e){a.setState({loading:!1,errorMsg:"Error: Unable to update server"})})},a.state={editNoteMode:!1,loading:!1,errorMsg:"",deleteModal:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this.props.item;this.setState({item:e})}},{key:"render",value:function(){var e=this.state.item;return r.a.createElement("div",null,r.a.createElement(d.a,{open:!0,onClose:this.props.onClose,classNames:{modal:"card p-5 server-modal"},center:!0},r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("h2",{className:"col-9 card-title"},e.name),r.a.createElement("div",{className:"col-3"},r.a.createElement(S.a,{onChange:this.onActiveSwitch,checked:e.active,"aria-label":"on/off-switch"}))),r.a.createElement("h6",null,"IP Address: ",e.IP_address),r.a.createElement("h6",null,"Stack Type:  ",e.stackType),r.a.createElement("h6",null,"Notes:"),this.state.editNoteMode?r.a.createElement("textarea",{id:"notes",className:"border p-3 float-clear w-100",defaultValue:e.notes}):r.a.createElement("p",{className:"border p-3 font-italic"},e.notes),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.onEditNotesBtn,className:"btn btn-primary float-right"},this.state.editNoteMode?"Submit":"Edit Notes"),r.a.createElement("div",{className:"float-none",style:{marginTop:"80px"}},r.a.createElement("button",{onClick:this.onRebootBtn,className:"btn btn-warning"},"Reboot"),"\xa0\xa0\xa0\xa0",r.a.createElement("button",{onClick:this.openDeleteModal,className:"btn btn-danger"},"Delete Item"))),r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg})),r.a.createElement(d.a,{open:this.state.deleteModal,onClose:this.closeDeleteModal,classNames:{modal:"rounded"}},r.a.createElement("br",null),r.a.createElement("h5",null,"Are you sure you want to delete?"),r.a.createElement("button",{onClick:this.onDeleteBtn,className:"btn btn-danger"},"Delete"),"\xa0\xa0\xa0\xa0",r.a.createElement("button",{onClick:this.closeDeleteModal,className:"btn btn-secondary"},"Cancel")))}}]),t}(r.a.Component),C=(a(16),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).retrieveInventory=function(){a.setState({loading:!0,errorMsg:""});var e={method:"GET",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/item",e).then(function(e){if(200===e.status)return e.json();throw new Error}).then(function(e){var t=e.items;if(0===t.length)return a.setState({loading:!1,errorMsg:"No items found"});a.setState({itemList:t,loading:!1})}).catch(function(e){a.setState({loading:!1,errorMsg:"Unable to get Inventory"})})},a.onNewServerButton=function(){if(""===a.state.NSName||""===a.state.NSStack)return a.setState({errorMsg:"Please select name and stack type"});a.setState({loading:!0,errorMsg:""});var e=a.state.NSName,t=a.state.NSNotes,n=a.state.NSStack,r=localStorage.getItem("ErosToken"),o={method:"POST",mode:"cors",body:JSON.stringify({name:e,stackType:n,notes:t}),headers:{"x-auth":r,"Content-Type":"application/json"}};fetch(E.a+"/item",o).then(function(e){if(200===e.status)return e.json();throw new Error}).then(function(e){var t=e.item,n=a.state.itemList;n.push(t),a.setState({loading:!1,itemList:n,createModalOpen:!1})}).catch(function(e){a.setState({errorMsg:"Unable to create server",loading:!1})})},a.openEditModal=function(e){a.setState({editModalItem:e})},a.onCloseEditModal=function(){a.setState({editModalItem:null})},a.onOpenCreateModal=function(){a.setState({createModalOpen:!0,NSName:"",NSStack:"",NSNotes:""})},a.onCloseCreateModal=function(){a.setState({createModalOpen:!1})},a.onNSNameChange=function(e){a.setState({NSName:e.target.value})},a.onNSStackChange=function(e){a.setState({NSStack:e.target.value})},a.onNSNotesChange=function(e){a.setState({NSNotes:e.target.value})},a.updateChanges=function(e){var t=a.state.itemList;t=t.map(function(t){return t._id===e._id?e:t}),a.setState({itemList:t})},a.deleteItem=function(){var e=a.state.editModalItem._id,t=a.state.itemList;t=t.filter(function(t){return t._id!==e}),a.setState({itemList:t,editModalItem:null})},a.state={itemList:null,editModalItem:null,NSName:"",NSStack:"",NSNotes:"",createModalOpen:!1,switchChecked:!0,errorMsg:"",loading:!0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"rounded-bottom"},r.a.createElement("table",{className:"table table-light table-hover mb-0"},r.a.createElement("thead",{className:"thead-dark"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"#"),r.a.createElement("th",{scope:"col"},"Name"),r.a.createElement("th",{scope:"col"},"IP Address"),r.a.createElement("th",{scope:"col"},"Status"))),r.a.createElement("tbody",null,null===this.state.itemList?r.a.createElement("tr",null):this.state.itemList.map(function(t,a){return r.a.createElement("tr",{style:{cursor:"pointer"},key:a+1,onClick:function(){return e.openEditModal(t)}},r.a.createElement("th",{scope:"row"},a+1),r.a.createElement("td",null,e.state.itemList[a].name),r.a.createElement("td",null,e.state.itemList[a].IP_address),e.state.itemList[a].active?r.a.createElement("td",{className:"text-success"},"Active"):r.a.createElement("td",{className:"text-danger"},"Inactive"))}))),r.a.createElement("div",{className:"bg-light p-2 d-flex justify-content-center"},r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg})),r.a.createElement("div",{className:"bg-light p-2 d-flex justify-content-center"},r.a.createElement("button",{className:"btn btn-success m-auto",onClick:this.onOpenCreateModal},"New Server")),r.a.createElement(d.a,{open:this.state.createModalOpen,onClose:this.onCloseCreateModal,classNames:{modal:"card p-5 server-modal"},center:!0},r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("h2",{className:"col-8 card-title"},"New Server")),r.a.createElement("div",{className:"container border"},r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Name:"),r.a.createElement("input",{className:"col-4",type:"text",onChange:this.onNSNameChange})),r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Select Stack Type:"),r.a.createElement("select",{onChange:this.onNSStackChange},r.a.createElement("option",{value:""},"-"),r.a.createElement("option",{value:"LAMP"},"LAMP"),r.a.createElement("option",{value:"MEAN"},"MEAN"),r.a.createElement("option",{value:"Ruby"},"Ruby"),r.a.createElement("option",{value:"Django"},"Django"))),r.a.createElement("div",{className:"row pt-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Notes:")),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("div",{className:"col-10"},r.a.createElement("textarea",{className:"w-100",onChange:this.onNSNotesChange})))),r.a.createElement("div",{className:"d-flex justify-content-center",style:{marginTop:"40px"}},r.a.createElement("button",{className:"btn btn-success",onClick:this.onNewServerButton},"Create Server")),r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg}))),null===this.state.editModalItem?r.a.createElement("div",null):r.a.createElement(w,{item:this.state.editModalItem,onClose:this.onCloseEditModal,updateChanges:this.updateChanges,deleteItem:this.deleteItem}))}},{key:"componentDidMount",value:function(){this.retrieveInventory()}}]),t}(n.Component)),M=(a(77),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).changeBackground=function(e){document.querySelector("body").style.backgroundColor=e},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"bg-light p-5 container rounded-bottom"},r.a.createElement("div",{className:"row"},r.a.createElement("h5",{className:"col-4"},"Background Color"),r.a.createElement("div",{className:"col-4"},r.a.createElement("button",{className:"color-button",onClick:function(){return e.changeBackground("#275E88")},style:{backgroundColor:"#275E88"}},"\xa0"),r.a.createElement("button",{className:"color-button",onClick:function(){return e.changeBackground("#20a327")},style:{backgroundColor:"#20a327"}},"\xa0"),r.a.createElement("button",{className:"color-button",onClick:function(){return e.changeBackground("#cc8c2c")},style:{backgroundColor:"#cc8c2c"}},"\xa0"),r.a.createElement("button",{className:"color-button",onClick:function(){return e.changeBackground("#7b40c4")},style:{backgroundColor:"#7b40c4"}},"\xa0"))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("h5",null,"More settings to come later!"))))}}]),t}(n.Component)),y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onPasswordChange=function(e){a.setState({password:e.target.value})},a.onConfirmPwChange=function(e){a.setState({confirmPw:e.target.value})},a.onChangePwBtn=function(){var e=a.state,t=e.password,n=e.confirmPw;return""===t||""===n?a.setState({errorMsg:"Please enter new password and confirm"}):t!==n?a.setState({errorMsg:"Passwords do not match"}):void a.updateUser({password:t}).then(function(){return a.setState({errorMsg:"Password changed"})})},a.onOpenDeleteModal=function(){a.setState({deleteModal:!0})},a.onCloseDeleteModal=function(){a.setState({deleteModal:!1})},a.onDeleteBtn=function(){a.setState({loading:!0,errorMsg:""});var e=a.state.user._id,t={method:"DELETE",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/user/".concat(e),t).then(function(e){if(200!==e.status)throw new Error;a.setState({loading:!1}),a.props.deleteUser()}).catch(function(e){a.setState({loading:!1,errorMsg:"Error:  Unable to delete user"})})},a.onAdminSwitch=function(e){a.updateUser({superuser:e})},a.updateUser=function(e){var t=a.state.user;a.setState({loading:!0,errorMsg:""});var n=t._id,r={method:"PATCH",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken"),"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch(E.a+"/user/".concat(n),r).then(function(e){if(200!==e.status)throw new Error;return e.json()}).then(function(e){a.setState({loading:!1,user:e.user}),a.props.updateChanges(e.user)}).catch(function(e){a.setState({loading:!1,errorMsg:"Error: Unable to update user"})})},a.state={loading:!1,errorMsg:"",deleteModal:!1,password:"",confirmPw:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this.props.user;this.setState({user:e})}},{key:"render",value:function(){var e=this.state.user;return r.a.createElement("div",null,r.a.createElement(d.a,{open:!0,onClose:this.props.onClose,classNames:{modal:"card p-5 server-modal"},center:!0},r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("h2",{className:"col-8 card-title"},e.username),r.a.createElement("div",{className:"col-4"},r.a.createElement("label",{htmlFor:"admin-switch"},r.a.createElement("span",{style:{fontSize:"1.4em"}},"Admin\xa0"),r.a.createElement(S.a,{onChange:this.onAdminSwitch,checked:e.superuser,id:"admin-switch"})))),r.a.createElement("h6",null,"Last Login:  ",e.lastLogin),r.a.createElement("br",null),r.a.createElement("h6",null,"Change Password:"),r.a.createElement("div",{className:"container border"},r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Enter New Password:"),r.a.createElement("input",{className:"col-4",type:"password",onChange:this.onPasswordChange})),r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Confirm Password:"),r.a.createElement("input",{className:"col-4",type:"password",onChange:this.onConfirmPwChange})),r.a.createElement("div",{className:"row mb-2"},r.a.createElement("div",{className:"col-7"}),r.a.createElement("button",{className:"btn btn-info",onClick:this.onChangePwBtn},"Change Pasword"))),r.a.createElement("div",{className:"float-none",style:{marginTop:"40px"}},r.a.createElement("button",{className:"btn btn-danger",onClick:this.onOpenDeleteModal},"Delete User")),r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg}))),r.a.createElement(d.a,{open:this.state.deleteModal,onClose:this.onCloseDeleteModal,classNames:{modal:"rounded"}},r.a.createElement("br",null),r.a.createElement("h5",null,"Are you sure you want to delete?"),r.a.createElement("button",{onClick:this.onDeleteBtn,className:"btn btn-danger"},"Delete"),"\xa0\xa0\xa0\xa0",r.a.createElement("button",{onClick:this.closeDeleteModal,className:"btn btn-secondary"},"Cancel")))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).componentDidMount=function(){a.retrieveUsers()},a.retrieveUsers=function(){a.setState({loading:!0,errorMsg:""});var e={method:"GET",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken")}};fetch(E.a+"/user",e).then(function(e){if(200===e.status)return e.json();if(401===e.status)return a.setState({superuser:!1});throw new Error}).then(function(e){var t=e.users;if(0===t.length)return a.setState({loading:!1,errorMsg:"No items found"});a.setState({users:t,loading:!1})}).catch(function(e){a.setState({loading:!1,errorMsg:"Unable to get user data"})})},a.onOpenEditModal=function(e){a.setState({editUser:e})},a.onCloseEditModal=function(){a.setState({editUser:null})},a.onOpenCreateModal=function(){a.setState({createModalOpen:!0})},a.onCloseCreateModal=function(){a.setState({createModalOpen:!1})},a.toggleSwitch=function(e){a.setState({switchChecked:e})},a.onNewUserNameChange=function(e){a.setState({newUserUsername:e.target.value})},a.onNewUserPasswordChange=function(e){a.setState({newUserPassword:e.target.value})},a.onConfirmPasswordChange=function(e){a.setState({confirmPassword:e.target.value})},a.onNewUserBtn=function(){var e=a.state,t=e.newUserUsername,n=e.newUserPassword,r=e.confirmPassword;if(""===n||""===t||""===r)return a.setState({errorMsg:"Please enter a username and password"});if(n!==r)return a.setState({errorMsg:"Passwords do not match"});a.setState({loading:!0,errorMsg:""});var o={username:t,password:n,superuser:document.querySelector("#su-check").checked},s={method:"POST",mode:"cors",headers:{"x-auth":localStorage.getItem("ErosToken"),"Content-Type":"application/json"},body:JSON.stringify(o)};return fetch(E.a+"/user",s).then(function(e){if(200===e.status)return e.json()}).then(function(e){var t=e.user,n=a.state.users;n.push(t),a.setState({users:n,loading:!1,createModalOpen:!1})}).catch(function(e){a.setState({loading:!1,errorMsg:"Error: Unable to create user"})})},a.updateChanges=function(e){var t=a.state.users;t=t.map(function(t){return t._id===e._id?e:t}),a.setState({users:t})},a.deleteUser=function(){var e=a.state.editUser._id,t=a.state.users;t=t.filter(function(t){return t._id!==e}),a.setState({users:t,editUser:null})},a.state={users:null,createModalOpen:!1,switchChecked:!0,loading:!1,errorMsg:"",newUserUsername:"",newUserPassword:"",confirmPassword:"",editUser:null,superuser:!0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return this.state.superuser?r.a.createElement("div",null,r.a.createElement("table",{className:"table table-light table-hover mb-0"},r.a.createElement("thead",{className:"thead-dark"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"#"),r.a.createElement("th",{scope:"col"},"Username"),r.a.createElement("th",{scope:"col"},"Administrator"),r.a.createElement("th",{scope:"col"},"Last Login"))),r.a.createElement("tbody",null,null===this.state.users?r.a.createElement("tr",null):this.state.users.map(function(t,a){return r.a.createElement("tr",{style:{cursor:"pointer"},key:a+1,onClick:function(){return e.onOpenEditModal(t)}},r.a.createElement("th",{scope:"row"},a+1),r.a.createElement("td",null,t.username),r.a.createElement("td",null,t.superuser?"Yes":"No"),r.a.createElement("td",null,t.lastLogin))}))),r.a.createElement("div",{className:"bg-light p-2 d-flex justify-content-center"},r.a.createElement("button",{onClick:this.onOpenCreateModal,className:"btn btn-success m-auto"},"New User")),r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg}),null===this.state.editUser?r.a.createElement("div",null):r.a.createElement(y,{user:this.state.editUser,onClose:this.onCloseEditModal,updateChanges:this.updateChanges,deleteUser:this.deleteUser}),r.a.createElement(d.a,{open:this.state.createModalOpen,onClose:this.onCloseCreateModal,classNames:{modal:"card p-5 server-modal"},center:!0},r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("h2",{className:"col-8 card-title"},"Create New User")),r.a.createElement("div",{className:"container border"},r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Enter Username:"),r.a.createElement("input",{className:"col-4",type:"text",onChange:this.onNewUserNameChange})),r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Enter Password:"),r.a.createElement("input",{className:"col-4",type:"password",onChange:this.onNewUserPasswordChange})),r.a.createElement("div",{className:"row py-2"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("p",{className:"col-6"},"Confirm Password:"),r.a.createElement("input",{className:"col-4",type:"password",onChange:this.onConfirmPasswordChange})),r.a.createElement("div",{className:"row my-2"},r.a.createElement("div",{className:"col-7"}),r.a.createElement("p",null,r.a.createElement("input",{id:"su-check",type:"checkbox"}),"\xa0Administrator"))),r.a.createElement("div",{className:"d-flex justify-content-center",style:{marginTop:"40px"}},r.a.createElement("button",{className:"btn btn-success",onClick:this.onNewUserBtn},"Create User")),r.a.createElement("div",{className:"bg-light p-2 d-flex justify-content-center"},r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg}))))):r.a.createElement("div",{className:"bg-light container p-5 text-center rounded-bottom"},r.a.createElement("h5",null,"You must be an administrator to access these settings"))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).changeRoute=function(e){a.setState({route:e})},a.state={route:"inventory"},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container mt-9",style:{marginTop:"150px"}},r.a.createElement(f,{changeRoute:this.changeRoute}),"inventory"===this.state.route?r.a.createElement(C,null):"settings"===this.state.route?r.a.createElement(M,null):r.a.createElement(k,{superuser:!0}))}}]),t}(n.Component),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).onCloseModal=function(){a.setState({modalOpen:!1})},a.sendModalMessage=function(e){a.setState({modalOpen:!0,modalMsg:e})},a.state={modalOpen:!1,modalMsg:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"w-100"},r.a.createElement(p,{logout:this.props.logout}),r.a.createElement(O,null),r.a.createElement(d.a,{open:this.state.modalOpen,onClose:this.onCloseModal,classNames:{modal:"card p-5 server-modal"},center:!0},r.a.createElement("div",null,r.a.createElement("h3",null,"Uh oh!"),r.a.createElement("h5",null,this.state.modalMsg))))}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this))).onEnterUsername=function(e){a.setState({username:e.target.value})},a.onEnterPassword=function(e){a.setState({password:e.target.value})},a.handleKeyPress=function(e){13===e.charCode&&a.onLoginButton()},a.onLoginButton=function(){var e=a.state,t=e.username,n=e.password,r={method:"POST",body:JSON.stringify({username:t,password:n}),mode:"cors",headers:{"Content-Type":"application/json"}};a.setState({loading:!0,errorMsg:""},function(){fetch(E.a+"/login",r).then(function(e){if(200===e.status){var t=e.headers.get("x-auth");localStorage.setItem("ErosToken",t),a.setState({loading:!1}),a.props.login()}else a.setState({loading:!1,errorMsg:"Username or password is incorrect"})}).catch(function(e){a.setState({loading:!1,errorMsg:"Whoops!  Something went wrong"})})})},a.state={loading:!1,username:"",password:"",errorMsg:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"w-100",style:{position:"fixed",top:"180px"}},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card m-auto rounded",style:{backgroundColor:"#0F0E08",maxWidth:"500px"}},r.a.createElement("div",{className:"d-inline-flex mx-auto my-4"},r.a.createElement("img",{src:g.a,height:"100px",alt:"Eros logo"}),r.a.createElement("h1",{className:"text-light",style:{fontSize:"77px"}},"EROS")),r.a.createElement("div",{className:"container px-5 pb-5 w-75"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"text-light",htmlFor:"username-input"},"Username"),r.a.createElement("input",{onChange:this.onEnterUsername,onKeyPress:this.handleKeyPress,type:"email",className:"form-control",id:"username-input",placeholder:"Username"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"text-light",htmlFor:"password-input"},"Password"),r.a.createElement("input",{onChange:this.onEnterPassword,onKeyPress:this.handleKeyPress,type:"password",className:"form-control",id:"password-input",placeholder:"Password"})),r.a.createElement("button",{onClick:this.onLoginButton,className:"btn btn-danger"},"Login"),r.a.createElement("div",{className:"container pt-2"},r.a.createElement(N,{loading:this.state.loading,errorMsg:this.state.errorMsg,color:"#EEE"}))))))}}]),t}(n.Component),P=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).login=function(){e.setState({route:"home"})},e.logout=function(){e.setState({route:"login"})},e.state={route:"login"},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return"home"===this.state.route?r.a.createElement(j,{logout:this.logout}):r.a.createElement(x,{login:this.login})}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e){e.exports={a:"https://eros-client.herokuapp.com"}}},[[28,2,1]]]);
//# sourceMappingURL=main.fbce33ce.chunk.js.map