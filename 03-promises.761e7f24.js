function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("eWCmQ");const l=document.querySelector("form");let u=0,a=0,s=0,d=0;function f(e,t){const n=Math.random()>.3;return new Promise(((o,r)=>{setInterval((()=>{n?o({position:e,delay:t}):r({position:e,delay:t})}),t)}))}l.addEventListener("submit",(function(t){t.preventDefault();const{delay:n,step:o,amount:r}=t.currentTarget.elements;u=Number(n.value),a=Number(o.value),s=Number(r.value);for(let t=1;t<=s;t+=1)d=u+a*(t-1),f(t,d).then((({position:t,delay:n})=>{e(i).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`)})).catch((({position:t,delay:n})=>{e(i).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)}))}));
//# sourceMappingURL=03-promises.761e7f24.js.map