export default function jsonToQueryParams(obj) {
    var str = [];
    for (var p in obj) 
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(typeof obj[p] === 'string' ? obj[p] : JSON.stringify(obj[p])));
      }
    return str.join("&");
  }
  
  export function objToQueryParams(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(typeof obj[p] === 'string' ? obj[p] : JSON.stringify(obj[p])));
      }
    return str.join("&");
  }