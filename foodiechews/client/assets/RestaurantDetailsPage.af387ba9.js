import{u as a,H as t,o as e,c as s,p as n,k as o,b as r,d as c,e as i,i as d,l as u}from"./vendor.a06d263d.js";import{l,A as p,a as g,y as m}from"./index.2d985608.js";import{g as y}from"./LocationGetter.d63df758.js";const v={setup(){const n=a();return t((async()=>{l.log("I set this true first"),p.loading=!0})),e((async()=>{await g.getAccount(),l.log("accountID",p.account.id),p.account.activeLocation?n.params.yelpId&&await m.getByYelpId(n.params.yelpId,p.account.activeLocation):(l.log("else statement"),await y(),setTimeout((()=>{m.getByYelpId(n.params.yelpId,p.activeLocation)}),8e3))})),{restaurant:s((()=>p.activeRestaurant)),account:s((()=>p.account)),loading:s((()=>p.loading))}}},I=u();n("data-v-43eb925a");const f={key:1,class:"container-fluid mt-4",id:"bg-img"};o();const L=I(((a,t,e,s,n,o)=>{const u=r("LoadingSpinner"),l=r("RestaurantDetailsCard");return s.loading?(c(),i(u,{key:0})):(c(),i("div",f,[s.restaurant.location?(c(),i(l,{key:0,restaurant:s.restaurant},null,8,["restaurant"])):d("",!0)]))}));v.render=L,v.__scopeId="data-v-43eb925a";export default v;
