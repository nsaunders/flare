(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[560],{22031:function(e,n,t){"use strict";var r=t(2784),i=t(16116),a=t(19453),o=t(52322),c=a.ZP.div.withConfig({displayName:"Code__Surface",componentId:"sc-unxzzz-0"})(["background:",";border-radius:4px;padding:16px;overflow:auto;& > pre{margin:0;}"],function(e){return(0,e.theme.fg)(.05)}),l=a.ZP.code.withConfig({displayName:"Code__InnerCode",componentId:"sc-unxzzz-1"})(['font-family:"Courier Prime";font-size:14px;line-height:20px;color:',";.token{&.function{color:",";}&.string,&.number{color:",";}&.punctuation,&.operator,&.keyword{color:",";}&.attr,&.attr-name{color:",";}&.class-name,&.maybe-class-name{color:",";}},"],function(e){return(0,e.theme.fg)(.5)},function(e){return(0,e.theme.fg)(.7)},function(e){return(0,e.theme.fg)(.8)},function(e){return(0,e.theme.fg)(.3)},function(e){return(0,e.theme.fg)(.6)},function(e){return(0,e.theme.fg)(.65)}),s=(0,r.forwardRef)(function(e,n){var t=e.children,r=e.className,a=t.split("\n").filter(function(e,n,t){var r=t.length;return e.trim()||n&&n!==r-1}).map(function(e){var n=e.match(/^\s+/);return n?n[0].length:0}).reduce(function(e,n){return Math.min(e,n)},Number.MAX_VALUE),s=r&&r.replace(/^language\-/,""),u=["javascript","typescript","jsx"].includes(s||"")?s:"typescript";return(0,o.jsx)(c,{ref:n,children:(0,o.jsx)(i.Z,{language:u,useInlineStyles:!1,CodeTag:l,codeTagProps:{style:{}},children:t.split("\n").reduce(function(e,n,t,r){return n.trim()||e.length&&r.slice(t).filter(function(e){return e.trim()}).length?e.concat(n):e},[]).map(function(e){return e.substring(a)}).join("\n")})})});s.displayName="Code",n.Z=s},23010:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(95235),i=t(82269),a=t(28394),o=t(53215),c=t(52322),l=["children"];function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){var n=e.children,t=(0,i.Z)(e,l);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a.Z,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach(function(n){(0,r.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}({},t)),(0,c.jsx)(o.Z,{children:n})]})}},53215:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var r=t(95235),i=t(82269),a=t(45392),o=t(22031),c=t(19453),l=t(52322),s=["children","ref"];function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach(function(n){(0,r.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var d=c.ZP.div.withConfig({displayName:"DocBase__ContentWrap",componentId:"sc-7m0tv8-0"})(['max-width:900px;margin-right:auto;margin-left:auto;padding-top:16px;padding-right:32px;padding-bottom:16px;padding-left:32px;font-family:"Lato";font-size:16px;& > h1:first-child{margin-top:0;}& hr + h2:not([class]){margin-top:-8px;}& hr:not([class]){height:0;border:none;border-bottom:1px solid ',";margin-top:24px;margin-bottom:24px;}& p:not([class]){line-height:1.5;}& a:not([class]){&:link,&:visited{color:",';}&:hover,&:focus,&:active{color:inherit;}}& code{font-family:"Courier Prime";}& table th,& table td{text-align:start;padding-top:2px;padding-right:8px;padding-bottom:2px;padding-left:8px;}& table{margin-top:-2px;margin-right:-8px;margin-bottom:-2px;margin-left:-8px;}'],function(e){return(0,e.theme.fg)(.05)},function(e){return(0,e.theme.fg)(.75)}),f={code:function(e){var n=e.children,t=e.ref,r=(0,i.Z)(e,s);return"string"==typeof n&&n.includes("\n")?(0,l.jsx)(o.Z,p(p({ref:t},r),{},{children:n})):(0,l.jsx)("code",p(p({ref:t},r),{},{children:n}))}};function m(e){var n=e.children;return(0,l.jsx)(a.Zo,{components:f,children:(0,l.jsx)(d,{children:n})})}},28394:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(5632),i=t(97729),a=t.n(i),o=t(52322),c="Flare";function l(e){var n=e.title,t=e.description,i=(0,r.useRouter)().pathname,l=[n,c].filter(function(e){return e}).join(" - "),s="".concat("https://flare.js.org").concat(i);return(0,o.jsxs)(a(),{children:[(0,o.jsx)("title",{children:l}),(0,o.jsx)("meta",{property:"description",content:t}),(0,o.jsx)("meta",{property:"og:title",content:l}),(0,o.jsx)("meta",{property:"og:description",content:t}),(0,o.jsx)("meta",{property:"og:image",content:"https://repository-images.githubusercontent.com/396804402/b18f1b49-b3d8-4360-a709-bf71857c4cd4"}),(0,o.jsx)("meta",{property:"og:url",content:s}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,o.jsx)("meta",{property:"og:site_name",content:c}),(0,o.jsx)("meta",{name:"twitter:image:alt",content:"".concat(c," logo")})]})}},22688:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return eD}});var r,i,a,o,c,l,s,u,p=t(95235),d=t(82269),f=t(2784),m=function(){return(m=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},h=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>n.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>n.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]]);return t};function g(e){return function(n){return{_tag:"Flare",make:function(){var t=n.make(),r=e.make(),i=t.render,a=r.render;return{_tag:"Flare",query:function(){return t.query()(r.query())},render:function(e){var n=e.onChange;return f.createElement(f.Fragment,null,f.createElement(i,{onChange:n}),f.createElement(a,{onChange:n}))}}}}}}function b(e){return function(n){return{_tag:"Flare",make:function(){var t=n.make();return{query:function(){return e(t.query())},render:t.render}}}}}function x(e){return{_tag:"Flare",make:function(){return{query:function(){return e},render:function(){return null}}}}}function y(e){return function(n){var t=n.initial,r=h(n,["initial"]);return{_tag:"Flare",make:function(){var n=t;return{query:function(){return n},render:function(t){var i=t.onChange;return f.createElement(e,m({value:n,onChange:function(e){n=e,i()}},r))}}}}}}var v={container:"flare-field__container",label:"flare-field__label",value:"flare-field__value"},j={Button:function(e){return f.createElement("button",m({},e))},Checkbox:function(e){var n=e.label,t=e.checked,r=e.onCheckedChange;return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("input",{type:"checkbox",checked:t,onChange:function(e){r(e.target.checked)}})))},ComboBox:function(e){var n=e.label,t=e.onValueChange,r=e.options,i=e.value;return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("select",{value:i,onChange:function(e){t(e.target.value)}},r.map(function(e){return f.createElement("option",{key:e,value:e},e)}))))},ResizableList:function(e){var n=e.children,t=e.addButton;return f.createElement("div",null,n,t)},ResizableListItem:function(e){var n=e.addButton,t=e.children,r=e.removeButton;return f.createElement("div",{className:"flare-resizable-list-item"},f.createElement("div",null,n),f.createElement("div",null,t),f.createElement("div",null,r))},RadioGroup:function(e){var n=e.label,t=e.onValueChange,r=e.options,i=e.value,a=(0,f.useRef)(Math.round(1e9*Math.random()).toString(36));return f.createElement("div",{className:v.container,role:"radiogroup","aria-labelledby":"".concat(a.current,"Label")},f.createElement("span",{className:v.label,id:"".concat(a.current,"Label")},n),f.createElement("div",{className:v.value},r.map(function(e){return f.createElement("label",{key:e},f.createElement("input",{type:"radio",name:a.current,value:e,checked:i===e,onChange:function(n){n.target.checked&&t(e)}})," ",e)})))},Slider:function(e){var n=e.label,t=e.onValueChange,r=h(e,["label","onValueChange"]);return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("input",m({type:"range",onChange:function(e){for(var n=e.target.value,r=parseFloat(n);!isNaN(r);)return t(r)}},r))))},SpinButton:function(e){var n=e.label,t=e.onValueChange,r=h(e,["label","onValueChange"]);return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("input",m({type:"number",onChange:function(e){for(var n=e.target.value,r=parseFloat(n);!isNaN(r);)return t(r)}},r))))},Switch:function(e){var n=e.label,t=e.checked,r=e.onCheckedChange;return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("input",{role:"switch",type:"checkbox",checked:t,onChange:function(e){r(e.target.checked)}})))},TextBox:function(e){var n=e.label,t=e.value,r=e.onValueChange;return f.createElement("label",{className:v.container},f.createElement("span",{className:v.label},n),f.createElement("div",{className:v.value},f.createElement("input",{type:"text",value:t,onChange:function(e){r(e.target.value)}})))}},w=(0,f.createContext)(j);function O(e){var n=e.flare,t=e.handler,r=e.components,i=(0,f.useMemo)(function(){return n.make()},[n]),a=(0,f.useState)(i.query()),o=a[0],c=a[1];return(0,f.useEffect)(function(){c(i.query())},[i]),(0,f.useEffect)(function(){t(o)},[t,o]),f.createElement(w.Provider,{value:m(m({},j),r)},i.render({onChange:function(){c(i.query())}}))}function C(e){var n=e.optionToString,t=h(e,["optionToString"]),r=t.options.map(n||function(e){return e}),i=y(function(e){var n=e.onChange,t=h(e,["onChange"]),r=(0,f.useContext)(w).ComboBox;return f.createElement(r,m({onValueChange:n},t))});return b(function(e){return t.options[r.indexOf(e)]})(i(m(m({},t),{initial:n?n(t.initial):t.initial,options:r})))}var k=y(function(e){var n=e.min,t=e.max,r=e.onChange,i=h(e,["min","max","onChange"]),a=(0,f.useContext)(w).Slider;return f.createElement(a,m({min:n,max:t,onValueChange:function(e){var i=!n&&0!==n||e>=n,a=!t&&0!==t||e<=t;i&&a&&r(e)}},i))}),E=y(function(e){var n=e.min,t=e.max,r=e.onChange,i=h(e,["min","max","onChange"]),a=(0,f.useContext)(w).SpinButton;return f.createElement(a,m({min:n,max:t,onValueChange:function(e){var i=!n&&0!==n||e>=n,a=!t&&0!==t||e<=t;i&&a&&r(e)}},i))}),P=function(e){var n=(0,f.useContext)(w).ResizableList;return f.createElement(n,m({},e))},_=function(e){var n=(0,f.useContext)(w).ResizableListItem;return f.createElement(n,m({},e))},N=function(e){var n=(0,f.useContext)(w).Button;return f.createElement(n,m({},e))};"\n  ".concat("\n  .flare-field__container {\n    display: block;\n  }\n  .flare-field__container + .flare-field__container {\n    margin-top: 8px;\n  }\n\n  .flare-field__label {\n    display: inline-block;\n    min-width: 150px;\n  }\n  .flare-field__label:empty {\n    display: none;\n  }\n\n  .flare-field__value {\n    display: inline-block;\n  }\n","\n  ").concat("\n  .flare-resizable-list-item {\n    display: flex;\n    align-items: center;\n  }\n","\n");var S=t(42275),Z=t(8207),B=t(23010),z=t(20406),D=t(67113),I=t(28526),L=t.n(I),F=t(68511),q=t(22031),R=t(19453),V=t(52322),M=["className"];function T(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function $(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?T(Object(t),!0).forEach(function(n){(0,p.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):T(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var G=function(e){var n=e.theme.fg;return"inset 0 0 0 1px ".concat(n(.1))},A=R.ZP.div.withConfig({displayName:"Input__Wrap",componentId:"sc-1gjkmqx-0"})(["position:relative;border-radius:4px;display:inline-flex;padding-top:2px;padding-right:6px;padding-bottom:2px;padding-left:6px;background:",";box-shadow:",";&:focus-within{box-shadow:",",0 0 1px 1px ",";}"],function(e){return(0,e.theme.fg)(.05)},G,G,function(e){return(0,e.theme.fg)(.1)}),W=R.ZP.div.withConfig({displayName:"Input__Arrow",componentId:"sc-1gjkmqx-1"})(["position:absolute;right:8px;top:calc(50% - 2px);width:0;height:0;border-color:transparent;border-style:solid;border-width:4px;border-top-color:",";border-bottom:none;"],function(e){return(0,e.theme.fg)()}),H=R.ZP.input.withConfig({displayName:"Input__Control",componentId:"sc-1gjkmqx-2"})(["appearance:none;outline:none;margin:0;padding:0;background:transparent;border:none;color:",';font-family:"Lato";font-size:14px;line-height:20px;',""],function(e){return(0,e.theme.fg)()},function(e){return"select"===e.as&&"padding-right: 24px;"}),X=(0,f.forwardRef)(function(e,n){var t=e.className,r=(0,d.Z)(e,M);return(0,V.jsxs)(A,{className:t,children:[(0,V.jsx)(H,$($({as:"input"},r),{},{ref:n})),"select"===r.as&&(0,V.jsx)(W,{})]})});function U(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}var J="auto",Y="\n  width: ".concat(J,";\n  height: 4px;\n  border: none;\n  border-radius: 9999px;\n"),K=function(e){var n=e.theme.fg;return"\n  background: ".concat(n(.05),";\n")},Q=function(e){var n=e.theme.fg;return"\n  background: ".concat(n(.1),";\n")},ee=function(e){var n=e.theme.fg;return"\n  border: none;\n  width: 16px;\n  height: 16px;\n  border-radius: 9999px;\n  background: ".concat(n(),";\n")},en=function(e){var n=e.theme.fg;return"\n  box-shadow: 0 0 2px 1px ".concat(n(.5),";\n")},et=R.ZP.input.withConfig({displayName:"Slider__SliderImpl",componentId:"sc-1h2kf8k-0"})(["-webkit-appearance:none;outline:none;width:",";background:transparent;&::-webkit-slider-runnable-track{","}&:focus::-webkit-slider-runnable-track{","}&:not(:focus)::-webkit-slider-runnable-track{","}&::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-6px;","}&:focus::-webkit-slider-thumb{","}&::-moz-range-track{","}&::-moz-range-thumb{","}&:focus::-moz-range-thumb{","}&:focus::-moz-range-track{","}&:not(:focus)::-moz-range-track{","}"],J,Y,Q,K,ee,en,Y,ee,en,Q,K),er=function(e){return(0,V.jsx)(et,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?U(Object(t),!0).forEach(function(n){(0,p.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):U(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}({type:"range"},e))},ei=t(71673),ea=(0,ei.Z)("CloseIcon",(0,V.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),eo=(0,ei.Z)("EditIcon",(0,V.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})),ec=(0,ei.Z)("SyncIcon",(0,V.jsx)("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})),el=["children"],es=["label","onValueChange"],eu=["label","onValueChange"];function ep(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function ed(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?ep(Object(t),!0).forEach(function(n){(0,p.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ep(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var ef=(0,R.F4)(["from{transform:rotate(0);}to{transform:rotate(360deg);}"]),em=R.ZP.button.withConfig({displayName:"Example__EditButton",componentId:"sc-7k3jqv-0"})(["width:36px;height:36px;border-radius:9999px;animation-name:",";animation-duration:1s;animation-iteration-count:",";animation-timing-function:linear;"],ef,function(e){return e.spin?"infinite":0}),eh=R.ZP.label.withConfig({displayName:"Example__FieldLayout",componentId:"sc-7k3jqv-1"})(["& ~ &{margin-top:8px;}display:inline-flex;flex-direction:column;gap:1px;"]);function eg(e){var n=e.children,t=e.label;return(0,V.jsxs)(eh,{children:[t&&(0,V.jsx)("div",{children:t}),(0,V.jsx)("div",{children:n})]})}function eb(e){var n=e.children,t=(0,d.Z)(e,el);return(0,V.jsx)(F.Z,ed(ed({},t),{},{motif:"tertiary",children:n||"Button"}))}var ex=R.ZP.div.withConfig({displayName:"Example__ResizableListLayout",componentId:"sc-7k3jqv-2"})(["display:inline-flex;flex-direction:column;gap:1px;"]);function ey(e){var n=e.addButton,t=e.children;return(0,V.jsxs)(ex,{children:[f.Children.map(t,function(e){return(0,V.jsx)("div",{children:e})}),(0,V.jsx)("div",{children:n})]})}var ev=R.ZP.div.withConfig({displayName:"Example__ResizableListItemLayout",componentId:"sc-7k3jqv-3"})(["display:inline-flex;flex-direction:row;gap:1px;"]);function ej(e){var n=e.addButton,t=e.children,r=e.removeButton;return(0,V.jsxs)(ev,{children:[(0,V.jsx)("div",{children:n}),(0,V.jsx)("div",{children:t}),(0,V.jsx)("div",{children:r})]})}function ew(e){var n=e.label,t=e.onValueChange,r=e.options,i=e.value;return(0,V.jsx)(eg,{label:n,children:(0,V.jsx)(X,{as:"select",onChange:function(e){t(e.currentTarget.value)},value:i,children:r.map(function(e){return(0,V.jsx)("option",{children:e},e)})})})}function eO(e){var n=e.label,t=e.onValueChange,r=(0,d.Z)(e,es);return(0,V.jsx)(eg,{label:n,children:(0,V.jsx)(er,ed({onChange:function(e){var n=parseFloat(e.currentTarget.value);isNaN(n)||t(n)}},r))})}function eC(e){var n=e.label,t=e.onValueChange,r=(0,d.Z)(e,eu);return(0,V.jsx)(eg,{label:n,children:(0,V.jsx)(X,ed({type:"number",onChange:function(e){var n=parseFloat(e.currentTarget.value);isNaN(n)||t(n)}},r))})}var ek=R.ZP.div.withConfig({displayName:"Example__ExampleHeader",componentId:"sc-7k3jqv-4"})(["display:flex;align-items:center;justify-content:space-between;"]),eE=R.ZP.iframe.withConfig({displayName:"Example__ExampleSandbox",componentId:"sc-7k3jqv-5"})(["position:absolute;border:0;top:0;right:0;bottom:0;left:0;width:100%;height:100%;",""],function(e){var n=e.error,t=e.theme.fg;return n&&"\n    background: ".concat(t(.05),";\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  ")});function eP(e){var n,t,r,i,a,o,c,l,s,u=e.title,p=e.displayCode,d=e.sandboxCode,m=e.flare,h=(0,f.useState)(null),g=h[0],b=h[1],x=(0,f.useState)({tag:"none"}),y=x[0],v=x[1],j=(t=(n=(0,f.useState)(null))[0],r=n[1],a=(i=(0,f.useState)({width:0,height:0}))[0],o=i[1],c=(0,f.useCallback)(function(){t&&o(t.getBoundingClientRect())},[t]),l=(0,f.useMemo)(function(){return new ResizeObserver(c)},["object",c]),(0,f.useEffect)(function(){if(l&&t)return l.observe(t),function(){l.disconnect()}},[l,t]),[r,a]),w=(0,D.Z)(j,2),C=w[0],k=w[1].height;switch(y.tag){case"none":s=eo;break;case"creating":s=ec;break;default:s=ea}return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(ek,{children:[(0,V.jsx)("h2",{children:u}),d&&(0,V.jsx)(em,{spin:"creating"===y.tag,as:F.Z,icon:s,motif:"tertiary",onClick:function(){"created"===y.tag?v({tag:"none"}):(v({tag:"creating"}),e_(d).then(function(e){v({tag:"created",id:e})}).catch(function(){v({tag:"error"})}))}})]}),(0,V.jsxs)("div",{style:{position:"relative",width:"100%",height:k},children:["created"===y.tag&&(0,V.jsx)(eE,{src:"https://codesandbox.io/embed/".concat(y.id,"?module=/src/main.ts")}),"error"===y.tag&&(0,V.jsx)(eE,{as:"div",error:!0,children:(0,V.jsxs)("div",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:24},children:[(0,V.jsx)("div",{children:"An error occurred while creating the sandbox."}),(0,V.jsxs)("div",{style:{display:"flex",gap:4},children:[(0,V.jsx)(F.Z,{motif:"primary",onClick:function(){d?(v({tag:"creating"}),e_(d).then(function(e){v({tag:"created",id:e})}).catch(function(){v({tag:"error"})})):v({tag:"none"})},children:"Retry"}),(0,V.jsx)(F.Z,{motif:"tertiary",onClick:function(){v({tag:"none"})},children:"Cancel"})]})]})}),("none"===y.tag||"creating"===y.tag)&&(0,V.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},ref:function(e){C(e)},children:[(0,V.jsx)(q.Z,{children:p}),(0,V.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[(0,V.jsx)(O,{flare:m,handler:b,components:{Button:eb,ComboBox:ew,SpinButton:eC,ResizableList:ey,ResizableListItem:ej,Slider:eO}}),(0,V.jsx)("div",{children:g})]})]})]})]})}function e_(e){return eN.apply(this,arguments)}function eN(){return(eN=(0,z.Z)(L().mark(function e(n){var t,r,i;return L().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.stringify({files:{"package.json":{content:{scripts:{start:"parcel index.html --open"},dependencies:{"@tsconfig/recommended":"^1.0.1",flare:"^".concat("0.3.0"),"fp-ts":"^2.11.2","fp-ts-std":"^0.11.0",parcel:"^2.0.0-rc.0"}}},"index.html":{content:'<!DOCTYPE html>\n<html>\n  <head>\n    <title>Flare Demo</title>\n    <link rel="stylesheet" href="node_modules/flare/css/flare.css">\n  </head>\n  <body>\n    <div id="controls"></div>\n    <div id="output" style="margin-top: 8px;"></div>\n    <script src="./src/main.ts" type="module"></script>\n  </body>\n</html>'},"src/main.ts":{content:n},"tsconfig.json":{content:{extends:"@tsconfig/recommended",rootDir:"src"}}}}),e.next=7,fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:t});case 7:return r=e.sent,e.next=10,r.json();case 10:return i=e.sent.sandbox_id,e.abrupt("return",i);case 13:case"end":return e.stop()}},e)}))).apply(this,arguments)}var eS=["color"];function eZ(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function eB(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?eZ(Object(t),!0).forEach(function(n){(0,p.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):eZ(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var ez=[{title:"Basic",flare:(0,S.zG)(x((0,Z.sM)(Math.pow)),g(E({initial:2,label:"Base"})),g(E({initial:4,label:"Exponent"}))),displayCode:'\n      pipe(\n        of(curry2(Math.pow)),\n        ap(spinButton({ initial: 2, label: "Base" })),\n        ap(spinButton({ initial: 4, label: "Exponent" }))\n      )\n    ',sandboxCode:'import { pipe } from "fp-ts/function";\nimport { curry2 } from "fp-ts-std/Function";\nimport { ap, map, of, spinButton, runFlare } from "flare";\n\nconst flare = pipe(\n  of(curry2(Math.pow)),\n  ap(spinButton({ initial: 2, label: "Base" })),\n  ap(spinButton({ initial: 4, label: "Exponent" }))\n);\n\nrunFlare("controls", "output", pipe(flare, map(x => x.toLocaleString())));'},{title:"Adaptive controls",flare:(0,S.zG)(x((0,Z.sM)(function(e,n){return function(e){var n=e.color,t=(0,d.Z)(e,eS),r=function(e){return(0,V.jsx)("svg",{viewBox:"0 0 100 100",width:"100px",height:"100px",children:e})},i="red"===n?"#f66":"#09f",a="red"===n?"#900":"#009";switch(t.type){case"circle":return r((0,V.jsx)("circle",{cx:"50",cy:"50",r:t.radius,fill:i,stroke:a}));case"rectangle":return r((0,V.jsx)("rect",{x:50-t.width/2,y:50-t.height/2,width:t.width,height:t.height,fill:i,stroke:a}))}}(eB({color:e},n))})),g(C({initial:"blue",options:["red","blue"],label:"Color"})),g((0,S.zG)(C({initial:"circle",options:["circle","rectangle"],label:"Shape"}),(r={circle:(0,S.zG)(k({initial:25,min:0,max:50,label:"Radius"}),b(function(e){return{type:"circle",radius:e}})),rectangle:(0,S.zG)(x((0,Z.sM)(function(e,n){return{type:"rectangle",width:e,height:n}})),g(k({initial:50,min:0,max:100,label:"Width"})),g(k({initial:25,min:0,max:100,label:"Height"})))},i=function(e){return r[e]},function(e){return{_tag:"Flare",make:function(){var n=e.make(),t=n.render,r=i(n.query()).make();return{query:function(){return r.query()},render:function(e){var a=e.onChange;return f.createElement(f.Fragment,null,f.createElement(t,{onChange:function(){r=i(n.query()).make(),a()}}),r.render({onChange:a}))}}}}})))),displayCode:'\n      pipe(\n        of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),\n        ap(comboBox({ initial: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),\n        ap(\n          pipe(\n            comboBox({ initial: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),\n            chain(\n              match({\n                circle: pipe(\n                  slider({ initial: 25, min: 0, max: 50, label: "Radius" }),\n                  map(radius => ({ type: "circle" as const, radius }))\n                ),\n                rectangle: pipe(\n                  of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),\n                  ap(slider({ initial: 50, min: 0, max: 100, label: "Width" })),\n                  ap(slider({ initial: 25, min: 0, max: 100, label: "Height" }))\n                )\n              })\n            )\n          )\n        )\n      )\n    ',sandboxCode:'import { pipe } from "fp-ts/function";\nimport { curry2 } from "fp-ts-std/Function";\nimport { ap, chain, map, match, of, comboBox, slider, runFlare } from "flare";\n\ntype SpecializedShapeProps =\n  | { type: "circle"; radius: number }\n  | { type: "rectangle"; width: number; height: number };\n\nconst flare = pipe(\n  of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),\n  ap(comboBox({ initial: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),\n  ap(\n    pipe(\n      comboBox({ initial: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),\n      chain(\n        match({\n          circle: pipe(\n            slider({ initial: 25, min: 0, max: 50, label: "Radius" }),\n            map(radius => ({ type: "circle" as const, radius }))\n          ),\n          rectangle: pipe(\n            of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),\n            ap(slider({ initial: 50, min: 0, max: 100, label: "Width" })),\n            ap(slider({ initial: 25, min: 0, max: 100, label: "Height" }))\n          )\n        })\n      )\n    )\n  )\n);\n\nrunFlare("controls", "output", flare);\n\nfunction makeShape({ color, ...props }: { color: "red" | "blue" } & SpecializedShapeProps): string {\n  const wrap = (shape: string) => `\n    <svg viewBox="0 0 100 100" width="100px" height="100px">\n      ${shape}\n    </svg>\n  `;\n  const fill = color === "red" ? "#f66" : "#09f";\n  const stroke = color === "red" ? "#900" : "#009";\n  switch (props.type) {\n    case "circle":\n      return wrap(\n        `<circle cx="50" cy="50" r=${props.radius} fill=${fill} stroke=${stroke} />`,\n      );\n    case "rectangle":\n      return wrap(`\n        <rect\n          x=${50 - props.width / 2}\n          y=${50 - props.height / 2}\n          width=${props.width}\n          height=${props.height}\n          fill=${fill}\n          stroke=${stroke}\n        />\n      `);\n  }\n}'},{title:"Resizable list",flare:(0,S.zG)((o=(a={item:E({initial:1}),initial:[1,2,3].map(function(e){return E({initial:e})}),minLength:1}).item,c=a.initial,s=void 0===(l=a.minLength)?0:l,u=a.maxLength,{_tag:"Flare",make:function(){for(var e=(c||[]).map(function(e){return e.make()})||[];void 0!==s&&e.length<s;)e.push(o.make());return void 0!==u&&e.length>u&&e.splice(u,e.length-u),{query:function(){return e.map(function(e){return e.query()})},render:function(n){var t=n.onChange;return f.createElement(P,{addButton:(void 0===u||e.length<u)&&f.createElement(N,{onClick:function(){e.push(o.make()),t()}},"+")},e.map(function(n,r){return f.createElement(_,{key:r,addButton:f.createElement(N,{disabled:void 0!==u&&u<=e.length,onClick:function(){e.splice(r,0,o.make()),t()}},"+"),removeButton:f.createElement(N,{disabled:s>=e.length,onClick:function(){e.splice(r,1),t()}},"-")},n.render({onChange:t}))}))}}}}),b(function(e){return"".concat(e.join(" + ")," = ").concat(e.reduce(function(e,n){return e+n},0))})),displayCode:'\n      pipe(\n        resizableList({\n          item: spinButton({ initial: 1 }),\n          initial: [1, 2, 3].map(initial => spinButton({ initial })),\n          minLength: 1\n        }),\n        map((xs: number[]) => `${xs.join(" + ")} = ${xs.reduce((acc, x) => acc + x, 0)}`)  \n      )\n    ',sandboxCode:'import { pipe } from "fp-ts/function";\nimport { map, resizableList, runFlare, spinButton } from "flare";\n\nconst flare = pipe(\n  resizableList({\n    item: spinButton({ initial: 1 }),\n    initial: [1, 2, 3].map(initial => spinButton({ initial })),\n    minLength: 1\n  }),\n  map((xs: number[]) => `${xs.join(" + ")} = ${xs.reduce((acc, x) => acc + x, 0)}`)  \n);\n\nrunFlare("controls", "output", flare);'}],eD=function(){return(0,V.jsxs)(B.Z,{title:"Examples",description:"See how Flare leverages applicative programming in TypeScript to build UIs with minimal code.",children:[(0,V.jsx)("h1",{style:{marginBottom:0},children:"Examples"}),ez.map(function(e,n){return(0,V.jsx)(eP,eB({},e),n)})]})}},42141:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/examples",function(){return t(22688)}])}},function(e){e.O(0,[993,988,774,888,179],function(){return e(e.s=42141)}),_N_E=e.O()}]);