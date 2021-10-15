import md5 from "md5";
import {encode as base64_encode} from 'base-64';
export default function Cript(body) {
var data =JSON.stringify(body);
  

var encoded = md5('shyrineprod')+md5(';')+base64_encode(data)+md5(';')+md5('key-secret');
  return encoded;
}