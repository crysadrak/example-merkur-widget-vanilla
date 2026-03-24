var h=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var I=Object.prototype.hasOwnProperty;var U=(e,r)=>{for(var n in r)h(e,n,{get:r[n],enumerable:!0})},G=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of N(r))!I.call(e,o)&&o!==n&&h(e,o,{get:()=>r[o],enumerable:!(t=D(r,o))||t.enumerable});return e};var A=e=>G(h({},"__esModule",{value:!0}),e);var ne={};U(ne,{createWidget:()=>te});module.exports=A(ne);function x(e,r){return(...n)=>r(e,...n)}function K(e){try{return JSON.parse(JSON.stringify(e))}catch{return e}}function a(e,r,n={}){let t={...e};return r.forEach(o=>{t[o]=t[o]||K(n)}),t}function z(e,r){r=r||e,Object.keys(r).forEach(n=>{if(k(r[n])){let t=r[n];r[n]=x(e,t)}})}function m(e,r,n){let{target:t,methodName:o}=L(e,r),s=x(e,t[o]);return t[o]=function(i,...p){return n(i,s,...p)},s}function L(e,r=""){let n=r.split("."),t=n.pop(),o=n.reduce((s,i)=>s[i]||{},e);if(!k(o[t]))throw new Error(`Defined path '${r}' is incorrect. Check your widget structure.`);return{target:o,methodName:t}}function k(e){return typeof e=="function"}function f(e,...r){return r.forEach(n=>{Object.keys(n||{}).forEach(t=>{t in e||(e[t]=n[t])})}),e}async function $(e,r,n){for(let t of e.$plugins)k(t[r])&&(e=await t[r](e,...n));return e}function B(e){return{...e,...a(e,["containerSelector"],null),...a(e,["slot","$dependencies","$external"]),...a(e,["setup","create"],r=>r)}}async function P(e={}){let r=B(e),{setup:n,create:t}=r,o={async setup(s,...i){return s=await $(s,"setup",i),n(s,...i)},async create(s,...i){return s=await $(s,"create",i),t(s,...i)},$plugins:(r.$plugins||[]).map(s=>s())};return o.name=r.name,o.version=r.version,o.$dependencies=r.$dependencies,o.$external=r.$external,o.$in={},delete r.name,delete r.version,delete r.$dependencies,delete r.$external,delete r.$plugins,delete r.setup,delete r.create,o=await o.setup(o,r),o=await o.create(o,r),z(o),Object.seal(o),o}function c(e){return`
    <div class='merkur__error'>
      <h1>Status: ${e.error.status}</h1>
      <h2>Message: ${e.error.message}</h2>
      <pre>${e.error.stack}</pre>
    </div>
  `}function y(e){return`
    <div>
      <h3>Counter widget:</h3>
      <p>Count: <span data-merkur="counter">${e.state.counter}</span></p>
      <button data-merkur="on-increase">
        increase counter
      </button>
      <button data-merkur="on-reset">
        reset counter
      </button>
    </div>
  `}function v(){return`
    <div>
      <h1>
        <a href="https://github.com/mjancarik/merkur">MERKUR</a>
      </h1>
      <h2>
        a tiny extensible javascript library for front-end microservices
      </h2>
    </div>
  `}function b(e){return`<p>The widget's name is <strong>${e.name}@${e.version}</strong>.</p>`}async function g(){return{name:"headline",View:J}}function J(e){return e.error&&e.error.status?c(e):`
      <div class='merkur__page'>
        <div class='merkur__headline'>
          <div class='merkur__view'>
            ${v(e)}
            <h3>Current count: <span data-merkur="counter">${e.state.counter}</span></h3>
            ${b(e)}
          </div>
        </div>
      </div>
  `}async function O(e){let r=(await Promise.all([g(e)])).reduce((n,t)=>(n[t.name]=t,n),{});return{View:Y,ErrorView:c,slot:r}}function Y(e){return e.error&&e.error.status?c(e):`
      <div class='merkur__page'>
        <div class='merkur__view'>
          ${y(e)}
        </div>
      </div>
  `}function M(){return{async setup(e,r){let{info:n,bootstrap:t,load:o,mount:s,unmount:i,update:p,...d}=r,W={info:n,bootstrap:t,load:o,mount:s,unmount:i,update:p};return e.$in.component={lifeCycle:W,isMounted:!1,isHydrated:!1,loadingPromise:null,suspendedTasks:[],resolvedViews:new Map},f(e,q(),d),e=a(e,["props","state"]),e=a(e,["assets"],[]),e=a(e,["containerSelector"],null),e},create(e){return e}}}async function l(e,r,n){let{lifeCycle:t}=e.$in.component;if(typeof t[r]=="function")return t[r](e,...n)}function q(){return{async info(e,...r){let{name:n,version:t,props:o,state:s,assets:i,containerSelector:p}=e,d=await l(e,"info",r)||{};return{name:n,version:t,props:o,state:s,assets:i,containerSelector:p,...d}},async mount(e,...r){await e.bootstrap(...r),await e.load(...r);let n=await l(e,"mount",r);e.$in.component.isMounted=!0;for(let t of e.$in.component.suspendedTasks)await t();return n},async unmount(e,...r){return e.$in.component.isMounted=!1,e.$in.component.isHydrated=!1,l(e,"unmount",r)},async bootstrap(e,...r){return l(e,"bootstrap",r)},async load(e,...r){let{$in:n,state:t}=e;if(n.component.isMounted===!1&&n.component.isHydrated===!1&&t&&Object.keys(t).length!==0){n.component.isHydrated=!0;return}let o=l(e,"load",r).then(s=>{n.component.loadingPromise===o&&(e.state=s)}).finally(()=>{n.component.loadingPromise===o&&(n.component.loadingPromise=null)});n.component.loadingPromise=o,await o},async update(e,...r){if(!e.$in.component.isMounted){e.$in.component.suspendedTasks.push(()=>e.update(...r));return}return l(e,"update",r)},async setState(e,r){for(;e.$in.component.loadingPromise;)await e.$in.component.loadingPromise;return e.state={...e.state,...typeof r=="function"?r(e.state):r},e.update()},async setProps(e,r){if(!e.$in.component.isMounted){e.$in.component.suspendedTasks.push(()=>e.setProps(r));return}return e.props={...e.props,...typeof r=="function"?r(e.props):r},await e.load(),e.update()}}}function u(e,r=!0){if(!(this instanceof u))throw new TypeError("Cannot call a class as a function");if(this.constructor===u)throw new TypeError("The ExtensibleError is an abstract class and must be extended before it can be instantiated.");Error.call(this,e),this.name=this.constructor.name,this.message=e,this._nativeError=new Error(e),this._nativeError.name=this.name,this._nativeError.columnNumber&&(this.lineNumber=this._nativeError.lineNumber,this.columnNumber=this._nativeError.columnNumber,this.fileName=this._nativeError.fileName),this._stack=null,this._dropInternalStackFrames=r}u.prototype=Object.create(Error.prototype);u.prototype.constructor=u;Object.defineProperty(u.prototype,"stack",{configurable:!0,enumerable:!1,get:function(){if(this._stack)return this._stack;let e=this._nativeError.stack;if(typeof e=="string"){if(this._dropInternalStackFrames){let r=e.split(`
`),n=1,t=Object.getPrototypeOf(this);for(;t!==u.prototype;)t=Object.getPrototypeOf(t),n++;r.splice(1,n),this._stack=r.join(`
`)}else this._stack=e;return this._stack}}});var _="development",T=typeof process<"u"&&process&&process.env?process.env.NODE_ENV:_,Q={ERROR:"@merkur/plugin-error.error"};function F(){return{async setup(e){return e.error=e.error?e.error:{status:null,message:null},e},async create(e){if(T===_){if(!e.$in.component)throw new Error("You must install missing plugin: npm i @merkur/plugin-component");if(!e.$in.eventEmitter)throw new Error("You must install missing plugin: npm i @merkur/plugin-event-emitter")}return m(e,"info",Z),m(e,"load",X),m(e,"mount",w),m(e,"update",ee),e}}}async function X(e,r,...n){let t={};if(e.error.status)return t;try{t=await r(...n)}catch(o){o.status=o.status||500,j(e,o)}return t}async function Z(e,r,...n){let t=await r(...n);return{error:e.error,...t}}async function w(e,r,...n){return E(e,r,n)}async function ee(e,r,...n){return E(e,r,n)}function j(e,r){e.error.status=r.status,e.error.message=r.message,e.error.url=r.params&&r.params.url,T===_&&(e.error.stack=r.stack),e.emit(Q.ERROR,{error:r})}async function E(e,r,n){let t=null;if(e.error.status)try{return t=await r(...n),t}catch{return t="",t}try{return t=await r(...n),t}catch(o){return o.status=o.status||500,j(e,o),E(e,r,n)}}function C(){return{async setup(e){return f(e,re()),e.$in.eventEmitter={event:{}},e}}}function re(){return{on(e,r,n){let{$in:{eventEmitter:{event:t}}}=e;return t[r]||(t[r]=[]),t[r].push(n),e},off(e,r,n){let{$in:{eventEmitter:{event:t}}}=e;if(!t[r]||t[r].indexOf(n)===-1)return;let o=t[r].indexOf(n);return t[r].splice(o,1),e},emit(e,r,...n){let{$in:{eventEmitter:{event:t}}}=e;if(t[r])return t[r].forEach(o=>{o(e,...n)}),e}}}var S="merkur-widget-vanilla",V="0.0.1";var H={name:S,version:V,$plugins:[M,C,F],assets:[{name:"widget.js",type:"script"},{name:"widget.css",type:"stylesheet"}],onClick(e){e.setState({counter:e.state.counter+1})},onReset(e){e.setState({counter:0})},load(e){let{environment:r,...n}=e.props;return{counter:0,...n}}};function te(e){return P({...H,...e,$dependencies:{},async mount(r){let{View:n,slot:t={}}=await O(r);return{html:n(r),slot:Object.keys(t).reduce((o,s)=>(o[s]={name:t[s].name,html:t[s].View(r)},o),{})}}})}0&&(module.exports={createWidget});
