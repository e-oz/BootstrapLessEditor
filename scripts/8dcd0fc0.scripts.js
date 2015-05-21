"use strict";angular.module("CSSEditorApp",["ngRoute"]),angular.module("CSSEditorApp").controller("MainCtrl",["$scope","$http","$q","$timeout",function(a,b,c,d){a.data={less_variables:"",less_theme:"",css:""},a.ctrl={auto:!1},a.less_cache="",a.transform=function(){var b=new less.Parser({paths:["./styles/tbs/less/"]}),c="";a.prefetch(function(d){d&&(c=d),b.parse(c+a.data.less_variables+a.data.less_theme,function(b,c){return b?(console.log(b),!1):($("#html").find("style").remove(),(a.data.css=c.toCSS())&&$("<style scoped>"+a.data.css+"</style>").appendTo("#html"),!0)})})},a.$watch("data.less_variables",function(b){return angular.isUndefined(b)?!0:a.ctrl.auto?(d(function(){b===a.data.less_variables&&a.transform()},400),!0):!1}),a.$watch("data.less_theme",function(b){return angular.isUndefined(b)?!0:a.ctrl.auto?(d(function(){b===a.data.less_theme&&a.transform()},400),!0):!1}),a.pasteVariables=function(){b.get("./styles/tbs/less/variables.less").success(function(b){a.data.less_variables+="\n"+b+"\n"})},a.prefetch=function(d){if(""!=a.less_cache)return d&&d(a.less_cache),!1;var e=[];e.push("variables.less"),e.push("mixins.less"),e.push("normalize.less"),e.push("print.less"),e.push("scaffolding.less"),e.push("type.less"),e.push("code.less"),e.push("grid.less"),e.push("tables.less"),e.push("forms.less"),e.push("buttons.less"),e.push("component-animations.less"),e.push("glyphicons.less"),e.push("dropdowns.less"),e.push("button-groups.less"),e.push("input-groups.less"),e.push("navs.less"),e.push("navbar.less"),e.push("breadcrumbs.less"),e.push("pagination.less"),e.push("pager.less"),e.push("labels.less"),e.push("badges.less"),e.push("jumbotron.less"),e.push("thumbnails.less"),e.push("alerts.less"),e.push("progress-bars.less"),e.push("media.less"),e.push("list-group.less"),e.push("panels.less"),e.push("wells.less"),e.push("close.less"),e.push("modals.less"),e.push("tooltip.less"),e.push("popovers.less"),e.push("carousel.less"),e.push("utilities.less"),e.push("responsive-utilities.less"),a.less_cache="";for(var f=[],g=0;g<e.length;++g)f.push(b.get("./styles/tbs/less/"+e[g]));return c.all(f).then(function(b){for(var c=0;c<b.length;++c)a.less_cache+=b[c].data+"\n";d&&d(a.less_cache)}),!0}}]);