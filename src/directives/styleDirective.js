export const Undecorate = {
  bind(el, binding, vnode){
    el.style.textDecoration = "none";
  }
}

export const Centrify = {
  bind(el, binding, vnode){
    el.style.textAlign = "justify";
    el.style.textAlignLast = "center";
  }
}


