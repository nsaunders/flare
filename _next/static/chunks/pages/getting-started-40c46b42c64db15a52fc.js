(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[651],{4852:function(e,n,t){"use strict";t.d(n,{Zo:function(){return p},kt:function(){return f}});var r=t(9231);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"===typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(t),f=a,m=d["".concat(l,".").concat(f)]||d[f]||u[f]||o;return t?r.createElement(m,i(i({ref:n},p),{},{components:t})):r.createElement(m,i({ref:n},p))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"===typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"===typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},5432:function(e,n,t){"use strict";t.d(n,{Q:function(){return o}});var r=t(264),a=(0,t(3652).i)({paddingTop:8,paddingRight:16,paddingBottom:8,paddingLeft:16,fontFamily:"Lato",fontSize:16,"& > h1:first-child":{marginTop:0},"& hr + h2:not([class])":{marginTop:-8},"& hr:not([class])":{height:0,border:"none",borderBottom:"1px solid rgba(var(--light),0.05)",marginTop:24,marginBottom:24},"& p:not([class])":{lineHeight:1.5},"& a:not([class])":{"&:link,&:visited":{color:"rgba(var(--light), 0.75)"},"&:hover,&:focus,&:active":{color:"inherit"}}}),o=function(e){var n=e.children;return(0,r.jsx)("div",{className:a,children:n})}},9280:function(e,n,t){"use strict";t.d(n,{_:function(){return l}});var r=t(264),a=t(9231),o=t(3652),i=t(1506),c=(0,o.i)({container:{display:"inline-flex",borderWidth:1,borderStyle:"solid",borderColor:"rgb(var(--light))",borderRadius:4,paddingRight:0,paddingLeft:7,"&:focus-within":{boxShadow:"0 0 0.166em 0.083em rgba(var(--light),0.5)"}},containerActive:{background:"rgb(var(--light))",color:"rgb(var(--dark))"},buttonWrap:{marginRight:8,paddingTop:6},button:{appearance:"none",outline:"none",background:"transparent",border:0,margin:0,padding:0,color:"inherit"},mainTextWrap:{flex:1,fontFamily:"'Courier Prime'",fontSize:16,lineHeight:1,height:30,overflow:"hidden"},mainText:{position:"relative",top:0,transitionProperty:"top",transitionDuration:"0.5s"},mainTextScrolled:{top:-30},mainTextItem:{paddingTop:8,paddingBottom:6,transitionProperty:"opacity",transitionDuration:"0.5s"},mainTextItemInactive:{opacity:0},spinnerWrap:{display:"flex",flexDirection:"column",justifyContent:"stretch"},spinner:{flex:1,display:"flex",alignItems:"flex-end",appearance:"none",outline:"none",margin:0,paddingTop:2,paddingRight:8,paddingBottom:2,paddingLeft:8,border:0,background:"transparent",color:"inherit","& + &":{alignItems:"flex-start"}}}),l=function(e){var n=e.packageName,t=(0,a.useState)("npm"),o=t[0],l=t[1],p=(0,a.useRef)(null),u=(0,a.useState)(!1),d=u[0],f=u[1],m=(0,a.useState)(!1),h=m[0],g=m[1],v=h||d;return(0,r.jsxs)("div",{className:(0,i.Z)(c.container,v&&c.containerActive),onKeyDown:function(e){switch(e.key){case"ArrowUp":"yarn"===o&&l("npm");break;case"ArrowDown":"npm"===o&&l("yarn");break;case" ":g(!0)}},onKeyUp:function(){g(!1)},children:[(0,r.jsx)("div",{className:c.buttonWrap,children:(0,r.jsx)("button",{ref:p,onMouseDown:function(){f(!0)},onMouseUp:function(){var e;d&&s("".concat("yarn"===o?"yarn add":"npm install"," ").concat(n)),f(!1),null===(e=p.current)||void 0===e||e.focus()},onMouseOut:function(){f(!1)},onKeyUp:function(){var e;h&&s("".concat("yarn"===o?"yarn add":"npm install"," ").concat(n)),null===(e=p.current)||void 0===e||e.focus()},className:c.button,children:(0,r.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",fill:"currentColor"})})})}),(0,r.jsx)("div",{className:c.mainTextWrap,children:(0,r.jsxs)("div",{className:(0,i.Z)(c.mainText,"yarn"===o&&c.mainTextScrolled),children:[(0,r.jsxs)("div",{className:(0,i.Z)(c.mainTextItem,"npm"!==o&&c.mainTextItemInactive),children:["npm install ",n]}),(0,r.jsxs)("div",{className:(0,i.Z)(c.mainTextItem,"yarn"!==o&&c.mainTextItemInactive),children:["yarn add ",n]})]})}),(0,r.jsxs)("div",{className:c.spinnerWrap,children:[(0,r.jsx)("button",{className:c.spinner,tabIndex:-1,onClick:function(){var e;"npm"!==o&&l("npm"),null===(e=p.current)||void 0===e||e.focus()},children:(0,r.jsx)("svg",{viewBox:"0 0 8 4",width:"8",height:"4",children:(0,r.jsx)("path",{d:"M0,4 l4,-4 l4,4 h-2 l-2,-2 l-2,2",fill:"currentColor"})})}),(0,r.jsx)("button",{className:c.spinner,tabIndex:-1,onClick:function(){var e;"yarn"!==o&&l("yarn"),null===(e=p.current)||void 0===e||e.focus()},children:(0,r.jsx)("svg",{viewBox:"0 0 8 4",width:"8",height:"4",children:(0,r.jsx)("path",{d:"M0,0 l4,4 l4,-4 h-2 l-2,2 l-2,-2",fill:"currentColor"})})})]})]})};function s(e){var n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n)}},482:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var r=t(264),a=t(2524),o=t(5355),i=t(289),c=t(9231),l=t(4852),s=t(9275),p=t(8753),u=t(9280),d=(0,t(4152).Z)(c.createElement("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),"Launch");function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(Object(t),!0).forEach((function(n){(0,o.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var h={};function g(e){var n=e.components,t=(0,i.Z)(e,["components"]);return(0,l.kt)("wrapper",m(m(m({},h),t),{},{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",null,"Getting Started"),(0,l.kt)("h2",null,"Browser"),(0,l.kt)("p",null,"Each live demo featured on the ",(0,l.kt)("a",m({parentName:"p"},{href:"/examples"}),"Examples")," page can be used as the\nstarting point for a ",(0,l.kt)("a",m({parentName:"p"},{href:"https://codesandbox.io/"}),"CodeSandbox")," project, allowing\nyou to experiment with Flare directly in the web browser. Click on the pencil\nicon next to a demo to get started."),(0,l.kt)(s.default,{href:"/examples",passHref:!0,mdxType:"Link"},(0,l.kt)(p.z,{as:"a",motif:"basic",size:"large",icon:d,mdxType:"Button"},"Examples")),(0,l.kt)("hr",null),(0,l.kt)("h2",null,"Local Installation"),(0,l.kt)("p",null,"Install Flare using your choice of NPM, Yarn, or an equivalent package manager."),(0,l.kt)(u._,{packageName:"flare",mdxType:"Install"}))}g.isMDXComponent=!0;var v=t(5432),y=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.default,{children:[(0,r.jsx)("title",{children:"Getting Started"}),(0,r.jsx)("meta",{name:"description",content:"How to start building applicative-style UIs in TypeScript using Flare"})]}),(0,r.jsx)(g,{})]})};y.getLayout=function(e){return(0,r.jsx)(v.Q,{children:e})};var b=y},2406:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started",function(){return t(482)}])}},function(e){e.O(0,[888,179],(function(){return n=2406,e(e.s=n);var n}));var n=e.O();_N_E=n}]);