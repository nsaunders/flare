(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[103],{8985:function(e,n,t){"use strict";t.d(n,{Z:function(){return h}});var r=t(67113),o=t(39097),i=t.n(o),a=t(5632),c=t(19453),s=t(52322),l=c.ZP.div.withConfig({displayName:"APISwitcher__Container",componentId:"sc-1dcng9n-0"})(['border-radius:4px;position:relative;display:inline-flex;width:100%;max-width:500px;font-family:"Lato";font-size:14px;background-color:',";"],function(e){return(0,e.theme.fg)(.05)}),p=c.ZP.div.withConfig({displayName:"APISwitcher__Marker",componentId:"sc-1dcng9n-1"})(["position:absolute;border-radius:3px;width:calc(100% / 3 - 2px);top:2px;bottom:2px;background-color:",";transition-property:left;transition-duration:125ms;left:",";"],function(e){return(0,e.theme.bg)(.5)},function(e){return({left:"2px",center:"calc(100% / 3 + 1px)",right:"calc(200% / 3)"})[e.position]}),d=c.ZP.div.withConfig({displayName:"APISwitcher__Item",componentId:"sc-1dcng9n-2"})(["cursor:pointer;margin:0;appearance:none;background:transparent;color:",";border:none;outline:none;font:inherit;z-index:1;flex:1;text-align:center;padding:8px;transition-property:color;transition-duration:125ms;&:not(:focus){text-decoration:none;}"],function(e){var n=e.selected,t=e.theme.fg;return n?t():t(.5)});function u(){var e=((0,a.useRouter)().pathname.match(/api\-docs(\/.+)/)||[null,""])[1];return(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{position:{"/flare":"center","/flare-core":"right"}[e]||"left"}),[["","Overview"],["/flare","flare"],["/flare-core","flare-core"]].map(function(n){var t=(0,r.Z)(n,2),o=t[0],a=t[1];return(0,s.jsx)(i(),{legacyBehavior:!0,href:"/api-docs".concat(o),children:(0,s.jsx)("a",{style:{textDecoration:"none",display:"contents"},children:(0,s.jsx)(d,{selected:o===e,children:a})})},a)})]})}var f=t(53215);function h(e){return(0,s.jsxs)(f.Z,{children:[(0,s.jsx)("div",{style:{marginTop:16,textAlign:"center"},children:(0,s.jsx)(u,{})}),e]})}},22031:function(e,n,t){"use strict";var r=t(2784),o=t(16116),i=t(19453),a=t(52322),c=i.ZP.div.withConfig({displayName:"Code__Surface",componentId:"sc-unxzzz-0"})(["background:",";border-radius:4px;padding:16px;overflow:auto;& > pre{margin:0;}"],function(e){return(0,e.theme.fg)(.05)}),s=i.ZP.code.withConfig({displayName:"Code__InnerCode",componentId:"sc-unxzzz-1"})(['font-family:"Courier Prime";font-size:14px;line-height:20px;color:',";.token{&.function{color:",";}&.string,&.number{color:",";}&.punctuation,&.operator,&.keyword{color:",";}&.attr,&.attr-name{color:",";}&.class-name,&.maybe-class-name{color:",";}},"],function(e){return(0,e.theme.fg)(.5)},function(e){return(0,e.theme.fg)(.7)},function(e){return(0,e.theme.fg)(.8)},function(e){return(0,e.theme.fg)(.3)},function(e){return(0,e.theme.fg)(.6)},function(e){return(0,e.theme.fg)(.65)}),l=(0,r.forwardRef)(function(e,n){var t=e.children,r=e.className,i=t.split("\n").filter(function(e,n,t){var r=t.length;return e.trim()||n&&n!==r-1}).map(function(e){var n=e.match(/^\s+/);return n?n[0].length:0}).reduce(function(e,n){return Math.min(e,n)},Number.MAX_VALUE),l=r&&r.replace(/^language\-/,""),p=["javascript","typescript","jsx"].includes(l||"")?l:"typescript";return(0,a.jsx)(c,{ref:n,children:(0,a.jsx)(o.Z,{language:p,useInlineStyles:!1,CodeTag:s,codeTagProps:{style:{}},children:t.split("\n").reduce(function(e,n,t,r){return n.trim()||e.length&&r.slice(t).filter(function(e){return e.trim()}).length?e.concat(n):e},[]).map(function(e){return e.substring(i)}).join("\n")})})});l.displayName="Code",n.Z=l},53215:function(e,n,t){"use strict";t.d(n,{Z:function(){return h}});var r=t(95235),o=t(82269),i=t(45392),a=t(22031),c=t(19453),s=t(52322),l=["children","ref"];function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach(function(n){(0,r.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var u=c.ZP.div.withConfig({displayName:"DocBase__ContentWrap",componentId:"sc-7m0tv8-0"})(['max-width:900px;margin-right:auto;margin-left:auto;padding-top:16px;padding-right:32px;padding-bottom:16px;padding-left:32px;font-family:"Lato";font-size:16px;& > h1:first-child{margin-top:0;}& hr + h2:not([class]){margin-top:-8px;}& hr:not([class]){height:0;border:none;border-bottom:1px solid ',";margin-top:24px;margin-bottom:24px;}& p:not([class]){line-height:1.5;}& a:not([class]){&:link,&:visited{color:",';}&:hover,&:focus,&:active{color:inherit;}}& code{font-family:"Courier Prime";}& table th,& table td{text-align:start;padding-top:2px;padding-right:8px;padding-bottom:2px;padding-left:8px;}& table{margin-top:-2px;margin-right:-8px;margin-bottom:-2px;margin-left:-8px;}'],function(e){return(0,e.theme.fg)(.05)},function(e){return(0,e.theme.fg)(.75)}),f={code:function(e){var n=e.children,t=e.ref,r=(0,o.Z)(e,l);return"string"==typeof n&&n.includes("\n")?(0,s.jsx)(a.Z,d(d({ref:t},r),{},{children:n})):(0,s.jsx)("code",d(d({ref:t},r),{},{children:n}))}};function h(e){var n=e.children;return(0,s.jsx)(i.Zo,{components:f,children:(0,s.jsx)(u,{children:n})})}},28394:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var r=t(5632),o=t(97729),i=t.n(o),a=t(52322),c="Flare";function s(e){var n=e.title,t=e.description,o=(0,r.useRouter)().pathname,s=[n,c].filter(function(e){return e}).join(" - "),l="".concat("https://flare.js.org").concat(o);return(0,a.jsxs)(i(),{children:[(0,a.jsx)("title",{children:s}),(0,a.jsx)("meta",{property:"description",content:t}),(0,a.jsx)("meta",{property:"og:title",content:s}),(0,a.jsx)("meta",{property:"og:description",content:t}),(0,a.jsx)("meta",{property:"og:image",content:"https://repository-images.githubusercontent.com/396804402/b18f1b49-b3d8-4360-a709-bf71857c4cd4"}),(0,a.jsx)("meta",{property:"og:url",content:l}),(0,a.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,a.jsx)("meta",{property:"og:site_name",content:c}),(0,a.jsx)("meta",{name:"twitter:image:alt",content:"".concat(c," logo")})]})}},42693:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var r=t(52322),o=t(45392);function i(e){var n=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code"},(0,o.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"api",children:"API"}),"\n",(0,r.jsxs)(n.p,{children:["Flare is offered in two packages. Both provide the same support for building\n",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Applicative_functor",children:"applicative"}),"-style user\ninterfaces as shown on the ",(0,r.jsx)(n.a,{href:"/examples",children:"Examples"})," page; however, they differ in\nhow these UIs are rendered. ",(0,r.jsx)(n.a,{href:"/api-docs/flare",children:"flare"})," offers a more\nnarrowly-focused API surface, while ",(0,r.jsx)(n.a,{href:"/api-docs/flare-core",children:"flare-core"})," provides\ngreater flexibility."]}),"\n",(0,r.jsx)(n.h2,{id:"flare",children:"flare"}),"\n",(0,r.jsxs)(n.p,{children:["This package re-exports a subset of flare-core and is the best choice for use\ncases with minimal customization requirements. The\n",(0,r.jsx)(n.a,{href:"/api-docs/flare#runflare",children:(0,r.jsx)(n.code,{children:"runFlare"})})," or\n",(0,r.jsx)(n.a,{href:"/api-docs/flare#runflarewith",children:(0,r.jsx)(n.code,{children:"runFlareWith"})})," procedures can be used to render\nthe UI. CSS is the recommended approach to customizing the appearance of various\nUI elements."]}),"\n",(0,r.jsx)(n.h2,{id:"flare-core",children:"flare-core"}),"\n",(0,r.jsxs)(n.p,{children:["The flare-core package provides applicative UI building blocks along with\nadditional APIs that allow the rendered markup to be customized. The\n",(0,r.jsx)(n.a,{href:"/api-docs/flare-core#runflare",children:(0,r.jsx)(n.code,{children:"RunFlare"})}),"\n",(0,r.jsx)(n.a,{href:"https://reactjs.org/",children:"React"})," component can be used to render the UI, with its\n",(0,r.jsx)(n.code,{children:"components"})," prop allowing various elements to be overridden using custom React\ncomponents."]})]})}var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i(e)},c=t(8985),s=t(28394),l=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{title:"API",description:"Learn the API for applicative UI programming in TypeScript."}),(0,r.jsx)(a,{})]})};l.getLayout=c.Z;var p=l},25654:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/api-docs",function(){return t(42693)}])}},function(e){e.O(0,[993,774,888,179],function(){return e(e.s=25654)}),_N_E=e.O()}]);