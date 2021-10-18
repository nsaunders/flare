(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[106],{9650:function(e,t,n){"use strict";n.d(t,{E:function(){return c}});var r=n(264),a=n(9231),o=n(3652),i=n(9641),l=(0,o.i)({surface:{background:"rgba(var(--light), 0.05)",borderRadius:4,padding:16,overflow:"auto","& > pre":{margin:0}},code:{fontFamily:"Courier Prime",fontSize:14,lineHeight:"20px",color:"rgba(var(--light),0.5)","& .token":{"&.function":{color:"rgba(var(--light),0.7)"},"&.string,&.number":{color:"rgba(var(--light),0.8)"},"&.punctuation,&.operator,&.keyword":{color:"rgba(var(--light),0.3)"},"&.attr,&.attr-name":{color:"rgba(var(--light),0.6)"},"&.class-name,&.maybe-class-name":{color:"rgba(var(--light),0.65)"}}}}),c=(0,a.forwardRef)((function(e,t){var n=e.children,a=e.className,o=n.split("\n").filter((function(e,t,n){var r=n.length;return e.trim()||t&&t!==r-1})).map((function(e){var t=e.match(/^\s+/);return t?t[0].length:0})).reduce((function(e,t){return Math.min(e,t)}),Number.MAX_VALUE),c=a&&a.replace(/^language\-/,""),s=["javascript","typescript","jsx"].includes(c||"")?c:"typescript";return(0,r.jsx)("div",{className:l.surface,ref:t,children:(0,r.jsx)(i.Z,{language:s,useInlineStyles:!1,codeTagProps:{style:{},className:l.code},children:n.split("\n").reduce((function(e,t,n,r){return t.trim()||e.length&&r.slice(n).filter((function(e){return e.trim()})).length?e.concat(t):e}),[]).map((function(e){return e.substring(o)})).join("\n")})})}))},5432:function(e,t,n){"use strict";n.d(t,{Q:function(){return m}});var r=n(5355),a=n(264),o=n(289),i=n(3652),l=n(4852),c=n(9650);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=(0,i.i)({maxWidth:900,marginRight:"auto",marginLeft:"auto",paddingTop:16,paddingRight:32,paddingBottom:16,paddingLeft:32,fontFamily:"Lato",fontSize:16,"& > h1:first-child":{marginTop:0},"& hr + h2:not([class])":{marginTop:-8},"& hr:not([class])":{height:0,border:"none",borderBottom:"1px solid rgba(var(--light),0.05)",marginTop:24,marginBottom:24},"& p:not([class])":{lineHeight:1.5},"& a:not([class])":{"&:link,&:visited":{color:"rgba(var(--light), 0.75)"},"&:hover,&:focus,&:active":{color:"inherit"}},"& code":{fontFamily:"'Courier Prime'"},"& table th, & table td":{paddingTop:2,paddingRight:8,paddingBottom:2,paddingLeft:8},"& table":{marginTop:-2,marginRight:-8,marginBottom:-2,marginLeft:-8}}),d={code:function(e){var t=e.children,n=(0,o.Z)(e,["children"]);return(0,a.jsx)(c.E,p(p({},n),{},{children:"string"===typeof t?t:""}))}},m=function(e){var t=e.children;return(0,a.jsx)(l.Zo,{components:d,children:(0,a.jsx)("div",{className:u,children:t})})}},8522:function(e,t,n){"use strict";n.d(t,{m:function(){return l}});var r=n(264),a=n(6067),o=n(2524),i="Flare",l=function(e){var t=e.title,n=e.description,l=(0,a.useRouter)().pathname,c=[t,i].filter((function(e){return e})).join(" - "),s="".concat("https://flare.js.org").concat(l);return(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:c}),(0,r.jsx)("meta",{property:"description",content:n}),(0,r.jsx)("meta",{property:"og:title",content:c}),(0,r.jsx)("meta",{property:"og:description",content:n}),(0,r.jsx)("meta",{property:"og:image",content:"https://repository-images.githubusercontent.com/396804402/b18f1b49-b3d8-4360-a709-bf71857c4cd4"}),(0,r.jsx)("meta",{property:"og:url",content:s}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,r.jsx)("meta",{property:"og:site_name",content:i}),(0,r.jsx)("meta",{name:"twitter:image:alt",content:"".concat(i," logo")})]})}},1396:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(264),a=n(5355),o=n(289),i=(n(9231),n(4852));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s={};function p(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",c(c(c({},s),n),{},{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"Embedding in React"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",c({parentName:"p"},{href:"https://flare.js.org/api-docs/flare-core#runflare"}),(0,i.kt)("inlineCode",{parentName:"a"},"RunFlare"))," component\nprovides the means to embed a Flare UI in a ",(0,i.kt)("a",c({parentName:"p"},{href:"https://reactjs.org"}),"React"),"\napplication. This short guide explains how the ",(0,i.kt)("inlineCode",{parentName:"p"},"RunFlare")," component works."),(0,i.kt)("h2",null,"Overview"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"RunFlare")," component renders a Flare UI wherever it exists in the component\ntree and invokes a callback each time the value changes in response to user\ninput."),(0,i.kt)("p",null,"The UI and callback are passed via ",(0,i.kt)("inlineCode",{parentName:"p"},"flare")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"handler")," props, respectively."),(0,i.kt)("h2",null,"Generic Implementation"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"RunFlare")," is a generic component, which allows it to work with any Flare UI\nregardless of the value it produces. The only constraint is that the UI must\nproduce the same kind of value that the callback accepts as input."),(0,i.kt)("p",null,"This may be best understood by examining the prop types. Given a generic\nargument ",(0,i.kt)("inlineCode",{parentName:"p"},"A"),", which can be any type:"),(0,i.kt)("pre",null,(0,i.kt)("code",c({parentName:"pre"},{className:"language-typescript"}),"type RunFlareProps<A> = {\n  flare: Flare<A>;\n  handler: (a: A) => void;\n  // ...\n};\n")),(0,i.kt)("h2",null,"Common Use Case"),(0,i.kt)("p",null,"While the generic implementation of ",(0,i.kt)("inlineCode",{parentName:"p"},"RunFlare")," supports a wide variety of use\ncases, it may be helpful to consider perhaps the most common use case of\ndisplaying some element as a function of user input, as shown on the\n",(0,i.kt)("a",c({parentName:"p"},{href:"/examples"}),"Examples")," page. For this use case,\n",(0,i.kt)("a",c({parentName:"p"},{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/blob/14f568cded146f89864a06da1884364bd4e6ced0/types/react/index.d.ts#L237"}),(0,i.kt)("inlineCode",{parentName:"a"},"ReactNode")),"\n(or a more restrictive subtype) may be substituted in place of ",(0,i.kt)("inlineCode",{parentName:"p"},"A"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",c({parentName:"pre"},{className:"language-typescript"}),"type RunFlareProps<ReactNode> = {\n  flare: Flare<ReactNode>;\n  handler: (a: ReactNode) => void;\n};\n")),(0,i.kt)("p",null,"Thus, the UI passed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"flare")," prop must produce a type of value that is\nassignable to ",(0,i.kt)("inlineCode",{parentName:"p"},"ReactNode"),". If it does not, then the\n",(0,i.kt)("a",c({parentName:"p"},{href:"/api-docs/flare-core#map"}),(0,i.kt)("inlineCode",{parentName:"a"},"map"))," function may offer a solution by providing the\nmeans to transform the value that the UI produces."),(0,i.kt)("p",null,"Similarly, the ",(0,i.kt)("inlineCode",{parentName:"p"},"handler")," prop callback must accept a ",(0,i.kt)("inlineCode",{parentName:"p"},"ReactNode")," as input and\nproduce a side effect."),(0,i.kt)("p",null,"In this case, the side effect is that of mutating a ",(0,i.kt)("inlineCode",{parentName:"p"},"ReactNode")," value held in\nstate. Usually, the\n",(0,i.kt)("a",c({parentName:"p"},{href:"https://reactjs.org/docs/hooks-reference.html#usestate"}),(0,i.kt)("inlineCode",{parentName:"a"},"useState"))," hook is all\nthat is required:"),(0,i.kt)("pre",null,(0,i.kt)("code",c({parentName:"pre"},{className:"language-jsx"}),"const [flareOutput, setFlareOutput] = useState<ReactNode>();\n\n// ...\n\n<RunFlare\n  flare={/*...*/}\n  handler={setFlareOutput} />\n")),(0,i.kt)("p",null,"Finally, the ",(0,i.kt)("inlineCode",{parentName:"p"},"flareOutput")," node can be rendered wherever it belongs in the\ncomponent tree, e.g."),(0,i.kt)("pre",null,(0,i.kt)("code",c({parentName:"pre"},{className:"language-jsx"}),'<div className="output">\n  {flareOutput}\n</div>\n')))}p.isMDXComponent=!0;var u=n(8522),d=n(5432),m=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.m,{title:"Embedding in React",description:"Seamlessly integrate a Flare UI into a React application."}),(0,r.jsx)(d.Q,{children:(0,r.jsx)(p,{})})]})}},4312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/embedding-in-react",function(){return n(1396)}])}},function(e){e.O(0,[27,888,179],(function(){return t=4312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);